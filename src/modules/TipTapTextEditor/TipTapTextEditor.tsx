'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { Color } from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

/* LOCAL */
import ClientSideOnly from './ClientSideOnly';
import EditorToolbarVertical from './EditorToolbar/EditorToolbarVertical';
import SelectionToolbar from './EditorToolbar/SelectionToolbar';
/* TYPES */
import type { TipTapTextEditorProps } from './TipTapTextEditor.types';
import TipTapTextEditorWrapper from './TipTapTextEditorWrapper';
/* UTILS */
// import { FontSize } from './utils/extensions';
// import HeaderMenuItem from '@/layouts/Layout/HeaderMenuItem';
import { Indentation } from './components/Indentation';

const TipTapTextEditor = ({
  value = '',
  onChange,
  sx = {},
  disabled,
  height,
  placeholder = 'Start writing here...',
  id,
  toolbarProps = {},
}: TipTapTextEditorProps) => {
  // extract color
  const { color: sxColor, ...restSx } = sx || {};

  return (
    <Box
      sx={{
        '& .tiptap': {
          outline: 'none',
          minHeight: height ?? 160,
          px: { xs: 2, sm: 3 },
          py: 2,
          fontSize: 16,
          lineHeight: 1.7,
          overflowWrap: 'anywhere',
          '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: -2 },
          '& img, & iframe': { maxWidth: '100%' },
          '& p, & h1, & h2, & h3, & h4, & h5, & h6': { marginBlockStart: 0, marginBlockEnd: 0 },
          '& p + p, & p + ul, & p + ol, & p + blockquote': { mt: 1 },
          '& h1, & h2, & h3': { lineHeight: 1.25, mt: 1.5, mb: 0.5 },
          '& ul, & ol': { pl: 2.5, my: 1 },
          '& blockquote': {
            borderLeft: '3px solid',
            borderColor: 'primary.main',
            pl: 1.5,
            my: 1,
            color: 'text.secondary',
          },
          '& p.is-empty:first-of-type::before': {
            color: 'text.disabled',
            content: 'attr(data-placeholder)',
            float: 'left',
            height: 0,
            pointerEvents: 'none',
          },
        },
        border: '1px solid',
        borderColor: 'grey.400',
        borderRadius: 2,
        overflow: 'hidden',
        maxWidth: '100%',
        transition: 'border-color 150ms ease',
        '&:focus-within': { borderColor: 'grey.600' },
        ...restSx,
      }}
    >
      <ClientSideOnly>
        <EditorProvider
          key={id}
          content={value}
          onUpdate={({ editor }) => {
            onChange(editor?.getHTML() as string);
          }}
          extensions={[
            StarterKit,
            Indentation,
            Underline,
            TextAlign.configure({
              alignments: ['left', 'right', 'center', 'justify'],
              types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
              placeholder,
              showOnlyCurrent: false,
              emptyEditorClass: 'is-empty',
            }),
            TextStyle,
            Color.configure({
              types: ['textStyle'],
            }),
            FontFamily.configure({
              types: ['textStyle'],
            }),
            // FontSize,
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
          slotBefore={
            <EditorToolbarVertical toolsHidden={['chatbot', 'transcribe']} {...toolbarProps} disabled={disabled} />
          }
        >
          <TipTapTextEditorWrapper disabled={disabled} value={value}>
            <SelectionToolbar disabled={disabled} toolsHidden={toolbarProps.toolsHidden} />
          </TipTapTextEditorWrapper>
        </EditorProvider>
      </ClientSideOnly>
    </Box>
  );
};

export default TipTapTextEditor;
