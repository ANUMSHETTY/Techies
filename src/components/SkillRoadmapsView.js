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
  ListItemIcon,
  Divider,
  Chip,
  Grid,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import WebIcon from '@mui/icons-material/Web';
import DataArrayIcon from '@mui/icons-material/DataArray';

const roadmaps = {
  python: {
    title: 'Python Development Path',
    icon: CodeIcon,
    levels: [
      {
        level: 'Fundamentals',
        topics: [
          'Variables, Data Types, and Operators',
          'Control Flow (if/else, loops)',
          'Functions and Modules',
          'Basic Input/Output',
          'Exception Handling',
          'File Operations',
        ],
        projects: ['Calculator', 'To-Do List', 'File Processor']
      },
      {
        level: 'Intermediate',
        topics: [
          'Object-Oriented Programming',
          'List Comprehensions',
          'Lambda Functions',
          'Decorators and Generators',
          'Virtual Environments',
          'Package Management (pip)',
        ],
        projects: ['Library Management System', 'Student Database', 'Web Scraper']
      },
      {
        level: 'Advanced',
        topics: [
          'Multithreading and Multiprocessing',
          'Network Programming',
          'Database Integration (SQLAlchemy)',
          'Web Frameworks (Django/Flask)',
          'Testing (unittest, pytest)',
          'Design Patterns',
        ],
        projects: ['REST API', 'Real-time Chat Application', 'Data Analysis Tool']
      }
    ]
  },
  java: {
    title: 'Java Development Path',
    icon: CodeIcon,
    levels: [
      {
        level: 'Fundamentals',
        topics: [
          'JDK Setup and Basic Syntax',
          'OOP Concepts',
          'Data Types and Variables',
          'Control Statements',
          'Arrays and Collections',
          'Exception Handling',
        ],
        projects: ['Banking System', 'Student Management', 'Simple Game']
      },
      {
        level: 'Intermediate',
        topics: [
          'Inheritance and Polymorphism',
          'Interfaces and Abstract Classes',
          'Generics',
          'File I/O and Serialization',
          'Multi-threading',
          'JDBC',
        ],
        projects: ['Inventory System', 'Multi-threaded Download Manager', 'Database CRUD App']
      },
      {
        level: 'Advanced',
        topics: [
          'Spring Framework',
          'Hibernate ORM',
          'Design Patterns',
          'Microservices',
          'Unit Testing (JUnit)',
          'Build Tools (Maven/Gradle)',
        ],
        projects: ['E-commerce Platform', 'REST API Service', 'Microservices Application']
      }
    ]
  },
  cpp: {
    title: 'C++ Development Path',
    icon: CodeIcon,
    levels: [
      {
        level: 'Fundamentals',
        topics: [
          'Basic Syntax and Data Types',
          'Control Structures',
          'Functions and Arrays',
          'Pointers and References',
          'Classes and Objects',
          'Basic I/O',
        ],
        projects: ['Number Games', 'Student Record System', 'Basic Calculator']
      },
      {
        level: 'Intermediate',
        topics: [
          'Templates',
          'STL Containers',
          'Operator Overloading',
          'Memory Management',
          'File Handling',
          'Exception Handling',
        ],
        projects: ['Library System', 'Custom String Class', 'Memory Pool Implementation']
      },
      {
        level: 'Advanced',
        topics: [
          'Move Semantics',
          'Smart Pointers',
          'Multithreading',
          'Design Patterns',
          'Network Programming',
          'Template Metaprogramming',
        ],
        projects: ['Game Engine', 'Thread Pool', 'Network Server']
      }
    ]
  },
  sql: {
    title: 'SQL & Database Path',
    icon: StorageIcon,
    levels: [
      {
        level: 'Fundamentals',
        topics: [
          'Basic SQL Queries',
          'Data Types',
          'CREATE, INSERT, UPDATE, DELETE',
          'WHERE Clause and Operators',
          'JOIN Operations',
          'GROUP BY and HAVING',
        ],
        projects: ['Student Database', 'Product Inventory', 'Employee Management']
      },
      {
        level: 'Intermediate',
        topics: [
          'Subqueries',
          'Views and Indexes',
          'Stored Procedures',
          'Triggers',
          'Transactions',
          'Database Design',
        ],
        projects: ['E-commerce Database', 'Banking System', 'School Management System']
      },
      {
        level: 'Advanced',
        topics: [
          'Performance Optimization',
          'Database Security',
          'Backup and Recovery',
          'Replication',
          'NoSQL Integration',
          'Big Data Concepts',
        ],
        projects: ['Data Warehouse', 'Sharding Implementation', 'Analytics Platform']
      }
    ]
  },
  dataStructures: {
    title: 'Data Structures & Algorithms',
    icon: DataArrayIcon,
    levels: [
      {
        level: 'Fundamentals',
        topics: [
          'Arrays and Strings',
          'Linked Lists',
          'Stacks and Queues',
          'Basic Recursion',
          'Time Complexity',
          'Basic Sorting',
        ],
        projects: ['Array Operations', 'Linked List Implementation', 'Stack Applications']
      },
      {
        level: 'Intermediate',
        topics: [
          'Trees and BST',
          'Hash Tables',
          'Heaps',
          'Graphs Basics',
          'Dynamic Programming Intro',
          'Advanced Sorting',
        ],
        projects: ['BST Implementation', 'Hash Table Implementation', 'Graph Algorithms']
      },
      {
        level: 'Advanced',
        topics: [
          'Advanced Graph Algorithms',
          'Advanced Dynamic Programming',
          'Trie and Segment Trees',
          'Red-Black Trees',
          'Network Flow',
          'String Algorithms',
        ],
        projects: ['Path Finding Visualizer', 'Advanced Data Structure Library', 'Algorithm Visualizer']
      }
    ]
  },
  webdev: {
    title: 'Web Development Path',
    icon: WebIcon,
    levels: [
      {
        level: 'Frontend Fundamentals',
        topics: [
          'HTML5 Semantics',
          'CSS3 & Flexbox/Grid',
          'JavaScript Basics',
          'DOM Manipulation',
          'Responsive Design',
          'Version Control (Git)',
        ],
        projects: ['Personal Portfolio', 'Landing Page', 'Interactive Form']
      },
      {
        level: 'Frontend Advanced',
        topics: [
          'React/Angular/Vue',
          'State Management',
          'TypeScript',
          'Testing (Jest)',
          'Build Tools',
          'CSS Frameworks',
        ],
        projects: ['E-commerce Frontend', 'Social Media App', 'Dashboard']
      },
      {
        level: 'Backend Development',
        topics: [
          'Node.js/Express',
          'RESTful APIs',
          'Database Integration',
          'Authentication',
          'Server Deployment',
          'Security Best Practices',
        ],
        projects: ['Full Stack App', 'API Service', 'Real-time Chat']
      },
      {
        level: 'Full Stack Advanced',
        topics: [
          'Microservices',
          'Docker & Kubernetes',
          'CI/CD',
          'Cloud Services',
          'Performance Optimization',
          'Monitoring & Logging',
        ],
        projects: ['Scalable Web App', 'Microservices Architecture', 'Cloud-Native Application']
      }
    ]
  }
};

