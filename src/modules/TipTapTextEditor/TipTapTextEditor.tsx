// ** React Imports
import React from 'react';
/* MUI */
import Box from '@mui/material/Box';
import BulletList from '@tiptap/extension-bullet-list';
/* TIPTAP */
import { Color } from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

/* LOCAL */
import EditorToolbarVertical from './EditorToolbar/EditorToolbarVertical';
/* TYPES */
import type { TipTapTextEditorProps } from './TipTapTextEditor.types';
import TipTapTextEditorWrapper from './TipTapTextEditorWrapper';
/* UTILS */
import { FontSize } from './utils/extensions';
import HeaderMenuItem from '@/layouts/Layout/HeaderMenuItem';

const TipTapTextEditor = ({ value, onChange, sx = {}, disabled, height, id }: TipTapTextEditorProps) => {
  // paragraph extension
  const CustomParagraph = Paragraph.extend({
    addAttributes() {
      return {
        class: {
          default: '',
          // Take the attribute values
          renderHTML: (attributes) => {
            let newClass = '';
            if (attributes.class.includes('smallText')) {
              newClass = 'MuiTypography-smallText';
            } else if (attributes.class.includes('body1')) {
              newClass = 'MuiTypography-body1';
            } else if (attributes.class.includes('body2')) {
              newClass = 'MuiTypography-body2';
            } else if (attributes.class.includes('body3')) {
              newClass = 'MuiTypography-body3';
            } else if (attributes.class.includes('subtitle1')) {
              newClass = 'MuiTypography-subtitle1';
            } else if (attributes.class.includes('subtitle2')) {
              newClass = 'MuiTypography-subtitle2';
            }
            // … and return an object with HTML attributes.
            return {
              class: `MuiTypography-root ${newClass}`,
            };
          },
        },
      };
    },
  });

  // heading extension
  const CustomHeading = Heading.extend({
    addAttributes() {
      return {
        class: {
          default: '',
          // Take the attribute values
          renderHTML: (attributes) => {
            // … and return an object with HTML attributes.
            return {
              class: `MuiTypography-root MuiTypography-h${attributes?.level} ${attributes?.class}`,
            };
          },
        },
      };
    },
  });

  // extract color
  const { color: sxColor, ...restSx } = sx || {};

  return (
    <Box
      sx={{
        '& .tiptap': {
          outline: 'none',
          minHeight: height || 200,
          p: 3,
        },
        border: '1px solid',
        borderColor: 'grey.400',
        borderRadius: 2,
        minHeight: '20px !important',
        overflow: 'visible',
        maxWidth: '100%',
        '& p,h1,h2,h3,h4,h5,h6': {
          marginBlockStart: 0,
          marginBlockEnd: 0,
        },
        ...restSx,
      }}
    >
      <EditorProvider
        key={id}
        content={value}
        onUpdate={({ editor }) => {
          onChange(editor?.getHTML() as string);
        }}
        extensions={[
          StarterKit,
          OrderedList,
          BulletList,
          ListItem,
          // CustomParagraph,
          // CustomHeading,
          Underline,
          TextAlign.configure({
            alignments: ['left', 'right', 'center', 'justify'],
            types: ['heading', 'paragraph'],
          }),
          TextStyle,
          Color.configure({
            types: ['textStyle'],
          }),
          FontFamily.configure({
            types: ['textStyle'],
          }),
          FontSize,
          Link.configure({
            protocols: ['https'],
            openOnClick: false,
          }),
          Youtube.configure({
            controls: false,
            nocookie: true,
            inline: true,
            modestBranding: true,
          }),
        ]}
        slotBefore={<EditorToolbarVertical toolsHidden={['chatbot', 'transcribe']} />}
      >
        <TipTapTextEditorWrapper disabled={disabled} value={value}>
          {null}
        </TipTapTextEditorWrapper>
      </EditorProvider>
    </Box>
  );
};

export default TipTapTextEditor;
