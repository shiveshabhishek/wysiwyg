import React from 'react';

import EditorBase from './EditorBase';

export default class ButtonEditor extends EditorBase {

  shouldComponentUpdate(nextProps) {
    if (this.props.isEditing === true && nextProps.isEditing === true) {
      return false;
    }
    return true;
  }

  render() {
    const { isEditing, value } = this.props;

    const content = (value && value.content) || 'Button Text';

    return (
      <button className="button" disabled>
        { (isEditing) ? (
          <span
            contentEditable={true}
            onKeyUp={(e) => this.handleKeyUp(e)}
            dangerouslySetInnerHTML={{
              __html: content
            }}
          />
        ) : (
          <span>{content}</span>
        )}
      </button>
    );
  }

  handleKeyUp(e) {
    const content = e.currentTarget.innerHTML || '';
    this.saveChanges({content});
  }

  saveChanges(value) {
    this.props.onChange({
      value,
      html: `<button class="button"><span>${value.content}</span></button>`
    });
  }
}
