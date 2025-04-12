import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  Slider,
  Button,
  Chip,
  Alert,
  Tooltip as MuiTooltip,
  CircularProgress,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Card sx={{ p: 1, bgcolor: 'background.paper' }}>
        <Typography variant="subtitle2" gutterBottom>
          {label}
        </Typography>
        {payload.map((entry, index) => (
          <Box key={index} sx={{ color: entry.color }}>
            <Typography variant="body2">
              {entry.name}: {entry.value}%
            </Typography>
          </Box>
        ))}
      </Card>
    );
  }
  return null;
};

const SkillLevelGuide = {
  Beginner: { range: [0, 30], color: 'error' },
  Intermediate: { range: [31, 70], color: 'warning' },
  Advanced: { range: [71, 90], color: 'info' },
  Expert: { range: [91, 100], color: 'success' }
};

const getSkillLevel = (value) => {
  return Object.entries(SkillLevelGuide).find(([_, { range }]) => 
    value >= range[0] && value <= range[1]
  )?.[0] || 'Beginner';
};

const SkillComparison = ({ careerPaths }) => {
  const [selectedPaths, setSelectedPaths] = useState([]);
  const [userSkills, setUserSkills] = useState({});
  const [showGapAnalysis, setShowGapAnalysis] = useState(false);
  const [gapAnalysis, setGapAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedSkills, setExpandedSkills] = useState({});

  const handlePathSelect = (event) => {
    try {
      setSelectedPaths(event.target.value);
      setShowGapAnalysis(false);
      setGapAnalysis(null);
      setUserSkills({});
    } catch (error) {
      console.error('Error selecting paths:', error);
    }
  };

  const handleSkillLevelChange = (skill, value) => {
    try {
      setUserSkills(prev => ({
        ...prev,
        [skill]: value
      }));
    } catch (error) {
      console.error('Error updating skill level:', error);
    }
  };

  const toggleSkillExpand = (skill) => {
    setExpandedSkills(prev => ({
      ...prev,
      [skill]: !prev[skill]
    }));
  };

  const getCommonSkills = useMemo(() => {
    if (!selectedPaths.length || !careerPaths) return [];
    
    try {
      // Get all unique skills first
      const allSkills = new Set();
      const skillLevels = new Map(); // Store skill levels by path

      selectedPaths.forEach(pathKey => {
        const path = careerPaths[pathKey];
        if (!path?.levels?.length) return;
        
        path.levels.forEach(level => {
          if (!Array.isArray(level?.requiredSkills)) return;
          
          level.requiredSkills.forEach(skillData => {
            if (!skillData?.name || typeof skillData.level !== 'number') return;
            
            allSkills.add(skillData.name);
            
            // Update skill levels for this path
            const currentMax = skillLevels.get(`${pathKey}-${skillData.name}`) || 0;
            skillLevels.set(`${pathKey}-${skillData.name}`, Math.max(currentMax, skillData.level));
          });
        });
      });

      // Create data points for each skill
      return Array.from(allSkills).map(skill => {
        const dataPoint = { skill };
        
        // Add skill level for each selected path
        selectedPaths.forEach(pathKey => {
          dataPoint[pathKey] = skillLevels.get(`${pathKey}-${skill}`) || 0;
        });

        return dataPoint;
      });
    } catch (error) {
      console.error('Error processing skills data:', error);
      return [];
    }
  }, [selectedPaths, careerPaths]);

  const getAllSkills = useMemo(() => {
    if (!selectedPaths.length || !careerPaths) return [];
    
    try {
      const skillSet = new Set();
      selectedPaths.forEach(pathKey => {
        const path = careerPaths[pathKey];
        if (!path?.levels?.length) return;

        path.levels.forEach(level => {
          if (!Array.isArray(level?.requiredSkills)) return;
          
          level.requiredSkills.forEach(skillData => {
            if (skillData?.name) {
              skillSet.add(skillData.name);
            }
          });
        });
      });
      return Array.from(skillSet);
    } catch (error) {
      console.error('Error getting all skills:', error);
      return [];
    }
  }, [selectedPaths, careerPaths]);

  const analyzeSkillGaps = async () => {
    setLoading(true);
    try {
      const gaps = selectedPaths.map(pathKey => {
        const path = careerPaths[pathKey];
        if (!path?.levels?.length) {
          throw new Error(`Invalid path: ${pathKey}`);
        }

        const requiredSkills = path.levels.reduce((acc, level) => {
          if (!Array.isArray(level?.requiredSkills)) return acc;
          
          level.requiredSkills.forEach(skillData => {
            if (skillData?.name && typeof skillData.level === 'number') {
              if (!acc[skillData.name] || acc[skillData.name] < skillData.level) {
                acc[skillData.name] = skillData.level;
              }
            }
          });
          return acc;
        }, {});

        const skillGaps = Object.entries(requiredSkills).map(([skill, required]) => ({
          skill,
          required,
          current: userSkills[skill] || 0,
          gap: Math.max(0, required - (userSkills[skill] || 0))
        })).filter(gap => gap.gap > 0);

        const totalPossibleGap = Object.values(requiredSkills).reduce((sum, level) => sum + level, 0);
        const totalActualGap = skillGaps.reduce((acc, gap) => acc + gap.gap, 0);
        const readiness = totalPossibleGap > 0 
          ? Math.round(((totalPossibleGap - totalActualGap) / totalPossibleGap) * 100)
          : 0;

        return {
          pathName: path.title || pathKey,
          readiness,
          gaps: skillGaps.sort((a, b) => b.gap - a.gap),
          recommendations: skillGaps.map(gap => ({
            skill: gap.skill,
            gap: gap.gap,
            suggestion: gap.gap > 30 
              ? 'Priority focus needed'
              : gap.gap > 15
              ? 'Improvement recommended'
              : 'Minor refinement needed'
          }))
        };
      });

      setGapAnalysis(gaps);
      setShowGapAnalysis(true);
    } catch (error) {
      console.error('Error analyzing skill gaps:', error);
      setGapAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  const chartData = getCommonSkills;

  if (!careerPaths || Object.keys(careerPaths).length === 0) {
    return (
      <Paper sx={{ p: 3, my: 2 }}>
        <Alert severity="error">
          No career paths data available. Please check the data source.
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Typography variant="h5" gutterBottom>
        Career Path Skill Comparison
      </Typography>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Compare Career Paths</InputLabel>
        <Select
          multiple
          value={selectedPaths}
          onChange={handlePathSelect}
          renderValue={(selected) => selected.map(key => careerPaths[key]?.title || key).join(', ')}
        >
          {Object.entries(careerPaths).map(([key, path]) => (
            <MenuItem key={key} value={key}>
              {path.title || key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedPaths.length > 0 && (
        <>
          <Box sx={{ height: 400, mb: 4 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={150} data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                {selectedPaths.map((path, index) => (
                  <Radar
                    key={path}
                    name={careerPaths[path]?.title || path}
                    dataKey={path}
                    stroke={`hsl(${(index * 360) / selectedPaths.length}, 70%, 50%)`}
                    fill={`hsl(${(index * 360) / selectedPaths.length}, 70%, 50%)`}
                    fillOpacity={0.3}
                  />
                ))}
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            Assess Your Skills
            <MuiTooltip title="Rate your proficiency in each skill from 0 to 100">
              <IconButton size="small" sx={{ ml: 1 }}>
                <InfoIcon fontSize="small" />
              </IconButton>
            </MuiTooltip>
          </Typography>

          <Grid container spacing={3}>
            {getAllSkills.map(skill => (
              <Grid item xs={12} sm={6} md={4} key={skill}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle2">
                        {skill}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => toggleSkillExpand(skill)}
                        sx={{
                          transform: expandedSkills[skill] ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s'
                        }}
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </Box>
                    <Slider
                      value={userSkills[skill] || 0}
                      onChange={(_, value) => handleSkillLevelChange(skill, value)}
                      step={10}
                      marks
                      min={0}
                      max={100}
                      valueLabelDisplay="auto"
                    />
                    <Chip
                      size="small"
                      label={getSkillLevel(userSkills[skill] || 0)}
                      color={SkillLevelGuide[getSkillLevel(userSkills[skill] || 0)].color}
                      sx={{ mt: 1 }}
                    />
                    <Collapse in={expandedSkills[skill]}>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Required by:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                          {selectedPaths.map(pathKey => {
                            const level = chartData.find(d => d.skill === skill)?.[pathKey];
                            if (!level) return null;
                            return (
                              <Chip
                                key={pathKey}
                                size="small"
                                label={`${careerPaths[pathKey]?.title || pathKey}: ${level}%`}
                                variant="outlined"
                              />
                            );
                          })}
                        </Box>
                      </Box>
                    </Collapse>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3, mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={analyzeSkillGaps}
              fullWidth
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <TrendingUpIcon />}
            >
              {loading ? 'Analyzing...' : 'Analyze Skill Gaps'}
            </Button>
          </Box>

          {showGapAnalysis && gapAnalysis && (
            <Box sx={{ mt: 3 }}>
              {gapAnalysis.map((analysis, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {analysis.pathName}
                    </Typography>
                    <Alert severity={analysis.readiness > 70 ? "success" : analysis.readiness > 40 ? "warning" : "error"}>
                      <Typography variant="subtitle2">
                        Career Path Readiness: {analysis.readiness}%
                      </Typography>
                      <Typography variant="body2">
                        {analysis.readiness > 70 
                          ? 'You\'re well-prepared for this career path!'
                          : analysis.readiness > 40
                          ? 'You\'re making good progress, but there\'s room for improvement.'
                          : 'Significant skill development needed for this path.'}
                      </Typography>
                    </Alert>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Skills to Improve:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {analysis.recommendations.map((rec, i) => (
                          <MuiTooltip key={i} title={rec.suggestion}>
                            <Chip
                              label={`${rec.skill} (Gap: ${rec.gap}%)`}
                              color={rec.gap > 30 ? "error" : "warning"}
                              variant="outlined"
                            />
                          </MuiTooltip>
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </>
      )}
    </Paper>
  );
};

export default SkillComparison; 