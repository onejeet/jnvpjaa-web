import React, { createContext } from 'react';
import type { Editor } from '@tiptap/react';

interface EditorToolbarContextProps {
  editor: Editor | null;
}
interface Props {
  children: any;
  editor: Editor | null;
}

const defaultProvider: EditorToolbarContextProps = {
  editor: null,
};

export const EditorToolbarContext = createContext(defaultProvider);

const EditorToolbarProvider: React.FC<Props> = ({ children, editor }) => {
  return (
    <EditorToolbarContext.Provider
      value={{
        editor,
      }}
    >
      {children}
    </EditorToolbarContext.Provider>
  );
};

export default EditorToolbarProvider;
