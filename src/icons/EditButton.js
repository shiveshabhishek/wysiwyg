import React from 'react';

import IconButton from './IconButton';

export default class EditButton extends React.Component {
  render() {
    return (
      <IconButton
        title="mode_edit"
        pathNode={
          <path d="M20.719 7.031l-1.828 1.828-3.75-3.75 1.828-1.828c0.375-0.375 1.031-0.375 1.406 0l2.344 2.344c0.375 0.375 0.375 1.031 0 1.406zM3 17.25l11.063-11.063 3.75 3.75-11.063 11.063h-3.75v-3.75z"></path>
        }
        {...this.props}
      />
    );
  }
}
