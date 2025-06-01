
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
  { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=RebPXvAAAAAJ&hl=en&authuser=3', icon: 'GraduationCap', ariaLabel: 'View Google Scholar profile' },
  { name: 'GitHub', url: 'https://github.com/Zul-Qarnain', icon: 'Github', ariaLabel: 'View GitHub profile' },
  { name: 'ResearchGate', url: 'https://www.researchgate.net/profile/Mohammad-Hossian-2?ev=hdr_xprf', icon: 'FlaskConical', ariaLabel: 'View ResearchGate profile' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/zul-qarnain20/', icon: 'Linkedin', ariaLabel: 'View LinkedIn profile' },
];

export const educationData = {
  icon: 'School',
  university: 'American International University - Bangladesh (AIUB)',
  major: 'BSc in Computer Science and Engineering',
};

export const experienceData = {
  icon: 'Briefcase',
  summary: "Skilled in Cybersecurity Engineering, AI/ML Engineering, and Research. Dedicated to leveraging these expertises to develop innovative solutions and contribute to impactful projects.",
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
    title: 'A large Language Model is not the Right Path to Bring Artificial General Intelligence',
    authors: 'Md. Mobin Chowdhury, Mohammad Shihab Hossain, Md. Faruk Abdullah Al Sohan',
    venue: '7th IEOM Bangladesh International Conference on Industrial Engineering and Operations Management, AIUB Campus, Dhaka',
    date: 'December 2024',
    link: 'https://www.researchgate.net/publication/389855793_A_large_Language_Model_is_not_the_Right_Path_to_Bring_Artificial_General_Intelligence',
    type: 'Conference',
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
  images: string[];
  imageHint: string;
  date: string;
  location: string;
  description: string;
  story: string;
}

export const eventsData: Event[] = [
  {
    id: '1',
    title: 'Keynote Speaker at Tech Innovators Summit 2023',
    images: [
        'https://placehold.co/600x400.png',
        'https://placehold.co/600x400.png?a=2'
    ],
    imageHint: 'conference stage',
    date: 'November 15, 2023',
    location: 'San Francisco, CA',
    description: 'Delivered a keynote on the future of AI and its societal impact.',
    story: 'It was an honor to address a diverse audience of tech leaders, researchers, and enthusiasts at the Tech Innovators Summit. My talk focused on the ethical considerations and transformative potential of advanced AI systems. The Q&A session was particularly engaging, with insightful questions about AI governance and future research directions.',
  },
  {
    id: '2',
    title: 'Presented Research at NeurIPS 2022',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png?a=extra'],
    imageHint: 'poster session',
    date: 'December 5, 2022',
    location: 'New Orleans, LA',
    description: 'Presented a paper on novel optimization techniques for large language models.',
    story: 'Participating in NeurIPS 2022 was an incredible experience. I had the opportunity to present our latest research during a poster session, leading to many fruitful discussions with fellow researchers. The conference also provided a chance to learn about cutting-edge developments across various subfields of machine learning.',
  },
  {
    id: '3',
    title: 'Hackathon Winner - AI for Good Challenge',
    images: [
        'https://placehold.co/600x400.png',
        'https://placehold.co/600x400.png?a=3',
        'https://placehold.co/600x400.png?a=4'
    ],
    imageHint: 'team award',
    date: 'May 20, 2022',
    location: 'Virtual Event',
    description: 'Our team won first place for developing an AI solution to improve accessibility for visually impaired individuals.',
    story: 'The AI for Good Challenge was an intense but rewarding 48-hour hackathon. Our team collaborated remotely to build a prototype that uses computer vision and natural language processing to describe surroundings for visually impaired users. Winning the challenge was a fantastic validation of our hard work and the potential of AI to create positive social impact.',
  },
  {
    id: '4',
    title: 'Workshop on Advanced Python',
    images: ['https://placehold.co/600x400.png?a=workshop'],
    imageHint: 'coding workshop',
    date: 'July 10, 2023',
    location: 'Online',
    description: 'Led a hands-on workshop covering advanced Python features and best practices for software development.',
    story: 'This online workshop attracted over 100 participants eager to deepen their Python knowledge. We covered topics like decorators, generators, context managers, and asynchronous programming. The interactive coding sessions were a highlight, allowing attendees to apply concepts in real-time. It was great to see so much enthusiasm for learning and sharing knowledge within the Python community.',
  },
  {
    id: '5',
    title: 'Panelist at Future of Work Conference',
    images: ['https://placehold.co/600x400.png?a=panel'],
    imageHint: 'panel discussion',
    date: 'September 5, 2021',
    location: 'Virtual',
    description: 'Discussed the evolving landscape of tech careers and the skills needed for future success.',
    story: 'Joining the panel on the Future of Work was a thought-provoking experience. We delved into how automation, AI, and remote collaboration are reshaping industries. I shared my perspectives on the importance of continuous learning and adaptability for professionals navigating these changes. The audience interaction was fantastic, with many questions about upskilling and career transitions.',
  }
];

export const contactSectionData = {
  note: "I’ll get back to you as soon as possible.",
};

export const resumeUrl = "/resume.pdf"; // Path to your resume in the public folder

    