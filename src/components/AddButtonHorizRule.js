import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import AddButtonContainer from './AddButtonContainer';

/**
 * A React component renders an Add button to
 * add a new row to the Canvas
 * @class
 */
export default class AddButtonHorizRule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditorSelector: false,
      isHoveringOverAddButton: false
    };

    this.handleAddNew = this.handleAddNew.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  componentDidUpdate(prevProps, prevState) {
    const { showEditorSelector } = this.state;

    const editor = document.getElementById('appcues-host').shadowRoot.firstChild;

    const didEditorSelectorClose = prevState.showEditorSelector && !showEditorSelector;
    const didEditorSelectorOpen = !prevState.showEditorSelector && showEditorSelector;

    if (didEditorSelectorOpen) {
      editor.addEventListener('click', this.onClick, true);
    } else if (didEditorSelectorClose) {
      editor.removeEventListener('click', this.onClick, true);
    }

  }

  componentWillUnmount() {
    const editor = document.getElementById('appcues-host').shadowRoot.firstChild;
    editor.removeEventListener('click', this.onClick, true);

  }

  render() {
    const { onSelectEditorType, internalAllowedEditorTypes, isHoveringOverContainer } = this.props;
    const { showEditorSelector, isHoveringOverAddButton } = this.state;

    const hrStyle = {
      height: 1,
      border: 0,
      position: 'relative',
      top: 15,
      width: '100%',
      zIndex: 2,
      padding: 0,
      margin: 0,
      pointerEvents: 'none',
      background: '#00b850',
      transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
      opacity: .5,
      transform: `scale(1, 3)`
    };

    const containerStyle = {
      position: 'absolute',
      pointerEvents: 'none',
      left: 0,
      right: 0,
      opacity: (isHoveringOverContainer || showEditorSelector) ? 1 : 0,
      transition: 'opacity 0.15s ease-out',
      zIndex: 100
    };

    return (
      <div className="add-row" style={containerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', zIndex: 10 }} ref={(el) => this.wrapper = el}>
          <div
            style={{ position: 'absolute', right: '-45px', top: '-2px', cursor: 'pointer', zIndex: 10, transform: `scale(${ (isHoveringOverAddButton || showEditorSelector) ? 1 : 0.8 })`, transition: 'all 0.15s ease-out' }}
            onMouseEnter={() => this.setState({ isHoveringOverAddButton: true })}
            onMouseLeave={() => this.setState({ isHoveringOverAddButton: false })}
            ref={(el) => this.addButton = el}
          >
            <AddButtonContainer
              onSelectEditorType={ onSelectEditorType }
              onClick={ this.handleAddNew }
              showEditorSelector={ showEditorSelector }
              internalAllowedEditorTypes={ internalAllowedEditorTypes }
              shadow={false}
            />

          </div>
          <hr style={hrStyle} />
        </div>
      </div>
    );
  }

  onClick(e) {
    e.preventDefault();
    const { showEditorSelector, isHoveringOverAddButton } = this.state;

    if (showEditorSelector && !isHoveringOverAddButton) {
      this.setState({showEditorSelector: false});
    }
  }

  handleAddNew() {
    const { showEditorSelector } = this.state;

    this.setState({ showEditorSelector: !showEditorSelector });
  }

  setBoundingBox() {
    if (!this.addButton) {
      return;
    }
  }
}

AddButtonHorizRule.propTypes = {
  onSelectEditorType: PropTypes.func.isRequired,
  internalAllowedEditorTypes: PropTypes.instanceOf(List).isRequired,
  isHoveringOverContainer: PropTypes.bool
};
