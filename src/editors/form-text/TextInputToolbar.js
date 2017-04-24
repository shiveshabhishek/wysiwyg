import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Menu from '../../components/Menu';
import Toolbar from '../../components/Toolbar';
import InputFieldOptions from '../../editor-actions/InputFieldOptions';

const editorActions = [
  {
    Component: InputFieldOptions,
    name: 'inputfield-options'
  }
];

export default function TextInputToolbar(props) {
  return (
    <Menu>
      <Toolbar
        editorActions={editorActions}
        {...props}
      />
    </Menu>
  );
}

TextInputToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
