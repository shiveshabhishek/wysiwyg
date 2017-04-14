import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

export default class HtmlEditor extends React.Component {

  render() {
    const { persistedState, placeholder } = this.props;

    const content = persistedState.get('content');

    const wrapperStyle = {
      minHeight: 50
    };

    return (content) ? (
      <div
        className="html"
        style={wrapperStyle}
        dangerouslySetInnerHTML={{__html: content}}
      ></div>
    ) : (
      <div className="placeholder">{placeholder || 'Click to add your HTML'}</div>
    );
  }

  handleEditorStateChange(editorState) {
    const { persistedState, localState, onChange } = this.props;
    const content = editorState.getCurrentContent().getPlainText();

    const newPersistedState = persistedState.set('content', content);
    const newLocalState = localState.set('editorState', editorState);

    onChange({
      persistedState: newPersistedState,
      localState: newLocalState,
      html: this.generateHTML(newPersistedState)
    });
  }

  generateHTML(persistedState) {
    const content = persistedState.get('content') || '';

    return `<div class="html">${content}</div>`;
  }

}

HtmlEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired,
  placeholder: PropTypes.string
};
