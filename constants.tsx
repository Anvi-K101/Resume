
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
        "Optimized application performance, reducing initial load time by 40%.",
        "Mentored a team of 4 junior developers and established code quality standards."
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
        "Implemented real-time data visualization dashboards using D3.js.",
        "Collaborated with product teams to define technical requirements and roadmaps."
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
    { id: 's1', category: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
    { id: 's2', category: "Frameworks", items: ["React", "Node.js", "Express", "Tailwind CSS"] }
  ],
  awards: ["Employee of the Year (2022) - TechNova"],
  certifications: ["AWS Certified Solutions Architect"]
};

export const INITIAL_STYLE: ResumeStyle = {
  font: ResumeFont.SANS,
  fontSize: 'medium',
  lineSpacing: 1.5,
  sectionSpacing: 1.5,
  layout: ResumeLayout.STANDARD,
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
  small: { base: 'text-sm', h1: 'text-2xl', h2: 'text-lg', h3: 'text-base' },
  medium: { base: 'text-base', h1: 'text-3xl', h2: 'text-xl', h3: 'text-lg' },
  large: { base: 'text-lg', h1: 'text-4xl', h2: 'text-2xl', h3: 'text-xl' }
};
