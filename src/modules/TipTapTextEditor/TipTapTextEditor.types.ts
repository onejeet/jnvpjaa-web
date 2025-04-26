import type React from 'react';
import type { BoxProps } from '@mui/material/Box';
import type { Editor } from '@tiptap/react';
import { SxProps } from '@mui/material';

export interface TipTapTextEditorProps {
  value: string;
  id?: string;
  sx?: any;
  disabled?: boolean;
  onChange: (val: string) => void;
  height?: string | number;
  toolbarProps?: Partial<EditorToolbarProps>;
}

export interface EditorToolbarProps extends BoxProps {
  toolsHidden?: string[];
  defaultColors?: string[];
  editor?: Editor | null;
}
export interface TipTapTextEditorWrapperProps {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
}
