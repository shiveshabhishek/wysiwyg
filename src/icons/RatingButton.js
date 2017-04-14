import React from 'react';

import IconButton from './IconButton';

export default class RatingButton extends React.Component {
  render() {
    return (
      <IconButton
        title="rating"
        pathNode={
          <path d="M20.063 2.016c3.891 4.031 3.891 10.078 0 13.969l-1.641-1.594c2.766-3.188 2.766-7.781 0-10.781zM16.781 5.344c2.016 2.203 2.016 5.25 0 7.266l-1.688-1.688c0.844-1.172 0.844-2.719 0-3.891zM9 15c2.672 0 8.016 1.313 8.016 3.984v2.016h-16.031v-2.016c0-2.672 5.344-3.984 8.016-3.984zM5.016 9c0-2.203 1.781-3.984 3.984-3.984s3.984 1.781 3.984 3.984-1.781 3.984-3.984 3.984-3.984-1.781-3.984-3.984z"></path>
        }
        {...this.props}
      />
    );
  }
}
