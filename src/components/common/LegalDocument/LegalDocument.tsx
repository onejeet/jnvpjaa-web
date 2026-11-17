import { Box, Typography } from '@mui/material';
import React from 'react';

export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalDocumentProps {
  title: string;
  lastUpdated: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}

const LegalDocument: React.FC<LegalDocumentProps> = ({ title, lastUpdated, intro, sections }) => (
  <Box
    component="article"
    sx={{
      maxWidth: 820,
      mx: 'auto',
      color: 'grey.800',
      '& p, & li': { typography: 'body1', lineHeight: 1.7 },
      '& p': { mt: 1.5 },
      '& ul': { pl: 3, mt: 1 },
      '& li': { mt: 0.75 },
      '& h3': { typography: 'h4', mt: 3, mb: 0.5, color: 'text.primary' },
      '& a': { color: 'primary.main' },
      '& table': { width: '100%', borderCollapse: 'collapse', mt: 2, fontSize: 14 },
      '& th, & td': { border: '1px solid', borderColor: 'divider', p: 1, textAlign: 'left', verticalAlign: 'top' },
      '& .table-wrap': { overflowX: 'auto' },
    }}
  >
    <Typography variant="h1" textAlign="center">
      {title}
    </Typography>
    <Typography variant="body2" textAlign="center" color="text.secondary" mt={1}>
      Last updated: {lastUpdated}
    </Typography>
    <Box mt={3}>{intro}</Box>

    <Box component="nav" aria-label="Contents" mt={3} p={2} sx={{ bgcolor: 'grey.100', borderRadius: 2 }}>
      <Typography fontWeight={600}>Contents</Typography>
      <Box component="ol" sx={{ pl: 3, mt: 1, columns: { md: 2 } }}>
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`}>{s.title}</a>
          </li>
        ))}
      </Box>
    </Box>

    {sections.map((s, i) => (
      <Box component="section" key={s.id} id={s.id} mt={5} sx={{ scrollMarginTop: 96 }}>
        <Typography variant="h2" color="text.primary">
          {i + 1}. {s.title}
        </Typography>
        {s.content}
      </Box>
    ))}
  </Box>
);

export default LegalDocument;
