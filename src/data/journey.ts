export interface JourneyEntry {
  id: number;
  year: string;
  title: string;
  company: string;
  type: 'education' | 'work' | 'freelance' | 'achievement';
  description: string;
  tags: string[];
  accent: string;
}

export const journeyEntries: JourneyEntry[] = [
  {
    id: 1,
    year: '2020',
    title: 'The First Line of Code',
    company: 'Self-Taught',
    type: 'education',
    description:
      "Discovered programming through a YouTube tutorial and never looked back. Fell in love with the power of building things from nothing — HTML, CSS, and JavaScript became my new obsession.",
    tags: ['HTML', 'CSS', 'JavaScript', 'Self-Learning'],
    accent: '#6366f1',
  },
  {
    id: 2,
    year: '2021',
    title: 'Going Full Stack',
    company: 'Personal Projects',
    type: 'education',
    description:
      "Dove deep into React, Node.js, and databases. Built over a dozen personal projects to solidify my skills — from to-do apps to full CRUD applications with authentication.",
    tags: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
    accent: '#8b5cf6',
  },
  {
    id: 3,
    year: '2022',
    title: 'First Internship',
    company: 'Tech Startup',
    type: 'work',
    description:
      "Joined a fast-paced startup as a frontend developer intern. Contributed to production code, collaborated with senior engineers, and shipped features used by thousands of users.",
    tags: ['React', 'TypeScript', 'Team Collaboration', 'Agile'],
    accent: '#ec4899',
  },
  {
    id: 4,
    year: '2024',
    title: 'Freelance & Open Source',
    company: 'Independent',
    type: 'freelance',
    description:
      "Began freelancing for international clients while contributing to open-source projects. Built custom web applications, developer tools, and UI component libraries used worldwide.",
    tags: ['Freelance', 'Open Source', 'Full Stack', 'Remote'],
    accent: '#14b8a6',
  },
  {
    id: 5,
    year: '2025',
    title: 'Available for Opportunities',
    company: 'Open to Work',
    type: 'achievement',
    description:
      "Currently seeking exciting full-time or contract opportunities to build impactful products. Passionate about creating performant, beautiful, user-centric digital experiences.",
    tags: ['Available', 'Full Stack', 'Remote-Friendly', 'Excited'],
    accent: '#6366f1',
  },
];
