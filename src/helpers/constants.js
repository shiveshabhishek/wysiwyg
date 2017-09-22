import FormButton from '../icons/FormButton';
import MediaButton from '../icons/MediaButton';
import AdvancedCategoryButton from '../icons/AdvancedCategoryButton';

export const DRAGABLE_ITEMS = {
  ROW: 'row',
  ZONE: 'zone'
};

export const GALLERY_TYPES = {
  HERO: 'gallery',
};

export const EDITOR_TYPES = {
  TEXT: 'RichText',
  IMAGE: 'Image',
  HERO: 'Hero',
  VIDEO: 'Video',
  HTML: 'HTML',
  TEXTINPUT: 'TextInput',
  TEXTAREAINPUT: 'TextAreaInput',
  RADIO: 'SelectionField',
  RATING: 'Rating',
  BUTTON: 'Button',
  EMOJI: 'Emoji'
}

export const categories = [
  {
    name: 'Text',
    content: [EDITOR_TYPES.TEXT]
  },
  {
    name: 'Media',
    content: [EDITOR_TYPES.IMAGE, EDITOR_TYPES.HERO, EDITOR_TYPES.EMOJI, EDITOR_TYPES.VIDEO],
    icon: MediaButton
  },
  {
    name: 'Forms',
    content: [EDITOR_TYPES.TEXTINPUT, EDITOR_TYPES.TEXTAREAINPUT, EDITOR_TYPES.RADIO, EDITOR_TYPES.RATING],
    icon: FormButton
  },
  {
    name: 'Advanced',
    content: [EDITOR_TYPES.BUTTON, EDITOR_TYPES.HTML],
    icon: AdvancedCategoryButton
  },
];

export const BUTTON_ACTION_TYPES = {
  URL: 'url',
  NEXT_PAGE: 'next',
  PREVIOUS_PAGE: 'prev',
  CUSTOM_PAGE: 'custom',
  END_FLOW: 'skip',
  NEXT_GROUP: 'end',
  APPCUES: 'appcues'
};

export const BUTTON_ACTIONS_WITH_DATA_STEP_ATTRS = [
  BUTTON_ACTION_TYPES.NEXT_PAGE,
  BUTTON_ACTION_TYPES.PREVIOUS_PAGE,
  BUTTON_ACTION_TYPES.END_FLOW,
  BUTTON_ACTION_TYPES.NEXT_GROUP
];

export const BUTTON_ACTION_TYPES_LIST = [
  {
    label: 'Go to URL',
    value: BUTTON_ACTION_TYPES.URL
  },
  {
    label: 'Go to Next Step',
    value: BUTTON_ACTION_TYPES.NEXT_PAGE
  },
  {
    label: 'Go to Previous Step',
    value: BUTTON_ACTION_TYPES.PREVIOUS_PAGE
  },
  {
    label: 'Go to Custom Step',
    value: BUTTON_ACTION_TYPES.CUSTOM_PAGE
  },
  {
    label: 'Dismiss Entire Flow',
    value: BUTTON_ACTION_TYPES.END_FLOW
  },
  {
    label: 'Skip to Next Group',
    value: BUTTON_ACTION_TYPES.NEXT_GROUP
  },
  {
    label: 'Trigger Appcues Flow',
    value: BUTTON_ACTION_TYPES.APPCUES
  }
];

export const IMG_ACTION_TYPES = {
  URL: 'url',
  APPCUES: 'appcues'
};
