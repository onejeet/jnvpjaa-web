import { Typography, type TypographyProps } from '@mui/material';

/** Stored page HTML (sanitised by the API before storage), styled like the hand-written pages it replaced. */
const PageRichText = ({ html, sx, ...props }: { html: string } & Omit<TypographyProps<'div'>, 'children'>) => (
  <Typography
    component="div"
    color="grey.800"
    sx={{
      '& > *': { mt: 2, mb: 0 },
      '& ul': { listStyle: 'none', pl: 0 },
      '& ul > li': { position: 'relative', pl: '30px', mb: 1 },
      '& ul > li::before': {
        content: '""',
        position: 'absolute',
        left: 4,
        top: '0.55em',
        width: 6,
        height: 6,
        p: '2px',
        border: '1.5px solid currentColor',
        borderRadius: '50%',
        bgcolor: 'currentColor',
        backgroundClip: 'content-box',
      },
      '& h2, & h3, & h4': { color: 'grey.800', mt: 3 },
      '& a': { color: 'primary.main' },
      ...sx,
    }}
    dangerouslySetInnerHTML={{ __html: html }}
    {...props}
  />
);

export default PageRichText;
