/* eslint react/display-name: 0 */  // Not exporting React components here
import React from 'react';
import { convertToHTML as draftConvertToHTML, convertFromHTML as draftConvertFromHTML } from 'draft-convert';
import { LinkDecorator, linkToEntity, entityToLink } from '../../helpers/draft/LinkDecorator';
import { CompositeDecorator, ContentState } from 'draft-js';

export const CUSTOM_STYLE_PREFIX_COLOR = 'COLOR_';
export const NBSP = "\xA0";
export const ZWSP = "\u200B";
export const ZWSP_RE = new RegExp(ZWSP, "g");

export const decorator = new CompositeDecorator([
  LinkDecorator
]);


export function convertFromHTML(htmlContent) {
  // We add zero-width spaces (unicode 200B) to get the browser to render a line
  // break for a <br> and to give empty unstyled blocks (<p> tags) a size (see
  // convertToHTML() below). When editing, we don't really want those zero-width
  // spaces in there, so just remove them here.
  htmlContent = htmlContent.replace(ZWSP_RE, "");

  return draftConvertFromHTML({
    htmlToStyle: (nodeName, node, currentStyle) => {
      if (node instanceof HTMLElement && node.style) {
        if (nodeName === 'span' && node.style.color && node.style.color !== 'inherit') {
          currentStyle = currentStyle.add(`${CUSTOM_STYLE_PREFIX_COLOR}${node.style.color}`);
        }
        if (node.style.fontWeight === 'normal') {
          currentStyle = currentStyle.remove('BOLD');
        }
      }
      return currentStyle;
    },
    htmlToEntity: (nodeName, node) => {
      const entity = linkToEntity(nodeName, node);
      return entity;
    },
    textToEntity: () => {
      return [];
    },
    htmlToBlock: (nodeName, node) => {
      let nodeType = 'unstyled';
      switch(nodeName) {
        case 'h1':
          nodeType = 'header-one';
          break;
        case 'h2':
          nodeType = 'header-two';
          break;
        case 'h3':
          nodeType = 'header-three';
          break;
        case 'h4':
          nodeType = 'header-four';
          break;
        case 'h5':
          nodeType = 'header-five';
          break;
      }

      if (node.style && node.style.textAlign) {
        return {
          type: nodeType,
          data: {
            textAlign: node.style.textAlign
          }
        };
      }
    }
  })(htmlContent);
}

export function convertFromPastedHTML(htmlContent) {
  return draftConvertFromHTML({
    htmlToStyle: (nodeName, node, currentStyle) => {
      if (nodeName === 'span' && node.style && node.style.color && node.style.color !== 'inherit') {
        return currentStyle.add(`${CUSTOM_STYLE_PREFIX_COLOR}${node.style.color}`);
      }
      return currentStyle;
    },
    htmlToEntity: (nodeName, node) => {
      const entity = linkToEntity(nodeName, node);
      return entity;
    },
    htmlToBlock: (nodeName, node) => {
      const textContent = node.innerText;
      const isBlank = /^\s+$/.test(textContent);

      // Target single, non-inline nodes and trim their whitespace.
      if (node.children.length < 1) {
        if (isBlank) return;

        const hasLeadingWhitespace = /^\s+/.test(textContent);
        const hasTrailingWhitespace = /\s+$/.test(textContent);
        if (hasLeadingWhitespace || hasTrailingWhitespace) {
          node.innerText = node.innerText.trim();
        }
      }

      // Don't convert table elements
      if (nodeName === 'table' || nodeName === 'tr' || nodeName === 'td' || nodeName === 'tbody') return;

      let nodeType = 'unstyled';
      switch(nodeName) {
        case 'h1':
          nodeType = 'header-one';
          break;
        case 'h2':
          nodeType = 'header-two';
          break;
        case 'h3':
          nodeType = 'header-three';
          break;
        case 'h4':
          nodeType = 'header-four';
          break;
        case 'h5':
          nodeType = 'header-five';
          break;
        case 'br':
          return false;
      }

      const isNotNestedBlock = nodeName !== 'ul' && nodeName !== 'ol' && nodeName !== 'blockquote';

      if (node.style && node.style.textAlign && isNotNestedBlock) {
        return {
          type: nodeType,
          data: {
            textAlign: node.style.textAlign
          }
        };
      }

    }
  })(htmlContent);
}

