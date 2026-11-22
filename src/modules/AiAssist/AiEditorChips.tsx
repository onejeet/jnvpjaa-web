'use client';

import React from 'react';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { IconSparkles, IconTextSpellcheck, IconX } from '@tabler/icons-react';
import { useCurrentEditor } from '@tiptap/react';
import { useAiAssistant } from './AiAssistant';
import { wordCount } from './aiText';

const MIN_WORDS = 30;

/**
 * Quiet suggestions at the foot of an editor once there is something to work on.
 * They never open anything by themselves: a click opens the assistant and starts that one job.
 */
export default function AiEditorChips({ field }: { field: string }) {
  const ai = useAiAssistant();
  const { editor } = useCurrentEditor();
  const [state, setState] = React.useState({ words: 0, selection: false });
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    if (!editor) return;
    const read = () => setState({ words: wordCount(editor.getText()), selection: !editor.state.selection.empty });
    read();
    editor.on('update', read);
    editor.on('selectionUpdate', read);
    return () => {
      editor.off('update', read);
      editor.off('selectionUpdate', read);
    };
  }, [editor]);

  if (!ai?.enabled || !editor || hidden || state.words < MIN_WORDS) return null;
  const disabled = ai.busy || ai.outOfUses || !editor.isEditable;
  const part = state.selection ? ' selection' : '';
  // Keep the editor's selection when a chip is pressed.
  const keep = (e: React.MouseEvent) => e.preventDefault();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 0.5,
        px: 1,
        py: 0.5,
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: (t) => alpha(t.palette.primary.main, t.palette.mode === 'dark' ? 0.08 : 0.03),
        '& .MuiButton-root': { textTransform: 'none', fontWeight: 600, borderRadius: 999, px: 1.25 },
      }}
    >
      <Button
        size="small"
        startIcon={<IconTextSpellcheck size={16} stroke={1.75} />}
        onMouseDown={keep}
        onClick={() => ai.runEditor('proofread', editor, field)}
        disabled={disabled}
      >
        {state.selection ? 'Proofread selection' : 'Proofread with AI'}
      </Button>
      {ai.canUpgrade && (
        <Button
          size="small"
          startIcon={<IconSparkles size={16} stroke={1.75} />}
          onMouseDown={keep}
          onClick={() => ai.runEditor('upgrade', editor, field)}
          disabled={disabled}
        >
          {`Upgrade${part} with AI`}
        </Button>
      )}
      <Tooltip title="Hide AI suggestions">
        <IconButton size="small" onClick={() => setHidden(true)} aria-label="Hide AI suggestions" sx={{ ml: 'auto' }}>
          <IconX size={16} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
