import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import BrainIcon from '@mui/icons-material/Psychology';
import CalculateIcon from '@mui/icons-material/Calculate';
import StorageIcon from '@mui/icons-material/Storage';
import WebIcon from '@mui/icons-material/Web';
import CloudIcon from '@mui/icons-material/Cloud';
import SecurityIcon from '@mui/icons-material/Security';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: CodeIcon,
    skills: [
      {
        name: 'General Purpose',
        description: 'Python, Java, C++, C#, Go, Ruby, JavaScript/TypeScript',
        importance: 90,
      },
      {
        name: 'Scientific Computing',
        description: 'MATLAB, R, Julia, Fortran',
        importance: 85,
      },
      {
        name: 'Low Level',
        description: 'C, Assembly, Embedded C',
        importance: 80,
      },
      {
        name: 'Domain Specific',
        description: 'SQL, HTML/CSS, Shell scripting (Bash/PowerShell)',
        importance: 85,
      },
    ],
  },
  {
    title: 'Frontend Development',
    icon: WebIcon,
    skills: [
      {
        name: 'Core Technologies',
        description: 'HTML5, CSS3, JavaScript ES6+, TypeScript',
        importance: 90,
      },
      {
        name: 'Frameworks & Libraries',
        description: 'React, Angular, Vue.js, Next.js, Svelte',
        importance: 85,
      },
      {
        name: 'Styling',
        description: 'SASS/SCSS, Tailwind CSS, Material-UI, Bootstrap',
        importance: 80,
      },
      {
        name: 'State Management',
        description: 'Redux, Context API, MobX, Zustand',
        importance: 75,
      },
    ],
  },
  {
    title: 'Backend Development',
    icon: StorageIcon,
    skills: [
      {
        name: 'Server Frameworks',
        description: 'Node.js/Express, Django, Spring Boot, Laravel, ASP.NET Core',
        importance: 90,
      },
      {
        name: 'Databases',
        description: 'PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch',
        importance: 85,
      },
      {
        name: 'API Development',
        description: 'REST, GraphQL, WebSockets, gRPC',
        importance: 85,
      },
      {
        name: 'Authentication & Security',
        description: 'OAuth, JWT, HTTPS, Security best practices',
        importance: 90,
      },
    ],
  },
  {
    title: 'DevOps & Infrastructure',
    icon: CloudIcon,
    skills: [
      {
        name: 'Cloud Platforms',
        description: 'AWS, Azure, Google Cloud, Digital Ocean',
        importance: 85,
      },
      {
        name: 'Containerization',
        description: 'Docker, Kubernetes, Container Orchestration',
        importance: 90,
      },
      {
        name: 'CI/CD',
        description: 'Jenkins, GitHub Actions, GitLab CI, Travis CI',
        importance: 85,
      },
      {
        name: 'Infrastructure as Code',
        description: 'Terraform, Ansible, CloudFormation',
        importance: 80,
      },
    ],
  },
  {
    title: 'Software Engineering Practices',
    icon: IntegrationInstructionsIcon,
    skills: [
      {
        name: 'Version Control',
        description: 'Git, Git workflows, Code review practices',
        importance: 95,
      },
      {
        name: 'Testing',
        description: 'Unit Testing, Integration Testing, E2E Testing, TDD',
        importance: 90,
      },
      {
        name: 'Architecture',
        description: 'Design Patterns, Microservices, System Design',
        importance: 85,
      },
      {
        name: 'Code Quality',
        description: 'Clean Code, SOLID Principles, Code Documentation',
        importance: 90,
      },
    ],
  },
  {
    title: 'CAD & Engineering Tools',
    icon: BuildIcon,
    skills: [
      {
        name: 'CAD Software',
        description: 'AutoCAD, SolidWorks, Fusion 360, CATIA',
        importance: 85,
      },
      {
        name: 'Simulation',
        description: 'ANSYS, COMSOL, Simulink',
        importance: 80,
      },
      {
        name: 'PCB Design',
        description: 'Altium Designer, KiCad, Eagle',
        importance: 75,
      },
      {
        name: 'IoT & Embedded',
        description: 'Arduino, Raspberry Pi, PLC Programming',
        importance: 80,
      },
    ],
  },
  {
    title: 'Mathematical & Scientific',
    icon: CalculateIcon,
    skills: [
      {
        name: 'Advanced Mathematics',
        description: 'Calculus, Linear Algebra, Differential Equations',
        importance: 95,
      },
      {
        name: 'Physics',
        description: 'Mechanics, Thermodynamics, Electronics',
        importance: 90,
      },
      {
        name: 'Statistics',
        description: 'Probability, Data Analysis, Error Analysis',
        importance: 85,
      },
    ],
  },
  {
    title: 'Soft Skills',
    icon: PeopleIcon,
    skills: [
      {
        name: 'Communication',
        description: 'Technical Writing, Presentations, Documentation',
        importance: 90,
      },
      {
        name: 'Team Collaboration',
        description: 'Project Management, Leadership, Conflict Resolution',
        importance: 85,
      },
      {
        name: 'Problem Solving',
        description: 'Critical Thinking, Analytical Skills, Debugging',
        importance: 95,
      },
    ],
  },
  {
    title: 'Professional Development',
    icon: SchoolIcon,
    skills: [
      {
        name: 'Certifications',
        description: 'Professional Engineer (PE), Cloud Certifications (AWS/Azure), Security Certifications',
        importance: 75,
      },
      {
        name: 'Research Skills',
        description: 'Literature Review, Experimental Design, Data Analysis',
        importance: 80,
      },
      {
        name: 'Continuous Learning',
        description: 'Keeping up with industry trends, new technologies, and best practices',
        importance: 90,
      },
    ],
  },
];

function SkillCategory({ category }) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <category.icon color="primary" sx={{ mr: 2 }} />
          <Typography variant="h6">{category.title}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {category.skills.map((skill) => (
            <ListItem key={skill.name}>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                      {skill.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Importance: {skill.importance}%
                    </Typography>
                  </Box>
                }
                secondary={
                  <>
                    <LinearProgress
                      variant="determinate"
                      value={skill.importance}
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {skill.description}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

function SkillsView() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Essential Engineering Skills
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center" paragraph>
          Master these skills to excel in your engineering career
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          {skillCategories.map((category) => (
            <SkillCategory key={category.title} category={category} />
          ))}
        </Paper>
      </Box>
    </Container>
  );
}

export default SkillsView; 