'use client';

import { useContext } from 'react';

import { EditorToolbarContext } from '../EditorToolbar/EditorToolbarProvider';

export const useEditorToolbar = () => useContext(EditorToolbarContext);
