
import type { Github, Linkedin, GraduationCap, FlaskConical, Briefcase, Settings2, School } from 'lucide-react';

export interface Skill {
  name: string;
  percentage: number;
  category: string; // More generic category
  color?: string; // Tailwind CSS background color class, e.g., 'bg-blue-500'
}

export const skillsData: Skill[] = [
  // Programming Languages
  { name: 'Python', percentage: 90, category: 'Programming Languages', color: 'bg-blue-500' },
  { name: 'JavaScript', percentage: 85, category: 'Programming Languages', color: 'bg-yellow-400' },
  { name: 'Java', percentage: 80, category: 'Programming Languages', color: 'bg-orange-500' },
  { name: 'C++', percentage: 90, category: 'Programming Languages', color: 'bg-indigo-500' },
  { name: 'TypeScript', percentage: 70, category: 'Programming Languages', color: 'bg-sky-600' },

  // Machine Learning
  { name: 'Machine Learning Principles', percentage: 70, category: 'Machine Learning', color: 'bg-purple-600' },
  { name: 'Deep Learning', percentage: 50, category: 'Machine Learning', color: 'bg-pink-600' },
  { name: 'PyTorch', percentage: 75, category: 'Machine Learning', color: 'bg-red-600' },
  { name: 'Hugging Face', percentage: 65, category: 'Machine Learning', color: 'bg-amber-500' },
  
  // Frontend
  { name: 'Next.js', percentage: 70, category: 'Frontend', color: 'bg-slate-700' },
  { name: 'React', percentage: 80, category: 'Frontend', color: 'bg-cyan-500' },
  { name: 'Tailwind CSS', percentage: 60, category: 'Frontend', color: 'bg-teal-500' },
  { name: 'HTML/CSS', percentage: 90, category: 'Frontend', color: 'bg-rose-500' },

  // Backend
  { name: 'Node.js', percentage: 70, category: 'Backend', color: 'bg-green-600' },
  { name: 'Express.js', percentage: 65, category: 'Backend', color: 'bg-neutral-500' },

  // Database
  { name: 'MongoDB', percentage: 60, category: 'Database', color: 'bg-emerald-600' },
  { name: 'PostgreSQL', percentage: 55, category: 'Database', color: 'bg-blue-700' },

  // DevOps
  { name: 'Docker', percentage: 60, category: 'DevOps', color: 'bg-sky-700' },
  { name: 'Git & GitHub', percentage: 85, category: 'DevOps', color: 'bg-zinc-600' },
  
  // Design
  { name: 'Figma', percentage: 70, category: 'Design', color: 'bg-fuchsia-500' },
];

export interface ProfileLink {
  name: string;
  url: string;
  icon: string; // Lucide icon name as a string
  ariaLabel: string;
}

export const profileLinks: ProfileLink[] = [
  { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=RebPXvAAAAAJ&hl=en&authuser=3', icon: 'GraduationCap', ariaLabel: 'View Google Scholar profile for Mohammad Shihab Hossain' },
  { name: 'GitHub', url: 'https://github.com/Zul-Qarnain', icon: 'Github', ariaLabel: 'View GitHub profile for Mohammad Shihab Hossain' },
  { name: 'ResearchGate', url: 'https://www.researchgate.net/profile/Mohammad-Hossian-2?ev=hdr_xprf', icon: 'FlaskConical', ariaLabel: 'View ResearchGate profile for Mohammad Shihab Hossain' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/zul-qarnain20/', icon: 'Linkedin', ariaLabel: 'View LinkedIn profile for Mohammad Shihab Hossain' },
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
  icon: 'Settings2', // This might not be used directly in the title anymore
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
  icon: string; // Name of the Lucide icon
}

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'AI & Robotics Landing Page',
    description: 'A modern landing page showcasing concepts in Artificial Intelligence and Robotics, built with Next.js and Tailwind CSS.',
    techStack: ['Next.js', 'React', 'Tailwind CSS'],
    githubLink: 'https://github.com/VirsysX/landingpage',
    icon: 'Bot' 
  },
  {
    id: '2',
    title: 'VirsysNFT Marketplace Demo',
    description: 'A demonstration NFT marketplace website, exploring digital asset trading. Built with Next.js and Tailwind CSS.',
    techStack: ['Next.js', 'React', 'Tailwind CSS'],
    githubLink: 'https://github.com/VirsysX/virsysnft',
    icon: 'GalleryHorizontalEnd'
  },
  {
    id: '3',
    title: 'PixelRacer 2D Game',
    description: 'A fast-paced, top-down 2D car dodging game built with Three.js. Avoid traffic, collect coins, and chase high scores!',
    techStack: ['Three.js', 'JavaScript', 'HTML5'],
    githubLink: 'https://github.com/Zul-Qarnain/PixelRacer',
    icon: 'Gamepad2'
  },
  {
    id: '4',
    title: 'Sanda-AI Discord Bot',
    description: "An AI-powered Discord bot with a 'savage' personality, designed to reply to users with witty and sharp tones. Built with Python.",
    techStack: ['Python', 'Discord.py'],
    githubLink: 'https://github.com/Zul-Qarnain/Sanda-AI',
    icon: 'MessageSquare'
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
 
    
