export interface ContactInfo {
  github: string;
  phone: string;
  email: string;
  linkedin: string;
}

export interface Interest {
  name: string;
  icon: string;
  description: string;
  items: string[];
}

export interface Profile {
  name: string;
  title: string[];
  location: string;
  summary: string;
  interests: Interest[];
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  techStack: string[];
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface ExperienceData {
  work: Experience[];
  education: Education[];
}

export interface SkillItem {
  name: string;
  icon: string;
  color: string;
}

export interface TechSkills {
  runtime: SkillItem[];
  frontend: SkillItem[];
  backend: SkillItem[];
  databases: SkillItem[];
  devops: SkillItem[];
  tools: SkillItem[];
}
