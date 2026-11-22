import type React from 'react';
import type { BoxProps } from '@mui/material/Box';
import type { Editor } from '@tiptap/react';
import { SxProps } from '@mui/material';
import type { AiAssistOptions } from '@/modules/AiAssist/AiAssistBar';

export interface TipTapTextEditorProps {
  value: string;
  id?: string;
  sx?: any;
  disabled?: boolean;
  onChange: (val: string) => void;
  height?: string | number;
  placeholder?: string;
  toolbarProps?: Partial<EditorToolbarProps>;
  /** Shows the AI writing bar above the toolbar. */
  ai?: AiAssistOptions;
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
