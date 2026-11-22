'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import TipTapTextEditor from '@/modules/TipTapTextEditor';
import { AiAssistantProvider, type AiFormConfig } from './AiAssistant';
import { AiAssistantPanel, AiWriteLink } from './AiAssistantCard';

/**
 * The About Me editor with its AI assistant. Nothing from the profile is sent to AI:
 * only what the member types into the assistant's box (Google's free tier may use prompts).
 */
export default function AboutMeField({
  value,
  getValue,
  onChange,
  busy,
}: {
  value: string;
  getValue: () => string | undefined;
  onChange: (html: string) => void;
  busy?: boolean;
}) {
  const config: AiFormConfig = {
    surface: 'profile',
    question: 'What would you like fellow alumni to know about you?',
    placeholder:
      'e.g. 2009 batch, Aravali house. Civil engineer in Pune now. Happy to help juniors with GATE prep and referrals.',
    busy,
    fields: [
      {
        key: 'body',
        label: 'About Me',
        kind: 'html',
        name: 'aboutMe',
        get: getValue,
        set: (v) => onChange(typeof v === 'string' ? v : ''),
      },
    ],
  };
  return (
    <AiAssistantProvider config={config}>
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} mb={0.5}>
        <Typography color="grey.600" variant="body1" fontSize={14}>
          About Me
        </Typography>
        <AiWriteLink />
      </Box>
      <TipTapTextEditor value={value} onChange={onChange} aiField="aboutMe" />
      <AiAssistantPanel />
    </AiAssistantProvider>
  );
}
