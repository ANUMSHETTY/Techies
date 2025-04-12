import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Chip,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const careerPaths = {
  frontend: {
    title: 'Frontend Development',
    description: 'Specialize in creating user interfaces and web applications',
    levels: [
      {
        title: 'Junior Frontend Developer',
        yearsExp: '0-2 years',
        salaryRange: '$50,000 - $80,000',
        requiredSkills: [
          { name: 'HTML5', level: 80 },
          { name: 'CSS3', level: 80 },
          { name: 'JavaScript', level: 75 },
          { name: 'React/Angular/Vue', level: 70 },
          { name: 'Git', level: 60 },
          { name: 'Responsive Design', level: 75 }
        ],
        jobTitles: [
          'Junior Frontend Developer',
          'Web Developer',
          'UI Developer'
        ],
        certifications: [
          'freeCodeCamp Frontend Certification',
          'Meta Frontend Developer Certificate',
          'JavaScript Algorithms and Data Structures'
        ]
      },
      {
        title: 'Mid-Level Frontend Developer',
        yearsExp: '2-5 years',
        salaryRange: '$80,000 - $120,000',
        requiredSkills: [
          { name: 'Advanced JavaScript', level: 85 },
          { name: 'TypeScript', level: 80 },
          { name: 'State Management', level: 85 },
          { name: 'Testing (Jest, Cypress)', level: 75 },
          { name: 'Build Tools', level: 70 },
          { name: 'Performance Optimization', level: 75 }
        ],
        jobTitles: [
          'Senior Frontend Developer',
          'Frontend Team Lead',
          'UI/UX Developer'
        ],
        certifications: [
          'AWS Certified Developer',
          'Google Mobile Web Specialist',
          'Professional Scrum Developer'
        ]
      },
      {
        title: 'Senior Frontend Developer',
        yearsExp: '5+ years',
        salaryRange: '$120,000 - $180,000+',
        requiredSkills: [
          { name: 'Architecture Design', level: 90 },
          { name: 'Team Leadership', level: 85 },
          { name: 'Performance Optimization', level: 90 },
          { name: 'Security Best Practices', level: 85 },
          { name: 'CI/CD', level: 80 },
          { name: 'Mentoring', level: 85 }
        ],
        jobTitles: [
          'Lead Frontend Developer',
          'Frontend Architect',
          'Engineering Manager'
        ],
        certifications: [
          'AWS Solutions Architect',
          'Certified Scrum Master',
          'Google Cloud Professional Developer'
        ]
      }
    ]
  },
  backend: {
    title: 'Backend Development',
    description: 'Focus on server-side logic, databases, and application architecture',
    levels: [
      {
        title: 'Junior Backend Developer',
        yearsExp: '0-2 years',
        salaryRange: '$60,000 - $90,000',
        requiredSkills: [
          { name: 'Python/Java/Node.js', level: 75 },
          { name: 'SQL Basics', level: 70 },
          { name: 'RESTful APIs', level: 75 },
          { name: 'Git', level: 65 },
          { name: 'Basic Linux', level: 60 },
          { name: 'Data Structures', level: 70 }
        ],
        jobTitles: [
          'Junior Backend Developer',
          'Software Engineer',
          'API Developer'
        ],
        certifications: [
          'Oracle Certified Associate',
          'AWS Cloud Practitioner',
          'MongoDB Associate Developer'
        ]
      },
      {
        title: 'Mid-Level Backend Developer',
        yearsExp: '2-5 years',
        salaryRange: '$90,000 - $140,000',
        requiredSkills: [
          { name: 'Advanced Backend Language', level: 85 },
          { name: 'Database Design', level: 85 },
          { name: 'System Design', level: 80 },
          { name: 'Microservices', level: 75 },
          { name: 'Docker', level: 75 },
          { name: 'Security', level: 80 }
        ],
        jobTitles: [
          'Senior Backend Developer',
          'DevOps Engineer',
          'System Architect'
        ],
        certifications: [
          'AWS Developer Associate',
          'Oracle Certified Professional',
          'Kubernetes Administrator'
        ]
      },
      {
        title: 'Senior Backend Developer',
        yearsExp: '5+ years',
        salaryRange: '$140,000 - $200,000+',
        requiredSkills: [
          { name: 'System Architecture', level: 90 },
          { name: 'Cloud Platforms', level: 85 },
          { name: 'Scalability', level: 90 },
          { name: 'Team Leadership', level: 85 },
          { name: 'Project Management', level: 80 },
          { name: 'Performance Tuning', level: 85 }
        ],
        jobTitles: [
          'Lead Backend Developer',
          'Technical Architect',
          'Engineering Director'
        ],
        certifications: [
          'AWS Solutions Architect Professional',
          'Google Cloud Architect',
          'Azure Solutions Architect'
        ]
      }
    ]
  },
  fullstack: {
    title: 'Full Stack Development',
    description: 'Master both frontend and backend development',
    levels: [
      {
        title: 'Junior Full Stack Developer',
        yearsExp: '0-2 years',
        salaryRange: '$60,000 - $90,000',
        requiredSkills: [
          { name: 'HTML/CSS/JavaScript', level: 75 },
          { name: 'Backend Language', level: 70 },
          { name: 'Database Basics', level: 70 },
          { name: 'Git', level: 65 },
          { name: 'Basic DevOps', level: 60 },
          { name: 'API Development', level: 70 }
        ],
        jobTitles: [
          'Junior Full Stack Developer',
          'Web Developer',
          'Software Engineer'
        ],
        certifications: [
          'Full Stack Web Developer Certification',
          'AWS Cloud Practitioner',
          'MongoDB Associate'
        ]
      },
      {
        title: 'Mid-Level Full Stack Developer',
        yearsExp: '2-5 years',
        salaryRange: '$90,000 - $150,000',
        requiredSkills: [
          { name: 'Frontend Framework', level: 85 },
          { name: 'Backend Framework', level: 85 },
          { name: 'Database Design', level: 80 },
          { name: 'Cloud Services', level: 75 },
          { name: 'Testing', level: 80 },
          { name: 'CI/CD', level: 75 }
        ],
        jobTitles: [
          'Senior Full Stack Developer',
          'Technical Lead',
          'Product Engineer'
        ],
        certifications: [
          'AWS Developer Associate',
          'Professional Scrum Developer',
          'Google Associate Cloud Engineer'
        ]
      },
      {
        title: 'Senior Full Stack Developer',
        yearsExp: '5+ years',
        salaryRange: '$150,000 - $220,000+',
        requiredSkills: [
          { name: 'System Architecture', level: 90 },
          { name: 'Team Leadership', level: 85 },
          { name: 'DevOps', level: 85 },
          { name: 'Security', level: 85 },
          { name: 'Scalability', level: 90 },
          { name: 'Project Management', level: 85 }
        ],
        jobTitles: [
          'Lead Full Stack Developer',
          'Solution Architect',
          'Engineering Manager'
        ],
        certifications: [
          'AWS Solutions Architect Professional',
          'Google Cloud Professional Architect',
          'Azure Solutions Architect Expert'
        ]
      }
    ]
  },
  devops: {
    title: 'DevOps Engineering',
    description: 'Bridge development and operations with automation and infrastructure expertise',
    levels: [
      {
        title: 'Junior DevOps Engineer',
        yearsExp: '0-2 years',
        salaryRange: '$65,000 - $95,000',
        requiredSkills: [
          { name: 'Linux Administration', level: 75 },
          { name: 'Basic Scripting', level: 70 },
          { name: 'Git', level: 75 },
          { name: 'Docker Basics', level: 70 },
          { name: 'CI/CD Basics', level: 65 },
          { name: 'Cloud Basics', level: 70 }
        ],
        jobTitles: [
          'Junior DevOps Engineer',
          'Cloud Support Engineer',
          'Systems Administrator'
        ],
        certifications: [
          'AWS Cloud Practitioner',
          'Docker Essentials',
          'Linux Foundation System Administrator'
        ]
      },
      {
        title: 'Mid-Level DevOps Engineer',
        yearsExp: '2-5 years',
        salaryRange: '$95,000 - $160,000',
        requiredSkills: [
          { name: 'Infrastructure as Code', level: 85 },
          { name: 'Kubernetes', level: 80 },
          { name: 'Advanced Scripting', level: 85 },
          { name: 'Monitoring', level: 80 },
          { name: 'Security', level: 80 },
          { name: 'Cloud Platforms', level: 85 }
        ],
        jobTitles: [
          'Senior DevOps Engineer',
          'Site Reliability Engineer',
          'Platform Engineer'
        ],
        certifications: [
          'AWS DevOps Engineer Professional',
          'Certified Kubernetes Administrator',
          'Google Cloud DevOps Engineer'
        ]
      },
      {
        title: 'Senior DevOps Engineer',
        yearsExp: '5+ years',
        salaryRange: '$160,000 - $250,000+',
        requiredSkills: [
          { name: 'Architecture Design', level: 90 },
          { name: 'Team Leadership', level: 85 },
          { name: 'Advanced Cloud', level: 90 },
          { name: 'Security Architecture', level: 85 },
          { name: 'Cost Optimization', level: 85 },
          { name: 'Disaster Recovery', level: 90 }
        ],
        jobTitles: [
          'Lead DevOps Engineer',
          'DevOps Architect',
          'Cloud Architecture Manager'
        ],
        certifications: [
          'Multiple Cloud Platform Certifications',
          'CISSP',
          'Project Management Professional'
        ]
      }
    ]
  },
  dataScience: {
    title: 'Data Science',
    description: 'Transform data into actionable insights using statistical analysis and machine learning',
    levels: [
      {
        title: 'Junior Data Scientist',
        yearsExp: '0-2 years',
        salaryRange: '$70,000 - $95,000',
        requiredSkills: [
          { name: 'Python', level: 80 },
          { name: 'SQL', level: 75 },
          { name: 'Statistics', level: 80 },
          { name: 'Pandas/NumPy', level: 75 },
          { name: 'Data Visualization', level: 70 },
          { name: 'Machine Learning Basics', level: 65 }
        ],
        jobTitles: [
          'Junior Data Scientist',
          'Data Science Associate',
          'Analytics Engineer'
        ],
        certifications: [
          'IBM Data Science Professional Certificate',
          'Google Data Analytics Certificate',
          'DataCamp Data Scientist Certification'
        ]
      },
      {
        title: 'Senior Data Scientist',
        yearsExp: '3-6 years',
        salaryRange: '$95,000 - $150,000',
        requiredSkills: [
          { name: 'Advanced ML Algorithms', level: 85 },
          { name: 'Deep Learning', level: 80 },
          { name: 'Big Data Technologies', level: 85 },
          { name: 'Model Deployment', level: 80 },
          { name: 'Research Methods', level: 85 },
          { name: 'Cloud Platforms', level: 75 }
        ],
        jobTitles: [
          'Senior Data Scientist',
          'Lead Data Scientist',
          'ML Engineer'
        ],
        certifications: [
          'AWS Machine Learning Specialty',
          'TensorFlow Developer Certificate',
          'Databricks Certified Associate'
        ]
      }
    ]
  },
  dataAnalyst: {
    title: 'Data Analytics',
    description: 'Analyze complex data sets to support business decision making',
    levels: [
      {
        title: 'Junior Data Analyst',
        yearsExp: '0-2 years',
        salaryRange: '$50,000 - $75,000',
        requiredSkills: [
          { name: 'SQL', level: 80 },
          { name: 'Excel', level: 85 },
          { name: 'Data Visualization', level: 75 },
          { name: 'Python/R Basics', level: 70 },
          { name: 'Statistics', level: 75 },
          { name: 'Business Intelligence', level: 70 }
        ],
        jobTitles: [
          'Junior Data Analyst',
          'Business Intelligence Analyst',
          'Analytics Associate'
        ],
        certifications: [
          'Google Data Analytics Certificate',
          'IBM Data Analyst Professional Certificate',
          'Tableau Desktop Specialist'
        ]
      },
      {
        title: 'Senior Data Analyst',
        yearsExp: '3-6 years',
        salaryRange: '$75,000 - $120,000',
        requiredSkills: [
          { name: 'Advanced SQL', level: 90 },
          { name: 'Python/R', level: 85 },
          { name: 'Advanced Analytics', level: 85 },
          { name: 'Data Modeling', level: 80 },
          { name: 'ETL Processes', level: 80 },
          { name: 'Stakeholder Management', level: 85 }
        ],
        jobTitles: [
          'Senior Data Analyst',
          'Analytics Manager',
          'Business Analytics Lead'
        ],
        certifications: [
          'Advanced Google Analytics',
          'Tableau Desktop Certified Professional',
          'AWS Data Analytics Specialty'
        ]
      }
    ]
  },
  aiMl: {
    title: 'AI/ML Engineering',
    description: 'Develop and deploy artificial intelligence and machine learning solutions',
    levels: [
      {
        title: 'Junior AI/ML Engineer',
        yearsExp: '0-2 years',
        salaryRange: '$80,000 - $110,000',
        requiredSkills: [
          { name: 'Python', level: 85 },
          { name: 'ML Frameworks', level: 75 },
          { name: 'Deep Learning', level: 70 },
          { name: 'Mathematics', level: 80 },
          { name: 'Data Preprocessing', level: 75 },
          { name: 'Model Training', level: 70 }
        ],
        jobTitles: [
          'Junior ML Engineer',
          'AI Developer',
          'ML Research Associate'
        ],
        certifications: [
          'TensorFlow Developer Certificate',
          'AWS Machine Learning Specialty',
          'Azure AI Engineer Associate'
        ]
      },
      {
        title: 'Senior AI/ML Engineer',
        yearsExp: '3-6 years',
        salaryRange: '$110,000 - $180,000',
        requiredSkills: [
          { name: 'Advanced Deep Learning', level: 90 },
          { name: 'MLOps', level: 85 },
          { name: 'Model Architecture', level: 85 },
          { name: 'Distributed Computing', level: 80 },
          { name: 'Research', level: 85 },
          { name: 'Production ML Systems', level: 85 }
        ],
        jobTitles: [
          'Senior ML Engineer',
          'AI Architect',
          'Research Scientist'
        ],
        certifications: [
          'Google Cloud Professional ML Engineer',
          'NVIDIA Deep Learning Institute',
          'Azure AI Engineer Expert'
        ]
      }
    ]
  },
  cloud: {
    title: 'Cloud Engineering',
    description: 'Design and manage cloud infrastructure and services',
    levels: [
      {
        title: 'Junior Cloud Engineer',
        yearsExp: '0-2 years',
        salaryRange: '$65,000 - $95,000',
        requiredSkills: [
          { name: 'Cloud Platforms', level: 75 },
          { name: 'Networking', level: 70 },
          { name: 'Security', level: 70 },
          { name: 'Linux', level: 75 },
          { name: 'IaC Basics', level: 65 },
          { name: 'Containerization', level: 70 }
        ],
        jobTitles: [
          'Junior Cloud Engineer',
          'Cloud Support Engineer',
          'Infrastructure Engineer'
        ],
        certifications: [
          'AWS Solutions Architect Associate',
          'Azure Administrator Associate',
          'Google Cloud Associate Engineer'
        ]
      },
      {
        title: 'Senior Cloud Engineer',
        yearsExp: '3-6 years',
        salaryRange: '$95,000 - $165,000',
        requiredSkills: [
          { name: 'Cloud Architecture', level: 90 },
          { name: 'Multi-cloud', level: 85 },
          { name: 'Cost Optimization', level: 85 },
          { name: 'Security', level: 85 },
          { name: 'Serverless', level: 80 },
          { name: 'Cloud Native', level: 85 }
        ],
        jobTitles: [
          'Senior Cloud Engineer',
          'Cloud Architect',
          'Solutions Architect'
        ],
        certifications: [
          'AWS Solutions Architect Professional',
          'Google Cloud Professional Architect',
          'Azure Solutions Architect Expert'
        ]
      }
    ]
  }
};