function SkillRoadmapsView() {
  const [selectedSkill, setSelectedSkill] = useState('python');

  const handleSkillChange = (event, newValue) => {
    setSelectedSkill(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Detailed Skill Roadmaps
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center" paragraph>
          Comprehensive learning paths for different programming skills
        </Typography>

        <Paper elevation={3} sx={{ mt: 4 }}>
          <Tabs
            value={selectedSkill}
            onChange={handleSkillChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {Object.entries(roadmaps).map(([key, value]) => (
              <Tab
                key={key}
                label={value.title}
                value={key}
                icon={<value.icon />}
                iconPosition="start"
              />
            ))}
          </Tabs>

          <Box sx={{ p: 3 }}>
            {roadmaps[selectedSkill].levels.map((level, index) => (
              <Paper
                key={level.level}
                elevation={1}
                sx={{ p: 3, mb: 3, backgroundColor: 'background.default' }}
              >
                <Typography variant="h6" gutterBottom color="primary">
                  {level.level}
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Typography variant="subtitle1" gutterBottom>
                      Topics to Master:
                    </Typography>
                    <List dense>
                      {level.topics.map((topic) => (
                        <ListItem key={topic}>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={topic} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" gutterBottom>
                      Suggested Projects:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {level.projects.map((project) => (
                        <Chip
                          key={project}
                          label={project}
                          variant="outlined"
                          color="primary"
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default SkillRoadmapsView; 