import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Welcome to Your Engineering Career GPS
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" paragraph>
          Your step-by-step guide to navigating the path to becoming a successful engineer
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Why Engineering?
          </Typography>
          <Typography paragraph>
            Engineering is more than just a career—it's an opportunity to solve real-world problems,
            innovate, and make a lasting impact on society. Whether you're just starting your journey
            or looking to advance your career, we're here to guide you every step of the way.
          </Typography>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Paper elevation={2} sx={{ p: 2, flex: 1, minWidth: '250px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Education Path</Typography>
              </Box>
              <Typography>
                From choosing the right courses to gaining essential skills and certifications.
              </Typography>
            </Paper>

            <Paper elevation={2} sx={{ p: 2, flex: 1, minWidth: '250px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WorkIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Career Development</Typography>
              </Box>
              <Typography>
                Internships, entry-level positions, and advancing to senior roles.
              </Typography>
            </Paper>

            <Paper elevation={2} sx={{ p: 2, flex: 1, minWidth: '250px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Growth Opportunities</Typography>
              </Box>
              <Typography>
                Continuous learning, specialization paths, and leadership roles.
              </Typography>
            </Paper>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/roadmap')}
              sx={{ mr: 2 }}
            >
              View Career Roadmap
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/resources')}
            >
              Explore Resources
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Home; 