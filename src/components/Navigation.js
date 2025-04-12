import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import {
  Work,
  Compare,
  AttachMoney,
  School,
  Timeline,
} from '@mui/icons-material';

function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
          Career GPS
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/career-paths"
            startIcon={<Work />}
          >
            Career Paths
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/skill-comparison"
            startIcon={<Compare />}
          >
            Compare Skills
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/salary-predictor"
            startIcon={<AttachMoney />}
          >
            Salary Predictor
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/learning-path"
            startIcon={<School />}
          >
            Learning Path
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/skill-tracker"
            startIcon={<Timeline />}
          >
            Progress Tracker
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation; 