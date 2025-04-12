import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';

const careerSteps = [
  {
    label: 'Foundation (High School)',
    description: `
      • Focus on STEM subjects (Math, Physics, Chemistry)
      • Participate in science fairs and robotics clubs
      • Start learning basic programming
      • Research different engineering fields
    `,
  },
  {
    label: 'University Education',
    description: `
      • Choose engineering specialization
      • Maintain strong GPA
      • Join engineering societies and clubs
      • Seek internship opportunities
      • Work on personal projects
      • Network with professors and peers
    `,
  },
  {
    label: 'Early Career (0-3 years)',
    description: `
      • Secure entry-level position
      • Get professional certification
      • Build technical expertise
      • Develop soft skills
      • Start mentorship relationships
      • Join professional organizations
    `,
  },
  {
    label: 'Mid-Level Engineer (3-7 years)',
    description: `
      • Take on project leadership roles
      • Specialize in specific technologies
      • Mentor junior engineers
      • Expand professional network
      • Consider advanced degrees
      • Develop management skills
    `,
  },
  {
    label: 'Senior Engineer (7+ years)',
    description: `
      • Lead major projects and teams
      • Influence technical decisions
      • Contribute to company strategy
      • Present at conferences
      • Publish technical content
      • Consider management track
    `,
  },
  {
    label: 'Advanced Career Options',
    description: `
      • Technical Architect
      • Engineering Manager
      • Chief Technical Officer
      • Technical Consultant
      • Entrepreneur
      • Industry Expert
    `,
  },
];

function RoadmapView() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Engineering Career Roadmap
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center" paragraph>
          Follow this path to progress from student to senior engineer and beyond
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Stepper orientation="vertical">
            {careerSteps.map((step, index) => (
              <Step key={step.label} active={true}>
                <StepLabel>
                  <Typography variant="h6">{step.label}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography
                    component="pre"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'inherit',
                      mt: 2,
                      mb: 2,
                    }}
                  >
                    {step.description}
                  </Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </Box>
    </Container>
  );
}

export default RoadmapView; 