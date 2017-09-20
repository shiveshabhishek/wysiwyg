/* eslint react/display-name: 0 */  // Not exporting React components here
import React from 'react';
import { Map } from 'immutable';
import { convertToHTML as draftConvertToHTML, convertFromHTML as draftConvertFromHTML } from 'draft-convert';
import { LinkDecorator, linkToEntity, entityToLink, textToEntity } from '../../helpers/draft/LinkDecorator';
import { CompositeDecorator, DefaultDraftBlockRenderMap } from 'draft-js';

export const CUSTOM_STYLE_PREFIX_COLOR = 'COLOR_';

export const decorator = new CompositeDecorator([
  LinkDecorator
]);

export function convertFromPastedHTML(htmlContent) {
  return draftConvertFromHTML({
    htmlToStyle: (nodeName, node, currentStyle) => {
      if (nodeName === 'span' && node.style && node.style.color && node.style.color !== 'inherit') {
        return currentStyle.add(`${CUSTOM_STYLE_PREFIX_COLOR}${node.style.color}`);
      } else {
        return currentStyle;
      }
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
        case 'ul':
          nodeType = 'unordered-list-item';
          break;
      }
      const data = {};
      // console.log('STUFF checking nodes', nodeName)
      if (node.children.length < 1) {

        const textContent = node.innerText;
        const isBlank = /^\s+$/.test(textContent);
        // Don't convert elements that contain all whitespace content
        if (isBlank) {
          return;
        }
      }
      if (node.style && node.style.textAlign && nodeType !== 'unordered-list-item') {
        data.textAlign = node.style.textAlign;

        
        return {
          type: nodeType,
          data: {
            textAlign: node.style.textAlign,
            color: node.style.color && node.style.color !== 'inherit' ? node.style.color : 'inherit'
          }
        };
      }
      //console.log('STUF node data?', nodeName, node.style)
      // if (node.style) {
      //   if (node.style.textAlign) {
      //     data.textAlign = node.style.textAlign;

      //     if (node.style.color) {
      //       data.color = node.style.color;
      //     }

      //     console.log('STUFF returning node', nodeType, node.childNodes,data)
      //     return {
      //       type: nodeType,
      //       data: data
      //     }
      //   }

      //}

    }
  })(htmlContent);
}

export function convertFromHTML(htmlContent) {
  return draftConvertFromHTML({
    htmlToStyle: (nodeName, node, currentStyle) => {
      if (nodeName === 'span' && node.style && node.style.color) {
        return currentStyle.add(`${CUSTOM_STYLE_PREFIX_COLOR}${node.style.color}`);
      } else {
        return currentStyle;
      }
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
            textAlign: node.style.textAlign,
            color: node.style.color && node.style.color !== 'inherit' ? node.style.color : 'inherit'
          }
        };
      }
    }
  })(htmlContent);
}

export function convertToHTML(editorState) {
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
  })(editorState.getCurrentContent());
}

export function customStyleFn(style) {
  const styleNames = style.toJS();
  return styleNames.reduce((styles, styleName) => {
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
