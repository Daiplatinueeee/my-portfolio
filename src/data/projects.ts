export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  image?: string;
  demo: string;
  github: string;
  year: string;
}

import hanydo from '../assets/handygo.png'
import coprofit from '../assets/coprofit.png'
import sams from '../assets/RFID-banner.png'

export const projects: Project[] = [
  {
    id: 1,
    title: "Online Home Services - HandyGo",
    description:
      "A web platform that allows users to book home services in three easy steps. Features include GIS-based service location, AI integration, coupons, reCaptcha security, and other advanced functionalities to simplify service booking.",
    category: "Full Stack",
    tags: ["React", "Node.js", "MongoDB", "Paymongo", "Express.js", "TailwindCSS", "FastAPI", "Javascript"],
    gradientFrom: "#6366f1",
    gradientTo: "#8b5cf6",
    accentColor: "rgba(99,102,241,0.3)",
    image: hanydo,
    demo: "https://ohs-one.vercel.app/",
    github: "https://github.com/Daiplatinueeee/OHSv3",
    year: "2026",
  },
  {
    id: 2,
    title: "Co Profit Global Corp.",
    description:
      "A genealogy-based networking management system featuring automated bonus computations such as Sign 5, Repeat Binary, Stairstep, Direct & Indirect Referrals, Leadership Incentives, and Unilevel Point rewards with scalable member and referral management.",
    category: "Full Stack",
    tags: ["React", "Node.js", "MongoDB", "Xendit", "NestJS", "TailwindCSS", "Javascript"],
    gradientFrom: "#8b5cf6",
    gradientTo: "#ec4899",
    accentColor: "rgba(139,92,246,0.3)",
    image: coprofit,
    demo: "https://www.coprofit-global.com/",
    github: "https://github.com/Daiplatinueeee/CoProfitGlobal",
    year: "2026",
  },
  {
    id: 3,
    title: "SAMS - Student Attendance Management System",
    description:
      "A comprehensive solution for managing student attendance with real-time updates, reporting, and integration with existing school management systems.",
    category: "Full Stack",
    tags: ["React", "MySQL", "TypeScript", "TailwindCSS", "ShadcnUI", "Javascript"],
    gradientFrom: "#ec4899",
    gradientTo: "#f97316",
    accentColor: "rgba(236,72,153,0.3)",
    image: sams,
    demo: "https://github.com/Daiplatinueeee/Attendance_System",
    github: "https://github.com/Daiplatinueeee/Attendance_System",
    year: "2025",
  },
];

export const categories = ["All", "Full Stack", "Mobile App",];