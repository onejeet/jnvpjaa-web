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
  placeholder?: string;
  toolbarProps?: Partial<EditorToolbarProps>;
  /** Form path of this editor. Inside an AI assistant it adds the Proofread / Upgrade chips and the fill highlight. */
  aiField?: string;
}

export interface EditorToolbarProps extends BoxProps {
  toolsHidden?: string[];
  defaultColors?: string[];
  editor?: Editor | null;
  disabled?: boolean;
}
export interface TipTapTextEditorWrapperProps {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
}
