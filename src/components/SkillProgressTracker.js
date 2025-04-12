import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
} from '@mui/lab';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  WorkOutline as WorkIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

// Industry trends and insights
const industryInsights = {
  frontend: {
    emergingTechnologies: ['Web Assembly', 'Next.js', 'Svelte', 'WebGPU'],
    keySkillTrends: ['Micro-frontends', 'Edge Computing', 'Progressive Web Apps'],
    certifications: ['AWS Frontend Developer', 'Google Mobile Web Specialist'],
  },
  backend: {
    emergingTechnologies: ['Rust', 'GraphQL', 'Serverless', 'Edge Functions'],
    keySkillTrends: ['Event-driven Architecture', 'Microservices', 'API-first Design'],
    certifications: ['AWS Solutions Architect', 'Google Cloud Developer'],
  },
  dataScience: {
    emergingTechnologies: ['AutoML', 'MLOps', 'Feature Stores', 'Vector Databases'],
    keySkillTrends: ['Real-time Analytics', 'Automated Decision Making', 'Edge AI'],
    certifications: ['TensorFlow Developer', 'AWS Machine Learning Specialty'],
  },
  aiMl: {
    emergingTechnologies: ['Large Language Models', 'Neural Architecture Search', 'Federated Learning'],
    keySkillTrends: ['Responsible AI', 'Model Optimization', 'AI Governance'],
    certifications: ['Deep Learning Specialization', 'Azure AI Engineer'],
  },
  devops: {
    emergingTechnologies: ['GitOps', 'FinOps', 'Service Mesh', 'Chaos Engineering'],
    keySkillTrends: ['Infrastructure as Code', 'Zero Trust Security', 'Observability'],
    certifications: ['CKA', 'AWS DevOps Engineer'],
  },
};

const SkillProgressTracker = ({ careerPaths }) => {
  const [selectedPath, setSelectedPath] = useState('');
  const [skillProgress, setSkillProgress] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [learningEntries, setLearningEntries] = useState([]);
  const [showInsights, setShowInsights] = useState(false);

  const handlePathChange = (event) => {
    setSelectedPath(event.target.value);
    setShowInsights(true);
  };

  const handleAddProgress = (skill) => {
    setCurrentSkill(skill);
    setOpenDialog(true);
  };

  const handleSaveProgress = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const date = new Date().toISOString();
    const entry = {
      skill: currentSkill,
      progress: parseInt(formData.get('progress')),
      notes: formData.get('notes'),
      date,
      type: formData.get('type'),
    };

    setLearningEntries(prev => [...prev, entry]);
    setSkillProgress(prev => ({
      ...prev,
      [currentSkill]: Math.min(100, (prev[currentSkill] || 0) + parseInt(formData.get('progress')))
    }));
    setOpenDialog(false);
  };

  const getSkillLevel = (skill) => {
    return skillProgress[skill] || 0;
  };

  const renderProgressDialog = () => (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <form onSubmit={handleSaveProgress}>
        <DialogTitle>Update Progress: {currentSkill}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Activity Type</InputLabel>
                <Select name="type" defaultValue="practice">
                  <MenuItem value="practice">Practice Project</MenuItem>
                  <MenuItem value="course">Course Completion</MenuItem>
                  <MenuItem value="certification">Certification</MenuItem>
                  <MenuItem value="work">Work Experience</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Progress Increment (%)"
                name="progress"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 100 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                name="notes"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button type="submit" variant="contained">Save Progress</Button>
        </DialogActions>
      </form>
    </Dialog>
  );

  const renderTimeline = () => (
    <Timeline>
      {learningEntries.map((entry, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot color={
              entry.type === 'certification' ? 'success' :
              entry.type === 'course' ? 'primary' :
              entry.type === 'work' ? 'warning' : 'info'
            }>
              {entry.type === 'certification' && <StarIcon />}
              {entry.type === 'course' && <SchoolIcon />}
              {entry.type === 'work' && <WorkIcon />}
              {entry.type === 'practice' && <TrendingUpIcon />}
            </TimelineDot>
            {index < learningEntries.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="primary">
                  {entry.skill}
                </Typography>
                <Typography variant="body2">
                  Progress: +{entry.progress}%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(entry.date).toLocaleDateString()}
                </Typography>
                {entry.notes && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {entry.notes}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );

  const renderIndustryInsights = () => {
    if (!selectedPath || !industryInsights[selectedPath]) return null;

    const insights = industryInsights[selectedPath];
    return (
      <Card sx={{ mt: 3, bgcolor: 'grey.50' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Industry Insights
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="primary" variant="subtitle2" gutterBottom>
                    Emerging Technologies
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {insights.emergingTechnologies.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="primary" variant="subtitle2" gutterBottom>
                    Key Skill Trends
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {insights.keySkillTrends.map((trend, index) => (
                      <Chip
                        key={index}
                        label={trend}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="primary" variant="subtitle2" gutterBottom>
                    Recommended Certifications
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {insights.certifications.map((cert, index) => (
                      <Chip
                        key={index}
                        label={cert}
                        size="small"
                        color="success"
                        variant="outlined"
                        icon={<StarIcon />}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Typography variant="h5" gutterBottom>
        Skill Progress Tracker
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Career Path</InputLabel>
        <Select value={selectedPath} onChange={handlePathChange}>
          {Object.entries(careerPaths).map(([key, path]) => (
            <MenuItem key={key} value={key}>
              {path.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedPath && (
        <>
          <Grid container spacing={3}>
            {careerPaths[selectedPath].levels.flatMap(level =>
              level.requiredSkills.map(skill => (
                <Grid item xs={12} sm={6} md={4} key={skill.name}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle2">
                          {skill.name}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleAddProgress(skill.name)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={getSkillLevel(skill.name)}
                          />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                          <Typography variant="body2" color="textSecondary">
                            {getSkillLevel(skill.name)}%
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>

          {renderIndustryInsights()}

          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Learning Timeline
          </Typography>
          {renderTimeline()}
        </>
      )}

      {renderProgressDialog()}
    </Paper>
  );
};

export default SkillProgressTracker; 