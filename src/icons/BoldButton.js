import React from 'react';

import IconButton from './IconButton';

export default class BoldButton extends React.Component {
  render() {
    return (
      <IconButton
        title="format_bold"
        pathNode={
          <path d="M13.5 15.516c0.844 0 1.5-0.656 1.5-1.5s-0.656-1.5-1.5-1.5h-3.516v3h3.516zM9.984 6.516v3h3c0.844 0 1.5-0.656 1.5-1.5s-0.656-1.5-1.5-1.5h-3zM15.609 10.781c1.313 0.609 2.156 1.922 2.156 3.422 0 2.109-1.594 3.797-3.703 3.797h-7.078v-14.016h6.281c2.25 0 3.984 1.781 3.984 4.031 0 1.031-0.656 2.109-1.641 2.766z"></path>
        }
        {...this.props}
      />
    );
  }
}
