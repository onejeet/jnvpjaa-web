import { Divider, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Fragment } from 'react';

import Breadcrumbs from '@/components/common/Breadcrumbs';
import ProfileCard from '@/components/common/ProfileCard';
import PageRichText from '@/modules/ContentPages/PageRichText';
import type { PeopleListFields } from '@/modules/ContentPages/contentPages.schema';
import { t } from '@/config/tenant';

const GROUP_COLORS: Record<string, string> = { platinum: '#CF7878', gold: '#DAA511', silver: '#BCB198' };

const BhamashahPillars = ({ fields }: { fields: PeopleListFields }) => (
  <Box>
    <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: t('pages.honourRoll') }]} />
    <Box component={Paper} p={2} my={2}>
      <Typography variant="h1" mb={3}>
        {fields.heading}
      </Typography>
      {fields.intro && <PageRichText html={fields.intro} mt={2} />}
      {fields.groups
        .filter((group) => group.visible)
        .map((group, index) => {
          const people = fields.people.filter((person) => person.group === group.key);
          return (
            <Fragment key={group.key}>
              {index > 0 && <Divider sx={{ my: 4 }} />}
              <Typography color="grey.800" variant="h2" mt={index ? 0 : 4} mb={2}>
                {group.label}
              </Typography>
              {people.length ? (
                <Grid container spacing={2}>
                  {people.map((person, i) => (
                    <Grid key={`${group.key}-${i}`} size={{ xs: 12, sm: 4, md: 3 }}>
                      <ProfileCard
                        name={person.name}
                        batch={person.batch ? String(person.batch) : ''}
                        profilePicture={person.photo?.url}
                        designation={group.key}
                        color={GROUP_COLORS[group.key]}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                group.emptyText && <Typography color="grey.500">{group.emptyText}</Typography>
              )}
            </Fragment>
          );
        })}
    </Box>
  </Box>
);

export default BhamashahPillars;
