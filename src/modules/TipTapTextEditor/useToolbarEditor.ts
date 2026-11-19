import { useCurrentEditor, useEditorState } from '@tiptap/react';

/**
 * The current editor, re-rendering the caller on every transaction (selection moves included).
 * Tiptap 3 no longer re-renders context consumers on transactions, so toolbar controls that read
 * `editor.isActive()` / `editor.can()` would show stale pressed and enabled states without this.
 */
export function useToolbarEditor() {
  const { editor } = useCurrentEditor();
  useEditorState({ editor, selector: ({ transactionNumber }) => transactionNumber });
  return { editor };
}
