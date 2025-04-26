// Import the safe version that prevents SSR rendering issues
import SafeTipTapEditor from './SafeTipTapEditor';
import type { TipTapTextEditorProps } from './TipTapTextEditor.types';

// Export the safe version as the default
export default SafeTipTapEditor;
export type { TipTapTextEditorProps };

// Also export the original and other versions for cases where they might be needed
export { default as TipTapTextEditorOriginal } from './TipTapTextEditor';
export { default as DynamicTipTapEditor } from './DynamicTipTapEditor';
