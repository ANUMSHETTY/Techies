import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  TextField,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  School,
  WorkOutline,
  Assignment,
  Timeline,
  CheckCircleOutline,
  MenuBook,
  Code,
  YouTube,
  Language,
} from '@mui/icons-material';

// Learning resources by skill category
const learningResources = {
  "HTML5": {
    courses: ["MDN Web Docs HTML Guide", "FreeCodeCamp Responsive Web Design"],
    practice: ["Frontend Mentor Challenges", "CodePen Projects"],
    documentation: "https://developer.mozilla.org/en-US/docs/Web/HTML"
  },
  "CSS3": {
    courses: ["CSS Grid & Flexbox for Responsive Layouts", "Advanced CSS and Sass"],
    practice: ["CSS Battle", "Frontend Mentor Challenges"],
    documentation: "https://developer.mozilla.org/en-US/docs/Web/CSS"
  },
  "JavaScript": {
    courses: ["JavaScript.info", "Eloquent JavaScript Book", "JavaScript30"],
    practice: ["LeetCode", "CodeWars", "JavaScript Algorithms and Data Structures"],
    documentation: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
  },
  "Python": {
    courses: ["Python for Everybody", "Real Python Tutorials"],
    practice: ["HackerRank Python Track", "Python Projects on GitHub"],
    documentation: "https://docs.python.org/3/"
  },
  "Machine Learning": {
    courses: ["Machine Learning by Andrew Ng", "Fast.ai Practical Deep Learning"],
    practice: ["Kaggle Competitions", "ML Projects Portfolio"],
    documentation: "https://scikit-learn.org/stable/"
  },
  "SQL": {
    courses: ["SQL for Data Analysis", "Advanced SQL for Analytics"],
    practice: ["SQLZoo", "HackerRank SQL Challenges"],
    documentation: "https://www.postgresql.org/docs/"
  },
  "Cloud Platforms": {
    courses: ["AWS Cloud Practitioner", "Azure Fundamentals"],
    practice: ["Cloud Labs", "Infrastructure Projects"],
    documentation: "https://aws.amazon.com/training/"
  }
};

const getResourcesForSkill = (skillName) => {
  // Find the most relevant resource category based on the skill name
  const category = Object.keys(learningResources).find(cat => 
    skillName.toLowerCase().includes(cat.toLowerCase())
  ) || Object.keys(learningResources)[0];

  return learningResources[category];
};

