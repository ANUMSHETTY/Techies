export const careerPaths = {
  frontend: {
    title: "Frontend Developer",
    description: "Specializes in building user interfaces and web applications",
    levels: [
      {
        title: "Junior Frontend Developer",
        yearsExp: "0-2",
        salaryRange: "$60,000 - $85,000",
        requiredSkills: [
          { name: "HTML5", level: 70 },
          { name: "CSS3", level: 70 },
          { name: "JavaScript", level: 60 },
          { name: "React/Vue/Angular", level: 50 },
          { name: "Responsive Design", level: 60 },
          { name: "Version Control (Git)", level: 50 },
          { name: "Web Performance", level: 40 }
        ]
      },
      {
        title: "Mid-Level Frontend Developer",
        yearsExp: "2-5",
        salaryRange: "$85,000 - $120,000",
        requiredSkills: [
          { name: "HTML5", level: 90 },
          { name: "CSS3", level: 90 },
          { name: "JavaScript", level: 80 },
          { name: "React/Vue/Angular", level: 80 },
          { name: "TypeScript", level: 70 },
          { name: "State Management", level: 70 },
          { name: "Testing (Jest/Cypress)", level: 70 },
          { name: "Web Performance", level: 70 },
          { name: "CI/CD", level: 60 }
        ]
      },
      {
        title: "Senior Frontend Developer",
        yearsExp: "5-8",
        salaryRange: "$120,000 - $160,000",
        requiredSkills: [
          { name: "JavaScript", level: 90 },
          { name: "React/Vue/Angular", level: 90 },
          { name: "TypeScript", level: 90 },
          { name: "Architecture Design", level: 85 },
          { name: "Performance Optimization", level: 85 },
          { name: "Team Leadership", level: 80 },
          { name: "System Design", level: 80 },
          { name: "Security Best Practices", level: 75 }
        ]
      }
    ]
  },
  backend: {
    title: "Backend Developer",
    description: "Focuses on server-side logic and database management",
    levels: [
      {
        title: "Junior Backend Developer",
        yearsExp: "0-2",
        salaryRange: "$65,000 - $90,000",
        requiredSkills: [
          { name: "Python/Java/Node.js", level: 60 },
          { name: "SQL Basics", level: 60 },
          { name: "RESTful APIs", level: 50 },
          { name: "Version Control", level: 50 },
          { name: "Basic Security", level: 40 },
          { name: "Server Management", level: 40 }
        ]
      },
      {
        title: "Mid-Level Backend Developer",
        yearsExp: "2-5",
        salaryRange: "$90,000 - $130,000",
        requiredSkills: [
          { name: "Python/Java/Node.js", level: 80 },
          { name: "Advanced SQL", level: 80 },
          { name: "System Design", level: 70 },
          { name: "API Design", level: 80 },
          { name: "Security", level: 70 },
          { name: "Microservices", level: 70 },
          { name: "Message Queues", level: 60 },
          { name: "Caching", level: 70 }
        ]
      },
      {
        title: "Senior Backend Developer",
        yearsExp: "5-8",
        salaryRange: "$130,000 - $180,000",
        requiredSkills: [
          { name: "System Architecture", level: 90 },
          { name: "Distributed Systems", level: 85 },
          { name: "Security Architecture", level: 85 },
          { name: "Performance Optimization", level: 90 },
          { name: "Team Leadership", level: 80 },
          { name: "Database Design", level: 90 },
          { name: "Scalability", level: 85 }
        ]
      }
    ]
  },
  devops: {
    title: "DevOps Engineer",
    description: "Bridges development and operations, focusing on deployment and infrastructure",
    levels: [
      {
        title: "Junior DevOps Engineer",
        yearsExp: "0-2",
        salaryRange: "$70,000 - $95,000",
        requiredSkills: [
          { name: "Linux/Unix", level: 60 },
          { name: "Basic Scripting", level: 60 },
          { name: "Docker", level: 50 },
          { name: "CI/CD Basics", level: 50 },
          { name: "Cloud Platforms", level: 50 },
          { name: "Version Control", level: 60 }
        ]
      },
      {
        title: "Mid-Level DevOps Engineer",
        yearsExp: "2-5",
        salaryRange: "$95,000 - $140,000",
        requiredSkills: [
          { name: "Infrastructure as Code", level: 80 },
          { name: "Container Orchestration", level: 75 },
          { name: "Advanced CI/CD", level: 80 },
          { name: "Cloud Architecture", level: 75 },
          { name: "Monitoring & Logging", level: 80 },
          { name: "Security Practices", level: 70 },
          { name: "Automation", level: 80 }
        ]
      },
      {
        title: "Senior DevOps Engineer",
        yearsExp: "5-8",
        salaryRange: "$140,000 - $190,000",
        requiredSkills: [
          { name: "System Architecture", level: 90 },
          { name: "Cloud Native Architecture", level: 90 },
          { name: "Security Architecture", level: 85 },
          { name: "Cost Optimization", level: 85 },
          { name: "Team Leadership", level: 80 },
          { name: "Disaster Recovery", level: 85 },
          { name: "Performance Optimization", level: 90 }
        ]
      }
    ]
  },
  dataScience: {
    title: "Data Scientist",
    description: "Analyzes complex data to help make business decisions",
    levels: [
      {
        title: "Junior Data Scientist",
        yearsExp: "0-2",
        salaryRange: "$75,000 - $100,000",
        requiredSkills: [
          { name: "Python", level: 70 },
          { name: "SQL", level: 60 },
          { name: "Statistics", level: 70 },
          { name: "Machine Learning Basics", level: 50 },
          { name: "Data Visualization", level: 60 },
          { name: "Pandas/NumPy", level: 60 }
        ]
      },
      {
        title: "Mid-Level Data Scientist",
        yearsExp: "2-5",
        salaryRange: "$100,000 - $145,000",
        requiredSkills: [
          { name: "Advanced Statistics", level: 80 },
          { name: "Machine Learning", level: 80 },
          { name: "Deep Learning", level: 70 },
          { name: "Big Data Tools", level: 75 },
          { name: "Data Pipeline", level: 70 },
          { name: "Feature Engineering", level: 80 },
          { name: "Model Deployment", level: 70 }
        ]
      },
      {
        title: "Senior Data Scientist",
        yearsExp: "5-8",
        salaryRange: "$145,000 - $200,000",
        requiredSkills: [
          { name: "Advanced ML Algorithms", level: 90 },
          { name: "Research & Development", level: 85 },
          { name: "Team Leadership", level: 80 },
          { name: "Project Management", level: 80 },
          { name: "MLOps", level: 85 },
          { name: "Business Strategy", level: 85 }
        ]
      }
    ]
  },
  dataAnalyst: {
    title: "Data Analyst",
    description: "Interprets data and turns it into information which can offer ways to improve business",
    levels: [
      {
        title: "Junior Data Analyst",
        yearsExp: "0-2",
        salaryRange: "$55,000 - $75,000",
        requiredSkills: [
          { name: "SQL", level: 70 },
          { name: "Excel", level: 80 },
          { name: "Data Visualization", level: 60 },
          { name: "Statistics Basics", level: 60 },
          { name: "Python/R Basics", level: 50 },
          { name: "Business Understanding", level: 50 }
        ]
      },
      {
        title: "Mid-Level Data Analyst",
        yearsExp: "2-5",
        salaryRange: "$75,000 - $100,000",
        requiredSkills: [
          { name: "Advanced SQL", level: 85 },
          { name: "Python/R", level: 75 },
          { name: "Advanced Statistics", level: 75 },
          { name: "Data Modeling", level: 70 },
          { name: "Dashboard Creation", level: 80 },
          { name: "ETL Processes", level: 70 },
          { name: "Business Analytics", level: 75 }
        ]
      },
      {
        title: "Senior Data Analyst",
        yearsExp: "5-8",
        salaryRange: "$100,000 - $135,000",
        requiredSkills: [
          { name: "Team Leadership", level: 80 },
          { name: "Project Management", level: 80 },
          { name: "Advanced Analytics", level: 90 },
          { name: "Predictive Modeling", level: 80 },
          { name: "Business Strategy", level: 85 },
          { name: "Stakeholder Management", level: 85 }
        ]
      }
    ]
  },
  aiMl: {
    title: "AI/ML Engineer",
    description: "Develops artificial intelligence and machine learning systems",
    levels: [
      {
        title: "Junior AI/ML Engineer",
        yearsExp: "0-2",
        salaryRange: "$80,000 - $110,000",
        requiredSkills: [
          { name: "Python", level: 70 },
          { name: "Machine Learning Basics", level: 60 },
          { name: "Deep Learning Basics", level: 50 },
          { name: "Mathematics", level: 70 },
          { name: "Data Preprocessing", level: 60 },
          { name: "ML Libraries", level: 60 }
        ]
      },
      {
        title: "Mid-Level AI/ML Engineer",
        yearsExp: "2-5",
        salaryRange: "$110,000 - $160,000",
        requiredSkills: [
          { name: "Advanced ML Algorithms", level: 80 },
          { name: "Deep Learning", level: 80 },
          { name: "NLP", level: 75 },
          { name: "Computer Vision", level: 75 },
          { name: "MLOps", level: 70 },
          { name: "Model Optimization", level: 80 },
          { name: "Big Data Processing", level: 75 }
        ]
      },
      {
        title: "Senior AI/ML Engineer",
        yearsExp: "5-8",
        salaryRange: "$160,000 - $220,000",
        requiredSkills: [
          { name: "AI System Architecture", level: 90 },
          { name: "Advanced Deep Learning", level: 90 },
          { name: "Research & Development", level: 85 },
          { name: "Team Leadership", level: 80 },
          { name: "AI Strategy", level: 85 },
          { name: "Ethics & Governance", level: 85 }
        ]
      }
    ]
  },
  cloud: {
    title: "Cloud Engineer",
    description: "Manages and implements cloud infrastructure and services",
    levels: [
      {
        title: "Junior Cloud Engineer",
        yearsExp: "0-2",
        salaryRange: "$70,000 - $95,000",
        requiredSkills: [
          { name: "AWS/Azure/GCP Basics", level: 60 },
          { name: "Linux", level: 60 },
          { name: "Networking Basics", level: 60 },
          { name: "Security Fundamentals", level: 50 },
          { name: "IaC Basics", level: 50 },
          { name: "Scripting", level: 60 }
        ]
      },
      {
        title: "Mid-Level Cloud Engineer",
        yearsExp: "2-5",
        salaryRange: "$95,000 - $140,000",
        requiredSkills: [
          { name: "Cloud Architecture", level: 80 },
          { name: "Infrastructure as Code", level: 80 },
          { name: "Container Orchestration", level: 75 },
          { name: "Cloud Security", level: 75 },
          { name: "Monitoring & Logging", level: 80 },
          { name: "Cost Optimization", level: 70 },
          { name: "Multi-Cloud", level: 70 }
        ]
      },
      {
        title: "Senior Cloud Engineer",
        yearsExp: "5-8",
        salaryRange: "$140,000 - $190,000",
        requiredSkills: [
          { name: "Cloud Architecture Design", level: 90 },
          { name: "Enterprise Solutions", level: 85 },
          { name: "Security Architecture", level: 85 },
          { name: "Team Leadership", level: 80 },
          { name: "Cloud Strategy", level: 85 },
          { name: "Cost Management", level: 85 },
          { name: "Disaster Recovery", level: 85 }
        ]
      }
    ]
  }
}; 