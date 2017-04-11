import React from 'react';

import IconButton from './IconButton';

export default class DeleteButton extends React.Component {
  render() {
    return (
      <IconButton
        title="delete"
        pathNode={
          <path d="M18.984 3.984v2.016h-13.969v-2.016h3.469l1.031-0.984h4.969l1.031 0.984h3.469zM6 18.984v-12h12v12c0 1.078-0.938 2.016-2.016 2.016h-7.969c-1.078 0-2.016-0.938-2.016-2.016z"></path>
        }
        {...this.props}
      />
    );
  }
}
