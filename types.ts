
export type CareerFocus = 
  | 'general' 
  | 'developer' 
  | 'creator' 
  | 'data' 
  | 'product' 
  | 'marketing' 
  | 'sales' 
  | 'design';

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Skill {
  id: string;
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  summary: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  awards?: string[];
  certifications?: string[];
}

export enum ResumeFont {
  SANS = 'Inter',
  SERIF = 'Libre Baskerville',
  MONO = 'Roboto Mono'
}

export enum ResumeLayout {
  STANDARD = 'standard',
  SIDEBAR = 'sidebar',
  MINIMAL = 'minimal'
}

export interface ResumeStyle {
  font: ResumeFont;
  fontSize: 'small' | 'medium' | 'large';
  lineSpacing: number;
  sectionSpacing: number;
  layout: ResumeLayout;
  accentColor: string;
}

export type SectionType = 'summary' | 'experience' | 'education' | 'skills' | 'awards' | 'certifications' | 'projects';
