import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navigation from './components/Navigation';
import CareerPathsView from './components/CareerPathsView';
import SkillComparison from './components/SkillComparison';
import SalaryPredictor from './components/SalaryPredictor';
import LearningPathGenerator from './components/LearningPathGenerator';
import SkillProgressTracker from './components/SkillProgressTracker';
import { careerPaths } from './data/careerPaths';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Container maxWidth="lg">
          <Box sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={<CareerPathsView careerPaths={careerPaths} />} />
              <Route path="/career-paths" element={<CareerPathsView careerPaths={careerPaths} />} />
              <Route path="/skill-comparison" element={<SkillComparison careerPaths={careerPaths} />} />
              <Route path="/salary-predictor" element={<SalaryPredictor careerPaths={careerPaths} />} />
              <Route path="/learning-path" element={<LearningPathGenerator careerPaths={careerPaths} />} />
              <Route path="/skill-tracker" element={<SkillProgressTracker careerPaths={careerPaths} />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App; 