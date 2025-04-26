// Import the dynamic version that prevents SSR rendering
import DynamicTipTapEditor from './DynamicTipTapEditor';
import type { TipTapTextEditorProps } from './TipTapTextEditor.types';

// Export the dynamic version as the default
export default DynamicTipTapEditor;
export type { TipTapTextEditorProps };

// Also export the original for cases where it might be needed
export { default as TipTapTextEditorOriginal } from './TipTapTextEditor';
