import { EXEC_COMMITTEE } from '@/constants/General.contants';
import { Box, Grid, Typography } from '@mui/material';

import ProfileCard from '@/components/common/ProfileCard';
import { ProfileCardProps } from '@/components/common/ProfileCard/ProfileCard.types';

const Organizations = () => {
  return (
    <Box>
      <Typography variant="h1" textAlign="center">
        The JNVPJAA Executive Commmittee
      </Typography>
      <Typography color="grey.800" mt={2}>
        {`The dedicated individuals who lead and shape our vibrant alumni association. Our committee members bring diverse expertise and a shared passion for fostering
        community and connection among JNVPJAA alumni. Meet the team driving our mission forward and discover the faces
        behind the initiatives that keep our alumni network strong and engaged.`}
      </Typography>
      <Grid container spacing={3} mt={4}>
        {EXEC_COMMITTEE.map((item: ProfileCardProps, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={`-committee-${item.designation}-${index}`}>
            <ProfileCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Organizations;
