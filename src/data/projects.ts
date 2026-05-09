export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  demo: string;
  github: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Online Home Services - HandyGo',
    description:
      'A web platform that allows users to book home services in three easy steps. Features include GIS-based service location, AI integration, coupons, reCaptcha security, and other advanced functionalities to simplify service booking.',
    category: 'Full Stack',
    tags: ['React', 'Node.js', 'MongoDB', 'Paymongo', 'Redis'],
    gradientFrom: '#6366f1',
    gradientTo: '#8b5cf6',
    accentColor: 'rgba(99,102,241,0.3)',
    demo: '#',
    github: '#',
    year: '2024',
  },
  {
    id: 2,
    title: 'PulseAI Dashboard',
    description:
      'Real-time analytics platform powered by machine learning, featuring interactive data visualization, predictive modeling, and automated insights generation.',
    category: 'AI / ML',
    tags: ['React', 'Python', 'TensorFlow', 'D3.js', 'FastAPI'],
    gradientFrom: '#8b5cf6',
    gradientTo: '#ec4899',
    accentColor: 'rgba(139,92,246,0.3)',
    demo: '#',
    github: '#',
    year: '2024',
  },
  {
    id: 3,
    title: 'Connectify',
    description:
      'Modern social media platform with real-time messaging via WebSockets, ephemeral stories, AI-powered content curation, and end-to-end encryption.',
    category: 'Full Stack',
    tags: ['Next.js', 'Socket.io', 'PostgreSQL', 'Redis', 'TypeScript'],
    gradientFrom: '#ec4899',
    gradientTo: '#f97316',
    accentColor: 'rgba(236,72,153,0.3)',
    demo: '#',
    github: '#',
    year: '2023',
  },
  {
    id: 4,
    title: 'DevForge',
    description:
      'Zero-config developer portfolio generator that transforms a simple JSON config into a stunning, animated, fully-deployed portfolio website in seconds.',
    category: 'Frontend',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'TailwindCSS', 'Vercel'],
    gradientFrom: '#06b6d4',
    gradientTo: '#3b82f6',
    accentColor: 'rgba(6,182,212,0.3)',
    demo: '#',
    github: '#',
    year: '2023',
  },
  {
    id: 5,
    title: 'AeroWeather',
    description:
      'Immersive weather application with stunning 3D atmospheric visualizations, hyperlocal forecasting, real-time storm alerts, and offline PWA support.',
    category: 'Frontend',
    tags: ['React', 'Three.js', 'OpenWeather API', 'TypeScript', 'PWA'],
    gradientFrom: '#14b8a6',
    gradientTo: '#06b6d4',
    accentColor: 'rgba(20,184,166,0.3)',
    demo: '#',
    github: '#',
    year: '2023',
  },
];

export const categories = ['All', 'Full Stack', 'Frontend', 'AI / ML'];
