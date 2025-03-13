import type { Icon } from '@phosphor-icons/react';
import {
  Image,
  LinkSimpleHorizontal,
  ListBullets,
  ListNumbers,
  TextAa,
  TextAlignCenter,
  TextAlignJustify,
  TextAlignLeft,
  TextAlignRight,
  TextB,
  TextH,
  TextHFive,
  TextHFour,
  TextHOne,
  TextHSix,
  TextHThree,
  TextHTwo,
  TextItalic,
  TextT,
  TextUnderline,
  YoutubeLogo,
} from '@phosphor-icons/react';
import { IconH1, IconH2, IconH3, IconH4, IconH5, IconH6, IconH } from '@tabler/icons-react';

export const EDITOR_ICONS = {
  bold: TextB,
  underline: TextUnderline,
  italic: TextItalic,
  heading: TextH,
  font_family: TextT,
  font_size: TextAa,
  text_align_left: TextAlignLeft,
  text_align_right: TextAlignRight,
  text_align_center: TextAlignCenter,
  text_align_justify: TextAlignJustify,
  orderedList: ListNumbers,
  bulletList: ListBullets,
  link: LinkSimpleHorizontal,
  video: YoutubeLogo,
  image: Image,
  heading_1: TextHOne,
  heading_2: TextHTwo,
  heading_3: TextHThree,
  heading_4: TextHFour,
  heading_5: TextHFive,
  heading_6: TextHSix,
} as Record<string, Icon>;

export const FONT_FAMILY_LIST = [
  {
    label: 'Arial',
    value: 'Arial',
  },
  {
    label: 'Georgia',
    value: 'Georgia',
  },
  {
    label: 'Helvetica',
    value: 'Helvetica',
  },
  {
    label: 'Sans Serif',
    value: 'Sans Serif',
  },
  {
    label: 'Tahoma',
    value: 'Tahoma',
  },
  {
    label: 'Times New Roman',
    value: 'Times New Roman',
  },
  {
    label: 'Trebuchet',
    value: 'Trebuchet',
  },
  {
    label: 'Verdana',
    value: 'Verdana',
  },
];
export const HEADINGS_LIST = [
  {
    icon: EDITOR_ICONS.heading_1,
    value: 1,
  },
  {
    icon: EDITOR_ICONS.heading_2,
    value: 2,
  },
  {
    icon: EDITOR_ICONS.heading_3,
    value: 3,
  },
  {
    icon: EDITOR_ICONS.heading_4,
    value: 4,
  },
  {
    icon: EDITOR_ICONS.heading_5,
    value: 5,
  },
  {
    icon: EDITOR_ICONS.heading_6,
    value: 6,
  },
];
export const FONT_SIZE_LIST = [
  '8px',
  '10px',
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '22px',
  '24px',
  '26px',
  '28px',
  '30px',
  '32px',
  '34px',
  '36px',
  '38px',
  '40px',
  '42px',
  '44px',
  '46px',
  '48px',
  '50px',
  '56px',
  '62px',
  '68px',
];