function CareerPathsView() {
  const [selectedPath, setSelectedPath] = useState('frontend');

  const handlePathChange = (event, newValue) => {
    setSelectedPath(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Career Paths & Progression
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center" paragraph>
          Explore different career paths and required skills at each level
        </Typography>

        <Paper elevation={3} sx={{ mt: 4 }}>
          <Tabs
            value={selectedPath}
            onChange={handlePathChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {Object.entries(careerPaths).map(([key, value]) => (
              <Tab key={key} label={value.title} value={key} />
            ))}
          </Tabs>

          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {careerPaths[selectedPath].title}
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              {careerPaths[selectedPath].description}
            </Typography>

            {careerPaths[selectedPath].levels.map((level, index) => (
              <Accordion key={level.title} defaultExpanded={index === 0}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box>
                    <Typography variant="h6">{level.title}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      Experience: {level.yearsExp} | Salary Range: {level.salaryRange}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        Required Skills:
                      </Typography>
                      <List dense>
                        {level.requiredSkills.map((skill) => (
                          <ListItem key={skill.name}>
                            <ListItemText
                              primary={skill.name}
                              secondary={
                                <Box sx={{ width: '100%', mt: 1 }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={skill.level}
                                    sx={{ height: 8, borderRadius: 5 }}
                                  />
                                </Box>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        Common Job Titles:
                      </Typography>
                      <Box sx={{ mb: 3 }}>
                        {level.jobTitles.map((title) => (
                          <Chip
                            key={title}
                            label={title}
                            sx={{ m: 0.5 }}
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                      <Typography variant="subtitle1" gutterBottom>
                        Recommended Certifications:
                      </Typography>
                      <Box>
                        {level.certifications.map((cert) => (
                          <Chip
                            key={cert}
                            label={cert}
                            sx={{ m: 0.5 }}
                            color="secondary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default CareerPathsView; 