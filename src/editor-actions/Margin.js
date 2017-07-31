import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle, shortInputStyle, marginBoxStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';
import Button from '../components/Button';

import MarginButton from '../icons/MarginButton';

export default class Margin extends React.Component {

  constructor(props) {
    super(props);

    const { persistedState } = props;

    this.state = {
      top: persistedState.get('top') || '',
      right: persistedState.get('right') || '',
      bottom: persistedState.get('bottom') || '',
      left: persistedState.get('left') || '',
      isMenuOpen: props.isActive || false
    };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.isActive !== this.props.isActive) {
      this.setState({
        isMenuOpen: nextProps.isActive
      });
    }
  }

  render() {
    const { top, right, bottom, left, isMenuOpen } = this.state;
    const { isActive, hasRoomToRenderBelow } = this.props;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10,
      width: 300,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`,
      animationTimingFunction: 'ease-out',
      animationDuration: '0.15s',
      animationIterationCount: 1,
      animationFillMode: 'both'
    };
    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top;
      delete dropdownStyles.top;
    }

    const titleStyles = secondaryMenuTitleStyle;

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>Surrounding Margin (in pixels)</div>
        <div style={{marginTop: -10}}>
          <div style={{textAlign: 'center'}}>
            <label>Top: </label>
            <input autoFocus style={shortInputStyle} value={top} max={200} placeholder="0" onChange={(e) => this.handleInputChange(e, 'top')} />
          </div>
          <div className='row' style={{display: 'flex', alignItems: 'center', margin: '5px 0'}}>
            <div style={{width: '30%'}}>
              <label>Left: </label>
              <input style={shortInputStyle} value={left} max={100} placeholder="0" onChange={(e) => this.handleInputChange(e, 'left')} />
            </div>
            <div style={marginBoxStyle}>
            </div>
            <div style={{width: '30%'}}>
              <label>Right: </label>
              <input style={shortInputStyle} value={right} max={100} placeholder="0" onChange={(e) => this.handleInputChange(e, 'right')} />
            </div>
          </div>
          <div style={{textAlign: 'center', marginBottom: '10px'}}>
            <label>Bottom: </label>
            <input style={shortInputStyle} value={bottom} max={200} placeholder="0" onChange={(e) => this.handleInputChange(e, 'bottom')} />
          </div>
        </div>
      </Menu>
    ) : null;

    return (
      <div>
        <a href="#" onClick={(e) => this.toggleDropdown(e)}><MarginButton {...buttonProps} /></a>
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown(e) {
    e.preventDefault();
    const { onToggleActive, isActive } = this.props;
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });

    if(isActive) {
      setTimeout(() => onToggleActive(!isActive), 200);
    } else {
      onToggleActive(!isActive);
    }
  }

  handleInputChange(e, name) {
    const { onChange, localState, persistedState, onToggleActive } = this.props;
    const val = e.currentTarget.value;
    const update = {};
    const parsedNumber = val && val.length ? parseInt(val) : val;

    if (!isNaN(parsedNumber)) {
      update[name] = parsedNumber;

      const newPersistedState = persistedState
        .set(name, parsedNumber)

      this.setState(update);

      onChange({
        localState,
        persistedState: newPersistedState
      });
    }
  }

}

Margin.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool
};
