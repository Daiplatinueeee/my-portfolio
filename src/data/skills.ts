export interface Skill {
  name: string;
  level: number;
  color: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '◈',
    skills: [
      { name: 'React / React Native', level: 95, color: '#61dafb' },
      { name: 'TypeScript', level: 90, color: '#3178c6' },
      { name: 'Next.js', level: 88, color: '#ffffff' },
      { name: 'Tailwind CSS', level: 95, color: '#38bdf8' },
      { name: 'Vue.js', level: 75, color: '#42d392' },
      { name: 'HTML / CSS', level: 98, color: '#e34f26' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '◉',
    skills: [
      { name: 'Node.js / Express', level: 88, color: '#68a063' },
      { name: 'Python / FastAPI', level: 80, color: '#f7c948' },
      { name: 'GraphQL', level: 72, color: '#e10098' },
      { name: 'REST API Design', level: 90, color: '#6366f1' },
      { name: 'WebSockets', level: 78, color: '#8b5cf6' },
      { name: 'Django', level: 65, color: '#44b78b' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    icon: '◎',
    skills: [
      { name: 'MongoDB', level: 85, color: '#47a248' },
      { name: 'PostgreSQL', level: 82, color: '#336791' },
      { name: 'Redis', level: 75, color: '#dc382d' },
      { name: 'Firebase', level: 78, color: '#ffca28' },
      { name: 'Prisma ORM', level: 80, color: '#5a67d8' },
      { name: 'Supabase', level: 72, color: '#3ecf8e' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: '◐',
    skills: [
      { name: 'Git / GitHub', level: 92, color: '#f05032' },
      { name: 'Docker', level: 75, color: '#2496ed' },
      { name: 'AWS / Vercel', level: 70, color: '#ff9900' },
      { name: 'Figma', level: 80, color: '#f24e1e' },
      { name: 'CI / CD Pipelines', level: 72, color: '#6366f1' },
      { name: 'Linux / CLI', level: 82, color: '#fcc624' },
    ],
  },
];
