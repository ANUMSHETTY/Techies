import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
  Button,
  Alert,
  TextField,
  Autocomplete,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Cost of living adjustment factors
const locationFactors = {
  'San Francisco, CA': 1.95,
  'New York, NY': 1.8,
  'Seattle, WA': 1.5,
  'Boston, MA': 1.48,
  'Los Angeles, CA': 1.45,
  'Washington, DC': 1.4,
  'Chicago, IL': 1.25,
  'Austin, TX': 1.2,
  'Denver, CO': 1.18,
  'Portland, OR': 1.15,
  'Atlanta, GA': 1.1,
  'Dallas, TX': 1.08,
  'Phoenix, AZ': 1.05,
  'Remote': 1.0,
};

// Market demand trends (example data)
const marketTrends = {
  dataScience: { growth: 25, demand: 'High', competition: 'Medium' },
  dataAnalyst: { growth: 20, demand: 'High', competition: 'High' },
  aiMl: { growth: 35, demand: 'Very High', competition: 'Medium' },
  frontend: { growth: 15, demand: 'High', competition: 'High' },
  backend: { growth: 18, demand: 'High', competition: 'Medium' },
  devops: { growth: 30, demand: 'Very High', competition: 'Low' },
  cloud: { growth: 28, demand: 'Very High', competition: 'Medium' },
};

const SalaryPredictor = ({ careerPaths = {} }) => {
  const [selectedPath, setSelectedPath] = useState('');
  const [yearsExperience, setYearsExperience] = useState(2);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [location, setLocation] = useState('Remote');
  const [showMarketInsights, setShowMarketInsights] = useState(false);

  const handlePathChange = (event) => {
    setSelectedPath(event.target.value);
    setSelectedSkills([]);
    setPrediction(null);
  };

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const calculateSalary = () => {
    const path = careerPaths[selectedPath];
    if (!path?.levels?.length) return;

    const level = path.levels.find(l => {
      if (!l?.yearsExp) return false;
      const [min, max] = l.yearsExp.split('-').map(y => parseInt(y) || 0);
      return yearsExperience >= min && yearsExperience <= max;
    });

    if (!level?.salaryRange) return;

    const [minSalary, maxSalary] = level.salaryRange
      .replace('$', '')
      .replace(/,/g, '')
      .split(' - ')
      .map(s => parseInt(s) || 0);

    if (!level.requiredSkills?.length) return;

    const skillScore = selectedSkills.length / level.requiredSkills.length;
    const experienceWeight = 0.6;
    const skillsWeight = 0.4;

    const [minExp, maxExp] = level.yearsExp.split('-').map(y => parseInt(y) || 0);
    const experienceScore = (yearsExperience - minExp) / (maxExp - minExp);

    const totalScore = (experienceScore * experienceWeight) + (skillScore * skillsWeight);
    const baseSalary = minSalary + (maxSalary - minSalary) * totalScore;
    
    // Apply location adjustment
    const locationFactor = locationFactors[location] || 1.0;
    const adjustedSalary = baseSalary * locationFactor;

    // Calculate market adjustment
    const marketTrend = marketTrends[selectedPath] || { growth: 15, demand: 'Medium', competition: 'Medium' };
    const marketAdjustment = 1 + (marketTrend.growth / 100);
    const finalSalary = adjustedSalary * marketAdjustment;

    setPrediction({
      salary: Math.round(finalSalary),
      confidence: Math.round(totalScore * 100),
      marketTrend,
      locationAdjustment: Math.round((locationFactor - 1) * 100)
    });
    setShowMarketInsights(true);
  };

  const getAvailableSkills = () => {
    if (!selectedPath || !careerPaths[selectedPath]?.levels) return [];
    
    const skills = new Set();
    careerPaths[selectedPath].levels.forEach(level => {
      if (Array.isArray(level?.requiredSkills)) {
        level.requiredSkills.forEach(skill => {
          if (skill?.name) {
            skills.add(skill.name);
          }
        });
      }
    });
    return Array.from(skills);
  };

  const renderMarketInsights = () => {
    if (!showMarketInsights || !prediction?.marketTrend) return null;

    const trend = prediction.marketTrend;
    return (
      <Card sx={{ mt: 3, bgcolor: 'grey.50' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Market Insights
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="primary" variant="subtitle2">
                    Market Growth
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUpIcon color="success" />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {trend.growth}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={trend.growth} 
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="primary" variant="subtitle2">
                    Demand Level
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {trend.demand}
                  </Typography>
                  <Chip 
                    label={trend.demand === 'Very High' ? 'Hot Job Market' : 'Growing Field'}
                    color="success"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="primary" variant="subtitle2">
                    Competition Level
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {trend.competition}
                  </Typography>
                  <Chip 
                    label={trend.competition === 'Low' ? 'High Opportunity' : 'Competitive'}
                    color={trend.competition === 'Low' ? 'success' : 'warning'}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  if (!careerPaths || typeof careerPaths !== 'object') {
    return (
      <Paper sx={{ p: 3, my: 2 }}>
        <Alert severity="error">
          Career paths data is not available. Please check the data source.
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Typography variant="h5" gutterBottom>
        Advanced Salary Predictor
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Select Career Path</InputLabel>
            <Select value={selectedPath} onChange={handlePathChange}>
              {Object.entries(careerPaths || {}).map(([key, path]) => (
                path?.title ? (
                  <MenuItem key={key} value={key}>
                    {path.title}
                  </MenuItem>
                ) : null
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Autocomplete
            value={location}
            onChange={(_, newValue) => setLocation(newValue || 'Remote')}
            options={Object.keys(locationFactors)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Location"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <LocationOnIcon color="action" sx={{ mr: 1 }} />
                  ),
                }}
              />
            )}
          />
        </Grid>

        {selectedPath && (
          <>
            <Grid item xs={12}>
              <Typography gutterBottom>Years of Experience</Typography>
              <Slider
                value={yearsExperience}
                onChange={(_, value) => setYearsExperience(value)}
                min={0}
                max={10}
                step={0.5}
                marks
                valueLabelDisplay="auto"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography gutterBottom>Select Your Skills</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {getAvailableSkills().map(skill => (
                  <Chip
                    key={skill}
                    label={skill}
                    onClick={() => handleSkillToggle(skill)}
                    color={selectedSkills.includes(skill) ? "primary" : "default"}
                    variant={selectedSkills.includes(skill) ? "filled" : "outlined"}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={calculateSalary}
                disabled={!selectedPath || selectedSkills.length === 0}
                fullWidth
              >
                Calculate Salary Range
              </Button>
            </Grid>
          </>
        )}

        {prediction && (
          <Grid item xs={12}>
            <Alert 
              severity="success"
              sx={{
                '& .MuiAlert-message': {
                  width: '100%'
                }
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Estimated Salary: ${prediction.salary.toLocaleString()}
              </Typography>
              <Box sx={{ width: '100%', mt: 1 }}>
                <Typography variant="body2" gutterBottom>
                  Prediction Confidence: {prediction.confidence}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={prediction.confidence}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              {prediction.locationAdjustment > 0 && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Location Adjustment: +{prediction.locationAdjustment}%
                </Typography>
              )}
            </Alert>
          </Grid>
        )}
      </Grid>

      {renderMarketInsights()}
    </Paper>
  );
};

export default SalaryPredictor; 