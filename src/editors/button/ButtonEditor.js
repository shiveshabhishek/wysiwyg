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

  shouldComponentUpdate(nextProps) {
    const { localState } = this.props;
    const hasButtonTextChanged = localState.get('buttonText') != nextProps.localState.get('buttonText');

    if (hasButtonTextChanged){
      return false;
    }

    return true;
  }

  render() {
    const { isEditing, persistedState, localState, zone } = this.props;
    const editorState = localState.get('editorState');

    const buttonText = persistedState.get('buttonText') || "OK, Got it!";
    const buttonTextColor = persistedState.get('buttonTextColor') || "#808080";
    const { textAlign, className, marginTop, marginRight, marginBottom, marginLeft } = persistedState.toJS();
    const buttonStyleProps = ['backgroundColor', 'borderRadius', 'padding', 'width', 'fontSize'];
    const classNameString = (className && className.length) ? ' ' + className : '';

    const containerStyle = {};
    if (textAlign) {
      containerStyle.textAlign = textAlign;
    }
    if (marginTop) {
      containerStyle.marginTop = marginTop;
    };
    if (marginRight) {
      containerStyle.marginRight = marginRight;
    };
    if (marginBottom) {
      containerStyle.marginBottom = marginBottom;
    };
    if (marginLeft) {
      containerStyle.marginLeft = marginLeft;
    };

    const buttonStyle = {};
    buttonStyleProps.forEach((key) => {
      if (persistedState.get(key)) {
        buttonStyle[key] = persistedState.get(key);
      }
    });

    const updatedButtonStyle = {
      ...defaultButtonStyle,
      ...buttonStyle,
      color: buttonTextColor,
      borderColor: buttonStyle.backgroundColor === '#ffffff' ? buttonTextColor : buttonStyle.backgroundColor
    }

    return (
      <div className="button-wrapper" style={containerStyle}>
        { (isEditing) ? (
          (editorState) ? (
            <a className="btn"
              style={{display: 'inline-block', cursor: 'text', ...updatedButtonStyle }}
              contentEditable
              onInput={ (e) => this.onChangeButtonText(e.target.textContent) }
              >{buttonText}
            </a>
          ) : null
        ) : (
          <a
            className={`btn${classNameString}`}
            style={updatedButtonStyle}
            disabled={true}
            data-field-id={zone.get('id')}>
            {buttonText}
          </a>
        )}
      </div>
    );
  }

  // Instance Method
  focus() {
    // if (this.editor) {
    //   this.editor.focus();
    // }
  }

  onChangeButtonText(text) {
    const { persistedState, localState, onChange } = this.props;
    const newPersistedState = persistedState.set('buttonText', text);
    const newLocalState = localState.set('buttonText', text);

    onChange({
      persistedState: newPersistedState,
      localState: newLocalState,
      html: this.generateHTML(newPersistedState)
    });
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
    const { content = '<p style="margin-bottom:0px;"></p>', textAlign, backgroundColor, href, borderRadius, padding, fontSize, width, className, isNewWindow, buttonAction, buttonText, marginTop, marginRight, marginBottom, marginLeft } = persistedState.toJS();

    const wrapperAttrs = {
      class: 'button-wrapper'
    };
    if (textAlign) {
      wrapperAttrs.style = `text-align:${textAlign};`;
    }
    if (marginTop) {
      wrapperAttrs.style = wrapperAttrs.style + `marginTop:${marginTop}px;`;
    };
    if (marginRight) {
      wrapperAttrs.style = wrapperAttrs.style + `marginRight:${marginRight}px;`;
    };
    if (marginBottom) {
      wrapperAttrs.style = wrapperAttrs.style + `marginBottom:${marginBottom}px;`;
    };
    if (marginLeft) {
      wrapperAttrs.style = wrapperAttrs.style + `marginLeft:${marginLeft}px;`;
    };

    const buttonAttrs = {
      class: 'btn',
      ['data-field-id']: zone.get('id')
    };
    const buttonTextColor = persistedState.get('buttonTextColor') || "#808080";
    buttonAttrs.style = getButtonStyleString(borderRadius, padding, fontSize, width, buttonTextColor);

    if (backgroundColor) {
      buttonAttrs.style = buttonAttrs.style + `background-color:${backgroundColor};`;
      buttonAttrs.style = buttonAttrs.style + `border-color:${backgroundColor === '#ffffff' ? buttonTextColor : backgroundColor};`
    }

    if (href) {
      buttonAttrs.href = href;
      buttonAttrs.target = (isNewWindow) ? '_target' : '_self';
    } else if (buttonAction) {
      buttonAttrs['data-step'] = buttonAction;
    }

    const ast = [];
    ast.push({
      type: 'tag',
      name: 'div',
      voidElement: false,
      attrs: wrapperAttrs,
      children: [
        {
          type: 'tag',
          name: 'a',
          voidElement: false,
          attrs: buttonAttrs,
          children: [
            {
              type: 'text',
              content: buttonText
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
