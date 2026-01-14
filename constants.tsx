
import { ResumeData, ResumeStyle, ResumeFont, ResumeLayout } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: "Alex Rivera",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 012-3456",
    location: "New York, NY",
    linkedin: "linkedin.com/in/alexrivera",
    summary: "Dedicated software engineer with over 5 years of experience building scalable web applications. Expert in React, Node.js, and cloud architecture with a focus on delivering high-performance user experiences."
  },
  experience: [
    {
      id: '1',
      company: "TechNova Solutions",
      position: "Senior Frontend Engineer",
      location: "San Francisco, CA",
      startDate: "2021-01",
      endDate: "Present",
      description: [
        "Led the migration of a legacy monolithic frontend to a modern micro-frontend architecture using React and Module Federation.",
        "Optimized application performance, reducing initial load time by 40% through code-splitting and asset optimization.",
        "Mentored a team of 4 junior developers and established code quality standards with automated linting and testing.",
        "Collaborated with UX designers to implement a comprehensive design system adopted across three major product lines."
      ]
    },
    {
      id: '2',
      company: "DataStream Systems",
      position: "Full Stack Developer",
      location: "Austin, TX",
      startDate: "2018-06",
      endDate: "2020-12",
      description: [
        "Developed and maintained RESTful APIs using Node.js and Express, serving over 100k daily active users.",
        "Implemented real-time data visualization dashboards using D3.js, providing stakeholders with actionable insights.",
        "Optimized database queries in PostgreSQL, reducing average response time by 25%.",
        "Configured CI/CD pipelines using GitHub Actions, decreasing deployment time by 50%."
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: "State University of Technology",
      degree: "B.S. in Computer Science",
      location: "Austin, TX",
      startDate: "2014-08",
      endDate: "2018-05"
    }
  ],
  skills: [
    { id: 's1', category: "Frontend Stack", items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "GraphQL"] },
    { id: 's2', category: "Backend & DevOps", items: ["Node.js", "Express", "PostgreSQL", "AWS", "Docker", "Kubernetes"] },
    { id: 's3', category: "Tools & Workflow", items: ["Git", "Jest", "Cypress", "Agile/Scrum", "Figma", "Jira"] }
  ],
  projects: [
    {
      id: 'p1',
      name: "Open-Source UI Library",
      description: "A lightweight, accessible UI component library built with React and Tailwind CSS, currently used by 500+ developers.",
      link: "github.com/alexr/ui-kit"
    },
    {
      id: 'p2',
      name: "AI Portfolio Generator",
      description: "A specialized tool that generates custom portfolios based on user LinkedIn profiles using GPT-4 API.",
      link: "portfoliogen.ai"
    }
  ],
  awards: [
    "Employee of the Year (2022) - TechNova Solutions",
    "First Place, State Hackathon for Social Good (2019)",
    "State Math Olympiad Finalist (2014)"
  ],
  certifications: ["AWS Certified Solutions Architect", "Professional Scrum Master I"]
};

export const INITIAL_STYLE: ResumeStyle = {
  font: ResumeFont.SANS,
  fontSize: 'medium',
  lineSpacing: 1.4,
  sectionSpacing: 1.2,
  layout: ResumeLayout.SIDEBAR,
  accentColor: '#1a1a1a'
};

export const ACCENT_COLORS = [
  { name: 'Professional Black', value: '#1a1a1a' },
  { name: 'Classic Blue', value: '#1e40af' },
  { name: 'Success Green', value: '#166534' },
  { name: 'Corporate Slate', value: '#334155' },
  { name: 'Modern Indigo', value: '#4338ca' }
];

export const FONT_SIZES = {
  small: { base: 'text-[10px]', h1: 'text-xl', h2: 'text-[13px]', h3: 'text-[12px]' },
  medium: { base: 'text-[12px]', h1: 'text-2xl', h2: 'text-[16px]', h3: 'text-[14px]' },
  large: { base: 'text-[14px]', h1: 'text-3xl', h2: 'text-[18px]', h3: 'text-[16px]' }
};
