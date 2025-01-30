import { Box, Typography, Paper, Grid2 as Grid } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function AboutSection() {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        About Me
      </Typography>
      <Typography paragraph>
        {`Hi, I'm John! I'm a passionate web developer with a love for creating beautiful and functional websites. When
        I'm not coding, you can find me exploring new coffee shops or hiking in the great outdoors.`}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box display="flex" alignItems="center">
            <WorkIcon sx={{ mr: 1 }} />
            <Typography>Web Developer at TechCorp</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box display="flex" alignItems="center">
            <SchoolIcon sx={{ mr: 1 }} />
            <Typography>BS in Computer Science</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box display="flex" alignItems="center">
            <LocationOnIcon sx={{ mr: 1 }} />
            <Typography>San Francisco, CA</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
