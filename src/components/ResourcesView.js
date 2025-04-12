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
  Link,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CodeIcon from '@mui/icons-material/Code';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import WebIcon from '@mui/icons-material/Web';
import BuildIcon from '@mui/icons-material/Build';
import CloudIcon from '@mui/icons-material/Cloud';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

const resources = {
  python: {
    title: 'Python Resources',
    categories: [
      {
        title: 'Online Courses',
        icon: SchoolIcon,
        items: [
          {
            name: 'Python for Everybody (Coursera)',
            url: 'https://www.coursera.org/specializations/python',
            description: 'Comprehensive Python specialization by University of Michigan',
            free: false
          },
          {
            name: 'CS50P (Harvard)',
            url: 'https://cs50.harvard.edu/python/',
            description: 'Harvard\'s introduction to programming with Python',
            free: true
          },
          {
            name: 'Complete Python Bootcamp',
            url: 'https://www.udemy.com/course/complete-python-bootcamp/',
            description: 'Comprehensive Python course on Udemy',
            free: false
          }
        ]
      },
      {
        title: 'Video Tutorials',
        icon: VideoLibraryIcon,
        items: [
          {
            name: 'Corey Schafer Python',
            url: 'https://www.youtube.com/c/Coreyms',
            description: 'In-depth Python tutorials and best practices',
            free: true
          },
          {
            name: 'Tech With Tim',
            url: 'https://www.youtube.com/c/TechWithTim',
            description: 'Python projects and tutorials',
            free: true
          },
          {
            name: 'Sentdex',
            url: 'https://www.youtube.com/c/sentdex',
            description: 'Python for AI, data science, and automation',
            free: true
          }
        ]
      },
      {
        title: 'Documentation & Tutorials',
        icon: MenuBookIcon,
        items: [
          {
            name: 'Python Official Documentation',
            url: 'https://docs.python.org/3/',
            description: 'Official Python language documentation',
            free: true
          },
          {
            name: 'Real Python',
            url: 'https://realpython.com/',
            description: 'In-depth articles and tutorials',
            free: true
          },
          {
            name: 'Python Tutorial (W3Schools)',
            url: 'https://www.w3schools.com/python/',
            description: 'Interactive Python tutorial',
            free: true
          }
        ]
      },
      {
        title: 'Practice Platforms',
        icon: CodeIcon,
        items: [
          {
            name: 'LeetCode',
            url: 'https://leetcode.com/problemset/all/?difficulty=EASY&page=1&tags=python',
            description: 'Python coding challenges and problems',
            free: true
          },
          {
            name: 'HackerRank Python',
            url: 'https://www.hackerrank.com/domains/python',
            description: 'Python practice problems and certifications',
            free: true
          },
          {
            name: 'CodeWars',
            url: 'https://www.codewars.com/?language=python',
            description: 'Practice Python with kata challenges',
            free: true
          }
        ]
      }
    ]
  },
  cpp: {
    title: 'C++ Resources',
    categories: [
      {
        title: 'Online Courses',
        icon: SchoolIcon,
        items: [
          {
            name: 'C++ Programming Course',
            url: 'https://www.edx.org/learn/c-plus-plus',
            description: 'Microsoft\'s C++ fundamentals course',
            free: true
          },
          {
            name: 'C++ Tutorial for Complete Beginners',
            url: 'https://www.udemy.com/course/free-learn-c-tutorial-beginners/',
            description: 'Comprehensive C++ course for beginners',
            free: false
          },
          {
            name: 'Advanced C++ Programming',
            url: 'https://www.coursera.org/specializations/coding-for-everyone',
            description: 'Advanced concepts in C++',
            free: false
          }
        ]
      },
      {
        title: 'Video Tutorials',
        icon: VideoLibraryIcon,
        items: [
          {
            name: 'The Cherno',
            url: 'https://www.youtube.com/playlist?list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb',
            description: 'In-depth C++ programming series',
            free: true
          },
          {
            name: 'C++ Weekly',
            url: 'https://www.youtube.com/c/JasonTurner-lefticus',
            description: 'Weekly C++ tips and tutorials',
            free: true
          },
          {
            name: 'CppCon',
            url: 'https://www.youtube.com/user/CppCon',
            description: 'C++ Conference talks and tutorials',
            free: true
          }
        ]
      },
      {
        title: 'Documentation & Practice',
        icon: MenuBookIcon,
        items: [
          {
            name: 'CPPReference',
            url: 'https://en.cppreference.com/',
            description: 'Comprehensive C++ documentation',
            free: true
          },
          {
            name: 'C++ Core Guidelines',
            url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines',
            description: 'Official C++ best practices',
            free: true
          },
          {
            name: 'Project Ideas',
            url: 'https://github.com/practical-tutorials/project-based-learning#cc',
            description: 'Project-based learning for C++',
            free: true
          }
        ]
      }
    ]
  },
  webdev: {
    title: 'Web Development',
    categories: [
      {
        title: 'Learning Platforms',
        icon: SchoolIcon,
        items: [
          {
            name: 'freeCodeCamp',
            url: 'https://www.freecodecamp.org/',
            description: 'Free web development curriculum',
            free: true
          },
          {
            name: 'The Odin Project',
            url: 'https://www.theodinproject.com/',
            description: 'Full stack curriculum',
            free: true
          },
          {
            name: 'Frontend Masters',
            url: 'https://frontendmasters.com/',
            description: 'Advanced frontend development courses',
            free: false
          }
        ]
      },
      {
        title: 'Video Tutorials',
        icon: VideoLibraryIcon,
        items: [
          {
            name: 'Traversy Media',
            url: 'https://www.youtube.com/c/TraversyMedia',
            description: 'Web development crash courses',
            free: true
          },
          {
            name: 'Net Ninja',
            url: 'https://www.youtube.com/c/TheNetNinja',
            description: 'Modern web development tutorials',
            free: true
          },
          {
            name: 'Web Dev Simplified',
            url: 'https://www.youtube.com/c/WebDevSimplified',
            description: 'Web concepts explained simply',
            free: true
          }
        ]
      },
      {
        title: 'Documentation',
        icon: MenuBookIcon,
        items: [
          {
            name: 'MDN Web Docs',
            url: 'https://developer.mozilla.org/',
            description: 'Comprehensive web development documentation',
            free: true
          },
          {
            name: 'React Documentation',
            url: 'https://react.dev/',
            description: 'Official React documentation',
            free: true
          },
          {
            name: 'Node.js Docs',
            url: 'https://nodejs.org/docs/latest/',
            description: 'Official Node.js documentation',
            free: true
          }
        ]
      }
    ]
  },
  devops: {
    title: 'DevOps & Cloud',
    categories: [
      {
        title: 'Cloud Platforms',
        icon: CloudIcon,
        items: [
          {
            name: 'AWS Training',
            url: 'https://aws.amazon.com/training/',
            description: 'Official AWS training and certification',
            free: false
          },
          {
            name: 'Google Cloud Training',
            url: 'https://cloud.google.com/training',
            description: 'Google Cloud learning resources',
            free: true
          },
          {
            name: 'Azure Learning',
            url: 'https://learn.microsoft.com/en-us/azure/',
            description: 'Microsoft Azure documentation',
            free: true
          }
        ]
      },
      {
        title: 'DevOps Tools',
        icon: BuildIcon,
        items: [
          {
            name: 'Docker Documentation',
            url: 'https://docs.docker.com/',
            description: 'Official Docker guides',
            free: true
          },
          {
            name: 'Kubernetes Learning',
            url: 'https://kubernetes.io/docs/tutorials/',
            description: 'Official Kubernetes tutorials',
            free: true
          },
          {
            name: 'Jenkins Handbook',
            url: 'https://www.jenkins.io/doc/book/',
            description: 'Jenkins automation server docs',
            free: true
          }
        ]
      },
      {
        title: 'DevOps Practices',
        icon: CodeIcon,
        items: [
          {
            name: 'DevOps Roadmap',
            url: 'https://roadmap.sh/devops',
            description: 'Complete DevOps learning path',
            free: true
          },
          {
            name: 'GitLab CI/CD',
            url: 'https://docs.gitlab.com/ee/ci/',
            description: 'GitLab CI/CD documentation',
            free: true
          },
          {
            name: 'Terraform Learning',
            url: 'https://learn.hashicorp.com/terraform',
            description: 'Infrastructure as Code with Terraform',
            free: true
          }
        ]
      }
    ]
  },
  mobile: {
    title: 'Mobile Development',
    categories: [
      {
        title: 'React Native',
        icon: PhoneAndroidIcon,
        items: [
          {
            name: 'React Native Docs',
            url: 'https://reactnative.dev/',
            description: 'Official React Native documentation',
            free: true
          },
          {
            name: 'React Native Course',
            url: 'https://www.udemy.com/course/react-native-the-practical-guide/',
            description: 'Complete React Native development',
            free: false
          },
          {
            name: 'Expo Documentation',
            url: 'https://docs.expo.dev/',
            description: 'Expo framework for React Native',
            free: true
          }
        ]
      },
      {
        title: 'Flutter',
        icon: PhoneAndroidIcon,
        items: [
          {
            name: 'Flutter Documentation',
            url: 'https://flutter.dev/docs',
            description: 'Official Flutter documentation',
            free: true
          },
          {
            name: 'Flutter Course',
            url: 'https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/',
            description: 'Flutter development bootcamp',
            free: false
          },
          {
            name: 'Flutter Cookbook',
            url: 'https://flutter.dev/docs/cookbook',
            description: 'Flutter recipes and patterns',
            free: true
          }
        ]
      }
    ]
  }
};

function ResourcesView() {
  const [selectedCategory, setSelectedCategory] = useState('python');

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Learning Resources
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center" paragraph>
          Curated learning resources for different programming skills
        </Typography>

        <Paper elevation={3} sx={{ mt: 4 }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {Object.entries(resources).map(([key, value]) => (
              <Tab key={key} label={value.title} value={key} />
            ))}
          </Tabs>

          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {resources[selectedCategory].categories.map((category) => (
                <Grid item xs={12} md={4} key={category.title}>
                  <Card elevation={2}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <category.icon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6">{category.title}</Typography>
                      </Box>
                      <List dense>
                        {category.items.map((item) => (
                          <ListItem key={item.name}>
                            <ListItemText
                              primary={
                                <Link
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  color="primary"
                                >
                                  {item.name}
                                </Link>
                              }
                              secondary={
                                <Box>
                                  {item.description}
                                  <Chip
                                    size="small"
                                    label={item.free ? 'Free' : 'Paid'}
                                    color={item.free ? 'success' : 'default'}
                                    sx={{ ml: 1 }}
                                  />
                                </Box>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default ResourcesView; 