export function convertToHTML(editorState) {
  const transformedContentState = ContentState.createFromBlockArray(
    editorState.getCurrentContent().getBlockMap().map(block =>
      block.update('text', text =>
        text
          // Replaces extra spaces with &nbsp; characters.
          .replace(/ {2,}/g, match => NBSP.repeat(match.length))
          // Replaces a leading space with &nbsp;
          .replace(/^ /, NBSP)
          // Replaces single trailing newlines with a newline and a zero-width
          // space, so that the <br> that the newline turns into actually
          // renders a line break in the browser. Normally a <br> followed by
          // nothing will collapse and not cause a line break to be rendered.
          // Adding the zero-width space (unicode 200B) after the <br> causes
          // the browser to render the line break. See this SO question for
          // more: https://stackoverflow.com/q/15008205
          .replace(/\n/g, `\n${ZWSP}`)
          // For empty paragraphs (created when the user hits Return but doesn't
          // add any actual text afterwards), the browser will render the <p>
          // tag with no height if there's no content inside. Add a zero-width
          // space inside so that it has content and has a size.
          .replace("", () => (block.getType() === 'unstyled' && block.getLength() === 0) ? ZWSP : "")
      )
    ).toArray()
  );
  return draftConvertToHTML({
    styleToHTML: (style) => {
      if (style.indexOf(CUSTOM_STYLE_PREFIX_COLOR) === 0) {
        return <span style={{color: style.substr(CUSTOM_STYLE_PREFIX_COLOR.length)}} />;
      }
    },
    blockToHTML: (block) => {
      if (block.data && Object.keys(block.data).length) {
        const styleProps = {
          style: block.data
        };

        switch(block.type) {
          case 'header-one':
            return <h1 {...styleProps} />;
          case 'header-two':
            return <h2 {...styleProps} />;
          case 'header-three':
            return <h3 {...styleProps} />;
          case 'header-four':
            return <h4 {...styleProps} />;
          case 'header-five':
            return <h5 {...styleProps} />;
          default:
            return <p {...styleProps} />;
        }
      }
    },
    entityToHTML: (entity, originalText) => {
      originalText = entityToLink(entity, originalText);
      return originalText;
    }
  })(transformedContentState);
}

export function customStyleFn(style) {
  const styleNames = style.toJS();
  return styleNames.reduce((styles, styleName) => {
    if (styleName === 'CODE') {
      styles.color = '#c7254e';
      styles.padding = '2px 4px';
      styles.fontSize = '90%';
      styles.backgroundColor = 'rgba(249,242,244,0.7)';
      styles.borderRadius = '4px';
    }
    if (styleName === 'CODE' || styleName === 'PRE') {
      styles.fontFamily = 'Menlo,Monaco,Consolas,"Courier New",monospace';
    }
    if(styleName.startsWith(CUSTOM_STYLE_PREFIX_COLOR)) {
      styles.color = styleName.split(CUSTOM_STYLE_PREFIX_COLOR)[1];
    }
    return styles;
  }, {});
}

export function blockStyleFn(contentBlock) {
  const { textAlign } = contentBlock.getData().toJS();
  if (textAlign) {
    return `align-${textAlign}`;
  }
}

export function getResetSelection(editorState) {

  const firstBlock = editorState.getCurrentContent().getFirstBlock();
  const firstBlockKey = firstBlock.getKey();

  const currentSelection = editorState.getSelection();
  const newSelection = currentSelection
    .set('anchorKey', firstBlockKey)
    .set('focusKey', firstBlockKey)
    .set('anchorOffset', 0)
    .set('focusOffset', 0)
    .set('isBackward', false)

    return newSelection
}
