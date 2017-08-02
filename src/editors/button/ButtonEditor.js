import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Editor, EditorState } from 'draft-js';
import HTMLParser from 'html-parse-stringify2';
import striptags from 'striptags';
import { decorator, convertFromHTML, convertToHTML, customStyleFn, blockStyleFn } from '../../helpers/draft/convert';
import { defaultButtonStyle, getButtonStyleString } from '../../helpers/styles/editor';

export default class ButtonEditor extends React.Component {

  componentWillMount() {
    const { persistedState } = this.props;
    const htmlContent = persistedState.get('content') || `<p>Button Text</p>`;

    const initialEditorState = EditorState.createWithContent(convertFromHTML(htmlContent), decorator);
    this.handleEditorStateChange(initialEditorState);
  }

  componentWillReceiveProps(nextProps) {
    const { persistedState } = this.props;

    const htmlContent = persistedState.get('content') || `<p>Button Text</p>`;

    if (nextProps.isEditing && nextProps.localState.isEmpty()) {
      // If there is no editorState, create a new blank one
      const initialEditorState = EditorState.createWithContent(convertFromHTML(htmlContent), decorator);
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

    const content = (persistedState.get('content')) || `<p>Button Text</p>`;
    const { textAlign, className } = persistedState.toJS();
    const buttonStyleProps = ['backgroundColor', 'borderRadius', 'padding', 'width', 'fontSize'];
    const classNameString = (className && className.length) ? ' ' + className : '';

    const containerStyle = {};
    if (textAlign) {
      containerStyle.textAlign = textAlign;
    }
    const buttonStyle = {};
    buttonStyleProps.forEach((key) => {
      if (persistedState.get(key)) {
        buttonStyle[key] = persistedState.get(key);
      }
    });

    const updatedButtonStyle = {
      ...defaultButtonStyle,
      ...buttonStyle,
      borderColor: buttonStyle.backgroundColor === '#ffffff' ? '#cccccc' : buttonStyle.backgroundColor
    }

    return (
      <div className="button-wrapper" style={containerStyle}>
        { (isEditing) ? (
          (editorState) ? (
            <a className="btn" style={{display: 'inline-block', cursor: 'text', ...updatedButtonStyle }}>
            <Editor
              ref={(editor) => this.editor = editor}
              editorState={editorState}
              customStyleFn={customStyleFn}
              blockStyleFn={blockStyleFn}
              onChange={(editorState) => this.handleEditorStateChange(editorState)}
            />
            </a>
          ) : null
        ) : (
          <a
            className={`btn${classNameString}`}
            style={updatedButtonStyle}
            disabled={true}
            data-field-id={zone.get('id')}
            value={striptags(content)}
          >
            <span
              dangerouslySetInnerHTML={{__html: content}}
            />
          </a>
        )}
      </div>
    );
  }

  // Instance Method
  focus() {
    if (this.editor) {
      this.editor.focus();
    }
  }

  handleEditorStateChange(editorState) {
    const { persistedState, localState, onChange } = this.props;
    const htmlContent = convertToHTML(editorState);

    const newPersistedState = persistedState.set('content', htmlContent);
    const newLocalState = localState.set('editorState', editorState);

    onChange({
      persistedState: newPersistedState,
      localState: newLocalState,
      html: this.generateHTML(newPersistedState)
    });
  }

  generateHTML(persistedState) {
    const { zone } = this.props;
    const { content = '<p style="margin-bottom:0px;"></p>', textAlign, backgroundColor, href, borderRadius, padding, fontSize, width, className, isNewWindow, buttonAction } = persistedState.toJS();

    const wrapperAttrs = {
      class: 'button-wrapper'
    };
    if (textAlign) {
      wrapperAttrs.style = `text-align:${textAlign};`;
    }

    const buttonAttrs = {
      class: 'btn',
      ['data-field-id']: zone.get('id'),
      value: striptags(content)
    };
    buttonAttrs.style = getButtonStyleString(borderRadius, padding, fontSize, width);

    if (backgroundColor) {
      buttonAttrs.style = buttonAttrs.style + `background-color:${backgroundColor};`;
      buttonAttrs.style = buttonAttrs.style + `border-color:${backgroundColor === '#ffffff' ? '#cccccc' : backgroundColor};`
    }

    if (href) {
      buttonAttrs.href = href;
      buttonAttrs.target = (isNewWindow) ? '_target' : '_self';
    } else if (buttonAction) {
      buttonAttrs['data-step'] = buttonAction;
    }

    const contentAst = HTMLParser.parse(content);
    contentAst[0].attrs.style = `margin-bottom:0px;font-size:inherit;`;

    const ast = [];
    ast.push({
      type: 'tag',
      name: 'div',
      voidElement: false,
      attrs: wrapperAttrs,
      children: [
        {
          type: 'tag',
          // name: (href) ? 'a' : 'button',
          name: 'a',
          voidElement: false,
          attrs: buttonAttrs,
          children: [
            {
              type: 'tag',
              name: 'span',
              voidElement: false,
              children: contentAst
            }
          ]
        }
      ]
    });

    return HTMLParser.stringify(ast);
  }

}

ButtonEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired,
  zone: PropTypes.instanceOf(Map).isRequired
};
