import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import HTMLParser from 'html-parse-stringify2';
import { Editor, EditorState, ContentState } from 'draft-js';
import { INPUT_TYPES } from '../../helpers/constants';

export default class TextInputEditor extends React.Component {

  componentWillMount() {
    const { persistedState } = this.props;
    const content = persistedState.get('label') || '';
    const initialEditorState = EditorState.createWithContent(ContentState.createFromText(content));
    this.handleEditorStateChange(initialEditorState);
  }

  componentWillReceiveProps(nextProps) {
    const { persistedState } = this.props;

    const content = persistedState.get('label') || '';

    if (nextProps.isEditing && nextProps.localState.isEmpty()) {
      // If there is no editorState, create a new blank one
      const initialEditorState = EditorState.createWithContent(ContentState.createFromText(content));
      this.handleEditorStateChange(initialEditorState);
    } else if (nextProps.isEditing) {
      // If editorState changes from the toolbar, push any changes up the chain
      const oldEditorState = this.props.localState.get('editorState');
      const newEditorState = nextProps.localState.get('editorState');
      if (oldEditorState !== newEditorState) {
        this.handleEditorStateChange(newEditorState);
      }
    }
  }

  render() {
    const { isEditing, persistedState, localState, zone } = this.props;
    const editorState = localState.get('editorState');

    const label = persistedState.get('label');
    const placeholder = (persistedState.get('placeholder'));
    const maxLength = (persistedState.get('maxLength')) || '';
    const isRequired = (persistedState.get('isRequired')) || false;
    const inputType = (persistedState.get('inputType')) || INPUT_TYPES.TEXT;

    const { marginTop, marginRight, marginBottom, marginLeft } = persistedState.toJS();

    const wrapperStyle = {};
    if (marginTop) {
      wrapperStyle.marginTop = marginTop;
    };
    if (marginRight) {
      wrapperStyle.marginRight = marginRight;
    };
    if (marginBottom) {
      wrapperStyle.marginBottom = marginBottom;
    };
    if (marginLeft) {
      wrapperStyle.marginLeft = marginLeft;
    };

    return (
      <div>
        <style>
          {`label [contenteditable] {
              cursor: text;
            }
            .public-DraftEditorPlaceholder-root {
              pointer-events: none;
              color: #999;
            }
            input {
              font-family: inherit;
            }
          `}
        </style>
        { isEditing ? (
          <form className="step-action-form" style={wrapperStyle}>
            <div className="fields">
              <div data-field-id={ zone.get('id') } className="field">
                <div data-appcues-required={ isRequired } style={{ marginTop: 0, padding: 0 }} className="form-field form-field-textarea">
                  <div className="field-label">
                    <label htmlFor={ zone.get('id') } className="label-display">
                      { (editorState) ? (
                        <Editor
                          ref={(editor) => this.editor = editor}
                          editorState={editorState}
                          placeholder="Add Label..."
                          onChange={(editorState) => this.handleEditorStateChange(editorState)}
                        />
                      ) : null }
                    </label>
                  </div>
                  <div className="field-controls">
                    <input name={ zone.get('id') } type={inputType} className="placeholder-value" onChange={(e) => this.handleInputChange(e)} value={placeholder} placeholder="Add Placeholder Text" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <form className="step-action-form" style={wrapperStyle}>
            <div className="fields">
              <div data-field-id={ zone.get('id') } className="field">
                <div data-appcues-required={ isRequired } style={{ marginTop: 0, padding: 0 }} className="form-field form-field-textarea">
                  <div className="field-label">
                    <label htmlFor={ zone.get('id') } className="label-display">{(isRequired) ? '*' : ''} { label }</label>
                  </div>
                  <div className="field-controls">
                    <input name={ zone.get('id') } type={inputType} required={isRequired} maxLength={maxLength} placeholder={ placeholder } className="placeholder-value" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }

  // Instance Method
  focus() {
  }

  handleEditorStateChange(editorState) {
    const { persistedState, localState, onChange } = this.props;
    const content = editorState.getCurrentContent().getPlainText();

    const newPersistedState = persistedState.set('label', content);
    const newLocalState = localState.set('editorState', editorState);

    onChange({
      persistedState: newPersistedState,
      localState: newLocalState,
      html: this.generateHTML(newPersistedState)
    });
  }

  handleInputChange(e) {
    const placeholder = e.currentTarget.value;
    const { persistedState, localState, onChange } = this.props;

    const newPersistedState = persistedState.set('placeholder', placeholder);

    onChange({
      persistedState: newPersistedState,
      localState,
      html: this.generateHTML(newPersistedState)
    });
  }

  generateHTML(persistedState) {
    const { zone } = this.props;
    const { label, placeholder, isRequired = false, maxLength, marginTop, marginRight, marginBottom, marginLeft, inputType } = persistedState.toJS();

    const inputAttrs = {
      type: inputType || 'text',
      class: 'form-control',
      ['data-field-id']: zone.get('id')
    };
    if (isRequired) {
      inputAttrs.required = '';
    }
    if (maxLength) {
      inputAttrs['maxlength'] = maxLength;
    }
    if (placeholder && placeholder.length) {
      inputAttrs.placeholder = placeholder;
    }

    let styles = '';
    if (marginTop) {
      styles = styles + `marginTop:${marginTop}px;`;
    };
    if (marginRight) {
      styles = styles + `marginRight:${marginRight}px;`;
    };
    if (marginBottom) {
      styles = styles + `marginBottom:${marginBottom}px;`;
    };
    if (marginLeft) {
      styles = styles + `marginLeft:${marginLeft}px;`;
    };

    const ast = [];
    ast.push({
      type: 'tag',
      name: 'form',
      attrs: { 
        class: "step-action-form",
        style: styles 
      },
      voidElement: false,
      children: [
        {
          type: 'tag',
          name: 'div',
          attrs: { class: "fields" },
          voidElement: false,
          children: [
            {
              type: 'tag',
              name: 'div',
              attrs: { class: "field", ['data-field-id']: zone.get('id') },
              voidElement: false,
              children: [
                {
                  type: 'tag',
                  name: 'div',
                  attrs: {
                    class: 'form-field form-field-text',
                    style: "marginTop: 0; padding: 0;",
                    ['data-appcues-validation']: inputType || null,
                    ['data-appcues-required']: isRequired },
                  voidElement: false,
                  children: [
                    {
                      type: 'tag',
                      name: 'div',
                      attrs: { class: "field-label" },
                      voidElement: false,
                      children: [
                        {
                          type: 'tag',
                          name: 'label',
                          attrs: { class: "label-display", for: zone.get('id') },
                          voidElement: false,
                          children: [{
                            type: 'text',
                            content: (isRequired) ? `* ${label}` : label
                          }]
                        }
                      ]
                    }, 
                    {
                      type: 'tag',
                      name: 'div',
                      attrs: { class: "field-controls" },
                      voidElement: false,
                      children: [
                        {
                          type: 'tag',
                          name: 'input',
                          attrs: inputAttrs,
                          voidElement: true
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    });

    return HTMLParser.stringify(ast);
  }

}

TextInputEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired,
  zone: PropTypes.instanceOf(Map).isRequired
};
