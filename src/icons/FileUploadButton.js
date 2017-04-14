import React from 'react';

import IconButton from './IconButton';

export default class FileUploadbutton extends React.Component {
  render() {
    return (
      <IconButton
        title="file-upload"
        pathNode={
          <path d="M14.016 12.984h3l-5.016-4.969-5.016 4.969h3v4.031h4.031v-4.031zM19.359 10.031c2.578 0.188 4.641 2.344 4.641 4.969 0 2.766-2.25 5.016-5.016 5.016h-12.984c-3.328 0-6-2.672-6-6 0-3.094 2.344-5.625 5.344-5.953 1.266-2.391 3.75-4.078 6.656-4.078 3.656 0 6.656 2.578 7.359 6.047z"></path>
        }
        {...this.props}
      />
    );
  }
}