const LearningPathGenerator = ({ careerPaths }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [targetPath, setTargetPath] = useState('');
  const [targetLevel, setTargetLevel] = useState('');
  const [currentSkills, setCurrentSkills] = useState([]);
  const [timeframe, setTimeframe] = useState('');
  const [generatedPath, setGeneratedPath] = useState(null);

  const handleNext = () => {
    if (activeStep === 3) {
      generateLearningPath();
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSkillToggle = (skill) => {
    setCurrentSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const generateLearningPath = () => {
    if (!targetPath || !targetLevel || !timeframe) return;

    const path = careerPaths[targetPath];
    const level = path.levels.find(l => l.title === targetLevel);
    
    if (!level) return;

    // Filter out skills the user already has and sort by importance (level)
    const missingSkills = level.requiredSkills
      .filter(skill => !currentSkills.includes(skill.name))
      .sort((a, b) => b.level - a.level);

    const timeInMonths = parseInt(timeframe);
    const skillsPerMonth = Math.ceil(missingSkills.length / timeInMonths);

    // Create learning milestones
    const milestones = [];
    for (let month = 1; month <= timeInMonths; month++) {
      const monthSkills = missingSkills.slice(
        (month - 1) * skillsPerMonth,
        month * skillsPerMonth
      );

      const monthMilestone = {
        month,
        skills: monthSkills.map(skill => ({
          ...skill,
          resources: getResourcesForSkill(skill.name),
          estimatedHours: Math.round((skill.level / 100) * 40), // Estimate hours based on skill level
          progress: 0
        })),
        projects: [
          {
            title: `${path.title} Project ${month}`,
            description: `Apply ${monthSkills.map(s => s.name).join(", ")} in a real-world project`,
            difficulty: month === timeInMonths ? "Advanced" : month === 1 ? "Beginner" : "Intermediate"
          }
        ]
      };

      milestones.push(monthMilestone);
    }

    const learningPath = {
      overview: {
        pathName: path.title,
        targetRole: level.title,
        duration: timeframe,
        totalSkills: missingSkills.length,
        estimatedHoursPerWeek: Math.ceil(
          missingSkills.reduce((sum, skill) => sum + (skill.level / 100) * 40, 0) / (timeInMonths * 4)
        )
      },
      milestones
    };

    setGeneratedPath(learningPath);
  };

  const renderPathContent = () => {
    if (!generatedPath) return null;

    return (
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Learning Path Overview
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Timeline />
                </ListItemIcon>
                <ListItemText
                  primary="Target Career"
                  secondary={`${generatedPath.overview.pathName} - ${generatedPath.overview.targetRole}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Assignment />
                </ListItemIcon>
                <ListItemText
                  primary="Skills to Acquire"
                  secondary={`${generatedPath.overview.totalSkills} skills`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WorkOutline />
                </ListItemIcon>
                <ListItemText
                  primary="Estimated Time Commitment"
                  secondary={`${generatedPath.overview.estimatedHoursPerWeek} hours per week for ${generatedPath.overview.duration} months`}
                />
              </ListItem>
            </List>

            <Alert severity="info" sx={{ my: 2 }}>
              This learning path is customized based on your current skills and time frame. 
              Adjust your learning pace as needed while maintaining consistent progress.
            </Alert>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Monthly Milestones
            </Typography>
            
            {generatedPath.milestones.map((milestone, index) => (
              <Card key={index} sx={{ mb: 2, bgcolor: 'grey.50' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Month {milestone.month}
                  </Typography>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Skills to Focus On:
                  </Typography>
                  {milestone.skills.map(skill => (
                    <Card key={skill.name} variant="outlined" sx={{ mb: 2, p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <School color="primary" sx={{ mr: 1 }} />
                        <Typography variant="subtitle1">
                          {skill.name}
                        </Typography>
                        <Chip 
                          size="small" 
                          label={`${skill.estimatedHours} hours`}
                          sx={{ ml: 'auto' }}
                        />
                      </Box>
                      
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="body2" color="textSecondary">
                          Proficiency Target
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={skill.level} 
                          sx={{ mt: 1, mb: 2 }}
                        />
                      </Box>

                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        Learning Resources:
                      </Typography>
                      {skill.resources && (
                        <List dense>
                          {skill.resources.courses && (
                            <ListItem>
                              <ListItemIcon>
                                <MenuBook fontSize="small" />
                              </ListItemIcon>
                              <ListItemText 
                                primary="Recommended Courses"
                                secondary={skill.resources.courses.join(", ")}
                              />
                            </ListItem>
                          )}
                          {skill.resources.practice && (
                            <ListItem>
                              <ListItemIcon>
                                <Code fontSize="small" />
                              </ListItemIcon>
                              <ListItemText 
                                primary="Practice Resources"
                                secondary={skill.resources.practice.join(", ")}
                              />
                            </ListItem>
                          )}
                          {skill.resources.documentation && (
                            <ListItem>
                              <ListItemIcon>
                                <Language fontSize="small" />
                              </ListItemIcon>
                              <ListItemText 
                                primary="Documentation"
                                secondary={skill.resources.documentation}
                              />
                            </ListItem>
                          )}
                        </List>
                      )}
                    </Card>
                  ))}

                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Recommended Projects:
                  </Typography>
                  {milestone.projects.map((project, i) => (
                    <Card key={i} variant="outlined" sx={{ p: 2, mb: 1 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        {project.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {project.description}
                      </Typography>
                      <Chip 
                        size="small" 
                        label={project.difficulty}
                        color={
                          project.difficulty === "Advanced" ? "error" :
                          project.difficulty === "Intermediate" ? "warning" : "success"
                        }
                        sx={{ mt: 1 }}
                      />
                    </Card>
                  ))}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </Box>
    );
  };

  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Typography variant="h5" gutterBottom>
        Personalized Learning Path Generator
      </Typography>

      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Select Target Career Path</StepLabel>
          <StepContent>
            <FormControl fullWidth>
              <InputLabel>Career Path</InputLabel>
              <Select
                value={targetPath}
                onChange={(e) => setTargetPath(e.target.value)}
              >
                {Object.entries(careerPaths).map(([key, path]) => (
                  <MenuItem key={key} value={key}>
                    {path.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ mb: 2, mt: 1 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!targetPath}
                sx={{ mt: 1, mr: 1 }}
              >
                Continue
              </Button>
            </Box>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Select Target Level</StepLabel>
          <StepContent>
            <FormControl fullWidth>
              <InputLabel>Target Level</InputLabel>
              <Select
                value={targetLevel}
                onChange={(e) => setTargetLevel(e.target.value)}
              >
                {targetPath && careerPaths[targetPath].levels.map((level, index) => (
                  <MenuItem key={index} value={level.title}>
                    {level.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ mb: 2, mt: 1 }}>
              <div>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!targetLevel}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Continue
                </Button>
                <Button
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Select Your Current Skills</StepLabel>
          <StepContent>
            <Typography variant="body2" gutterBottom>
              Select the skills you already possess:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
              {targetPath && targetLevel && careerPaths[targetPath].levels
                .find(l => l.title === targetLevel)
                .requiredSkills.map(skill => (
                  <Chip
                    key={skill.name}
                    label={skill.name}
                    onClick={() => handleSkillToggle(skill.name)}
                    color={currentSkills.includes(skill.name) ? "primary" : "default"}
                    variant={currentSkills.includes(skill.name) ? "filled" : "outlined"}
                  />
                ))}
            </Box>
            <Box sx={{ mb: 2 }}>
              <div>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Continue
                </Button>
                <Button
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Set Your Learning Timeframe</StepLabel>
          <StepContent>
            <TextField
              fullWidth
              label="Learning Duration (months)"
              type="number"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              inputProps={{ min: "1", max: "24" }}
              helperText="Enter the number of months you plan to dedicate to this learning path"
            />
            <Box sx={{ mb: 2, mt: 1 }}>
              <div>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!timeframe || timeframe < 1}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Generate Path
                </Button>
                <Button
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>
      </Stepper>

      {activeStep === 4 && renderPathContent()}
    </Paper>
  );
};

export default LearningPathGenerator; 