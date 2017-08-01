
export function getButtonProps(isActive) {
  return {
    hideBackground: true,
    color: (isActive) ? '#23baff' : '#808080',
    clickColor: '#333',
    activeColor: '#23baff',
    hoverColor: (isActive) ? '#23baff' : '#333'
  };
}

export const secondaryMenuTitleStyle = {
  textTransform: 'uppercase',
  fontSize: 'smaller',
  color: '#808080',
  marginBottom: 20
};

export const textInputStyle = {
  display: 'block',
  margin: 0,
  width: '95%',
  fontSize: 18,
  appearance: 'none',
  boxShadow: 'none',
  borderRadius: 'none',
  padding: 4,
  outline: 'none'
};

export const dropdownStyle = {
  display: 'block',
  margin: 0,
  width: '95%',
  fontSize: 18,
  appearance: 'none',
  boxShadow: 'none',
  borderRadius: 'none',
  padding: 4
};

export const checkboxStyle = {
  marginRight: 10
};

export const placeholderStyle = {
  textAlign: 'center',
  color: '#808080',
  fontSize: 'smaller',
  textTransform: 'uppercase'
};


export const emojiPickerStyles = `.emoji-mart,
.emoji-mart * {
  box-sizing: border-box;
  line-height: 1.15;
}

.emoji-mart {
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
  font-size: 16px;
  display: inline-block;
  color: #222427;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  background: #fff;
}

.emoji-mart .emoji-mart-emoji {
  padding: 6px;
  cursor: pointer;
}

.emoji-mart-bar {
  border: 0 solid #d9d9d9;
}
.emoji-mart-bar:first-child {
  border-bottom-width: 1px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.emoji-mart-bar:last-child {
  border-top-width: 1px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.emoji-mart-anchors {
  display: flex;
  justify-content: space-between;
  padding: 0 6px;
  color: #858585;
  line-height: 0;
}

.emoji-mart-anchor {
  position: relative;
  flex: 1;
  text-align: center;
  padding: 12px 4px;
  overflow: hidden;
  transition: color .1s ease-out;
}
.emoji-mart-anchor:hover,
.emoji-mart-anchor-selected {
  color: #464646;
}

.emoji-mart-anchor-selected .emoji-mart-anchor-bar {
  bottom: 0;
}

.emoji-mart-anchor-bar {
  position: absolute;
  bottom: -3px; left: 0;
  width: 100%; height: 3px;
  background-color: #464646;
}

.emoji-mart-anchors i {
  display: inline-block;
  width: 100%;
  max-width: 22px;
}

.emoji-mart-anchors svg {
  fill: currentColor;
  max-height: 18px;
}

.emoji-mart-scroll {
  overflow-y: scroll;
  height: 135px;
  padding: 0 6px 6px 6px;
}

.emoji-mart-search {
  margin-top: 6px;
  padding: 0 6px;
}
.emoji-mart-search input {
  font-size: 16px;
  display: block;
  width: 100%;
  padding: .2em .6em;
  border-radius: 25px;
  border: 1px solid #d9d9d9;
  outline: 0;
}

.emoji-mart-category .emoji-mart-emoji span {
  z-index: 1;
  position: relative;
  text-align: center;
  cursor: default;
}

.emoji-mart-category .emoji-mart-emoji:hover:before {
  z-index: 0;
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: #f4f4f4;
  border-radius: 100%;
}

.emoji-mart-category-label {
  z-index: 2;
  position: relative;
  top: 0;
}

.emoji-mart-category-label span {
  display: block;
  width: 100%;
  font-weight: 500;
  padding: 5px 6px;
  background-color: #fff;
  background-color: rgba(255, 255, 255, .95);
}

.emoji-mart-emoji {
  position: relative;
  display: inline-block;
  font-size: 0;
}

.emoji-mart-no-results {
  font-size: 14px;
  text-align: center;
  padding-top: 70px;
  color: #858585;
}
.emoji-mart-no-results .emoji-mart-category-label {
  display: none;
}
.emoji-mart-no-results .emoji-mart-no-results-label {
  margin-top: .2em;
}
.emoji-mart-no-results .emoji-mart-emoji:hover:before {
  content: none;
}

.emoji-mart-preview {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.emoji-mart-preview-emoji, .emoji-mart-preview-shortname, .emoji-mart-preview-emoticon {
  display: none;
}

.emoji-mart-preview-skins {
  right: 30px;
  text-align: right;
}

.emoji-mart-title-label {
  color: #999A9C;
  font-size: 26px;
  font-weight: 300;
}

.emoji-mart-skin-swatches {
  font-size: 0;
  padding: 2px 0;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  background-color: #fff;
  height: 22px;
  align-items: center;
  display: flex;
}

.emoji-mart-skin-swatches-opened .emoji-mart-skin-swatch {
  width: 16px;
  padding: 0 2px;
}

.emoji-mart-skin-swatches-opened .emoji-mart-skin-swatch-selected:after {
  opacity: .75;
}

.emoji-mart-skin-swatch {
  display: inline-block;
  width: 0;
  vertical-align: middle;
  transition-property: width, padding;
  transition-duration: .125s;
  transition-timing-function: ease-out;
  cursor: pointer;
}

.emoji-mart-skin-swatch:nth-child(1) { transition-delay: 0s }
.emoji-mart-skin-swatch:nth-child(2) { transition-delay: .03s }
.emoji-mart-skin-swatch:nth-child(3) { transition-delay: .06s }
.emoji-mart-skin-swatch:nth-child(4) { transition-delay: .09s }
.emoji-mart-skin-swatch:nth-child(5) { transition-delay: .12s }
.emoji-mart-skin-swatch:nth-child(6) { transition-delay: .15s }

.emoji-mart-skin-swatch-selected {
  position: relative;
  width: 16px;
  padding: 0 2px;
}
.emoji-mart-skin-swatch-selected:after {
  content: "";
  position: absolute;
  top: 50%; left: 50%;
  width: 4px; height: 4px;
  margin: -2px 0 0 -2px;
  background-color: #fff;
  border-radius: 100%;
  pointer-events: none;
  opacity: 0;
  transition: opacity .2s ease-out;
}

.emoji-mart-skin {
  display: inline-block;
  width: 100%; padding-top: 100%;
  max-width: 12px;
  border-radius: 100%;
}

.emoji-mart-skin-tone-1 { background-color: #ffc93a }
.emoji-mart-skin-tone-2 { background-color: #fadcbc }
.emoji-mart-skin-tone-3 { background-color: #e0bb95 }
.emoji-mart-skin-tone-4 { background-color: #bf8f68 }
.emoji-mart-skin-tone-5 { background-color: #9b643d }
.emoji-mart-skin-tone-6 { background-color: #594539 }
`;