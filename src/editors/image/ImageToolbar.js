import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Menu from '../../components/Menu';
import Toolbar from '../../components/Toolbar';
import ImageUpload from '../../editor-actions/ImageUpload';
import AlignmentBlock from '../../editor-actions/AlignmentBlock';
import ImageSize from '../../editor-actions/ImageSize';
import Margin from '../../editor-actions/Margin';
import ImageOnClick from '../../editor-actions/ImageOnClick';
import Accessibility from '../../editor-actions/Accessibility';


import { GALLERY_TYPES } from '../../helpers/constants';

export default function ImageToolbar(props) {

  const { height: maxHeight, width: maxWidth } = props.canvasPosition.toJS();

  const actions = [
    {
      Component: ImageUpload,
      props: {
        maxWidth,
        maxHeight
      },
      name: 'image-upload'
    },
    {
      Component: ImageSize,
      name: 'image-size'
    },
    {
      Component: AlignmentBlock,
      name: 'alignment-block'
    },
    {
      Component: ImageOnClick,
      name: 'image-onclick'
    },
    {
      Component: Margin,
      name: 'margin'
    },
    {
      Component: Accessibility,
      name: 'accessibility-button'
    },

  ];

  return (
    <Menu>
      <Toolbar
        actions={actions}
        {...props}
      />
    </Menu>
  );
}

ImageToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  canvasPosition: PropTypes.instanceOf(Map).isRequired
};
