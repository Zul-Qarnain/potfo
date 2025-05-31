import type { Github, Linkedin, GraduationCap, FlaskConical, Briefcase, Settings2, School } from 'lucide-react';

export interface Skill {
  name: string;
  percentage: number;
  category: 'Programming Languages' | 'Tools & Frameworks';
}

export const skillsData: Skill[] = [
  { name: 'Python', percentage: 90, category: 'Programming Languages' },
  { name: 'Java', percentage: 80, category: 'Programming Languages' },
  { name: 'C++', percentage: 90, category: 'Programming Languages' },
  { name: 'Machine Learning', percentage: 70, category: 'Tools & Frameworks' },
  { name: 'Deep Learning', percentage: 50, category: 'Tools & Frameworks' },
  { name: 'Next.js', percentage: 70, category: 'Tools & Frameworks' },
  { name: 'Tailwind CSS', percentage: 60, category: 'Tools & Frameworks' },
];

export interface ProfileLink {
  name: string;
  url: string;
  icon: React.ElementType<Github | Linkedin | GraduationCap | FlaskConical>; // Lucide icon component
  ariaLabel: string;
}

export const profileLinks: ProfileLink[] = [
  { name: 'Google Scholar', url: '#', icon: 'GraduationCap', ariaLabel: 'View Google Scholar profile' },
  { name: 'GitHub', url: 'https://github.com/yourusername', icon: 'Github', ariaLabel: 'View GitHub profile' },
  { name: 'ResearchGate', url: '#', icon: 'FlaskConical', ariaLabel: 'View ResearchGate profile' },
  { name: 'LinkedIn', url: '#', icon: 'Linkedin', ariaLabel: 'View LinkedIn profile' },
];

export const educationData = {
  icon: 'School',
  university: 'Stanford University', // Replace with actual university
  major: 'Ph.D. in Computer Science', // Replace with actual major
};

export const experienceData = {
  icon: 'Briefcase',
  summary: "Currently a Research Intern at XYZ Corp, focusing on applications of generative AI in natural language understanding. Previously worked on distributed machine learning systems at ABC Inc. Passionate about bridging the gap between theoretical research and real-world applications.",
};

export const skillsSectionData = {
  icon: 'Settings2',
};


export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  date: string;
  link: string;
  type: 'Journal' | 'Conference';
}

export const publicationsData: Publication[] = [
  {
    id: '1',
    title: 'Advanced Deep Learning Techniques for Image Recognition',
    authors: 'Your Name, Co Author 1, Co Author 2',
    venue: 'Journal of Machine Learning Research (JMLR)',
    date: 'October 2023',
    link: '#', // Replace with actual link
    type: 'Journal',
  },
  {
    id: '2',
    title: 'Scalable Algorithms for Big Data Analytics',
    authors: 'Your Name, Co Author 3',
    venue: 'Proceedings of the International Conference on Data Mining (ICDM)',
    date: 'December 2022',
    link: '#',
    type: 'Conference',
  },
  {
    id: '3',
    title: 'Exploring the Frontiers of Quantum Computing',
    authors: 'Your Name',
    venue: 'Nature Physics',
    date: 'June 2022',
    link: '#',
    type: 'Journal',
  },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  image: string; // Placeholder image URL
  imageHint: string;
}

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Code Review Assistant',
    description: 'A tool that uses machine learning to analyze code changes and provide intelligent suggestions for improvement.',
    techStack: ['Python', 'PyTorch', 'Flask', 'Docker'],
    githubLink: '#', // Replace with actual GitHub link
    image: 'https://placehold.co/600x400.png',
    imageHint: 'code abstract'
  },
  {
    id: '2',
    title: 'Personal Portfolio Website (This one!)',
    description: 'A modern, responsive portfolio built with Next.js, Tailwind CSS, and TypeScript.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    githubLink: '#',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'website design'
  },
  {
    id: '3',
    title: 'Decentralized Social Network Prototype',
    description: 'An exploration of building a social media platform on decentralized technologies for enhanced user privacy.',
    techStack: ['Solidity', 'IPFS', 'React', 'Node.js'],
    githubLink: '#',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'network abstract'
  },
];

export interface Event {
  id: string;
  title: string;
  image: string; // Placeholder image URL
  imageHint: string;
  date: string;
  location: string;
  description: string; // Short description for card
  story: string; // Longer story for modal
}

export const eventsData: Event[] = [
  {
    id: '1',
    title: 'Keynote Speaker at Tech Innovators Summit 2023',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'conference stage',
    date: 'November 15, 2023',
    location: 'San Francisco, CA',
    description: 'Delivered a keynote on the future of AI and its societal impact.',
    story: 'It was an honor to address a diverse audience of tech leaders, researchers, and enthusiasts at the Tech Innovators Summit. My talk focused on the ethical considerations and transformative potential of advanced AI systems. The Q&A session was particularly engaging, with insightful questions about AI governance and future research directions.',
  },
  {
    id: '2',
    title: 'Presented Research at NeurIPS 2022',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'poster session',
    date: 'December 5, 2022',
    location: 'New Orleans, LA',
    description: 'Presented a paper on novel optimization techniques for large language models.',
    story: 'Participating in NeurIPS 2022 was an incredible experience. I had the opportunity to present our latest research during a poster session, leading to many fruitful discussions with fellow researchers. The conference also provided a chance to learn about cutting-edge developments across various subfields of machine learning.',
  },
  {
    id: '3',
    title: 'Hackathon Winner - AI for Good Challenge',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'team award',
    date: 'May 20, 2022',
    location: 'Virtual Event',
    description: 'Our team won first place for developing an AI solution to improve accessibility for visually impaired individuals.',
    story: 'The AI for Good Challenge was an intense but rewarding 48-hour hackathon. Our team collaborated remotely to build a prototype that uses computer vision and natural language processing to describe surroundings for visually impaired users. Winning the challenge was a fantastic validation of our hard work and the potential of AI to create positive social impact.',
  },
];

export const contactSectionData = {
  note: "I’ll get back to you as soon as possible.",
};

export const resumeUrl = "/resume.pdf"; // Path to your resume in the public folder
