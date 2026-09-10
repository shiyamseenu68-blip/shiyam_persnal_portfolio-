export interface ProjectItem {
  id: number;
  numberStr: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  liveDemoUrl: string;
  githubUrl: string;
  previewCode?: string;
}

export interface MilestoneItem {
  year: string;
  title: string;
  description: string;
}

export interface AchievementItem {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  date: string;
  isPlaceholder?: boolean;
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: string;
  icon: string;
  color: string;
}

export const portfolioData = {
  personal: {
    name: 'SHIYAM S',
    shortName: 'SHIYAM',
    role: 'CREATIVE WEBSITE DEVELOPER',
    altRole: 'FULL STACK DEVELOPER',
    tagline: 'I build modern, fast and scalable web applications that solve real world problems.',
    bio: "I'm Shiyam, a passionate Full Stack Developer who loves turning ideas into real world digital products. I enjoy building clean, user friendly and impactful applications.",
    email: 'shiyamseenu68@gmail.com', // Known email
    location: 'Tamil Nadu, India',
    languages: 'Tamil • English',
    githubUrl: 'https://github.com/shiyamseenu68',
    linkedinUrl: 'https://linkedin.com/in/shiyam',
    twitterUrl: 'https://twitter.com/shiyam',
  },

  // Statistics (Marked clearly as placeholders)
  stats: {
    experience: '[2+ Years]',
    projectsCompleted: '[15+ Projects]',
    technologiesCount: '[10+ Tech Stack]',
  },

  // Education (Marked clearly as placeholders)
  education: {
    degree: '[B.Tech / B.E. - Computer Science / IT]',
    years: '[2022 - 2026]',
    institution: '[Your University / College Name]',
  },

  // Technologies
  skills: [
    { id: 'react', name: 'React', category: 'Frontend', level: 'Advanced Mastery', icon: '⚛️', color: '#61DAFB' },
    { id: 'js', name: 'JavaScript', category: 'Language', level: 'Advanced Mastery', icon: '⚡', color: '#F7DF1E' },
    { id: 'python', name: 'Python', category: 'Language', level: 'Intermediate', icon: '🐍', color: '#3776AB' },
    { id: 'node', name: 'Node.js', category: 'Backend', level: 'Intermediate', icon: '🟩', color: '#339933' },
    { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', level: 'Advanced Mastery', icon: '🎨', color: '#06B6D4' },
    { id: 'mongodb', name: 'MongoDB', category: 'Database', level: 'Intermediate', icon: '🍃', color: '#47A248' },
    { id: 'git', name: 'Git & GitHub', category: 'Tools', level: 'Advanced Mastery', icon: '🐙', color: '#F05032' },
    { id: 'ts', name: 'TypeScript', category: 'Language', level: 'Intermediate', icon: '🔷', color: '#3178C6' },
  ] as SkillItem[],

  // Projects (Marked clearly with placeholders)
  projects: [
    {
      id: 1,
      numberStr: '01',
      title: '[Streamly / Your Project Title 01]',
      subtitle: '[A modern YouTube playlist downloader & manager]',
      description: '[Add your real project description here. Describe the problem solved and core features.]',
      techStack: ['React', 'Node.js', 'Tailwind CSS', 'MongoDB'],
      liveDemoUrl: '[YOUR_LIVE_DEMO_URL]',
      githubUrl: '[YOUR_GITHUB_REPO_URL]',
      previewCode: `// [Project 01 Sample Code / Component]
const streamlyApp = () => {
  return <StreamManager endpoint="wss://api.streamly.dev" />;
};`,
    },
    {
      id: 2,
      numberStr: '02',
      title: '[Your Project Title 02]',
      subtitle: '[Short tagline for project 02]',
      description: '[Add your real project description for project 02.]',
      techStack: ['React', 'TypeScript', 'Tailwind CSS'],
      liveDemoUrl: '[YOUR_LIVE_DEMO_URL]',
      githubUrl: '[YOUR_GITHUB_REPO_URL]',
      previewCode: `// [Project 02 Sample Code]
const appInstance = initializeProject();`,
    },
    {
      id: 3,
      numberStr: '03',
      title: '[Your Project Title 03]',
      subtitle: '[Short tagline for project 03]',
      description: '[Add your real project description for project 03.]',
      techStack: ['Node.js', 'Express', 'MongoDB'],
      liveDemoUrl: '[YOUR_LIVE_DEMO_URL]',
      githubUrl: '[YOUR_GITHUB_REPO_URL]',
      previewCode: `// [Project 03 API Endpoint]
app.get("/api/v1/data", (req, res) => res.json({ status: "success" }));`,
    },
  ] as ProjectItem[],

  // Journey Timeline (Marked clearly with placeholders)
  journey: [
    { year: '2022', title: '[Started College]', description: '[Enrolled in Degree Program]' },
    { year: '2022 - 2023', title: '[Learned Web Development]', description: '[Mastered HTML, CSS, JavaScript fundamentals]' },
    { year: '2023', title: '[Built First Projects]', description: '[Created initial web applications & UI showcases]' },
    { year: '2024', title: '[Explored Full Stack]', description: '[Dived into React, Node.js, Express & MongoDB]' },
    { year: '2025', title: '[Freelancing & Real Work]', description: '[Building projects for real clients or open source]' },
    { year: '2026', title: '[Building Better Everyday]', description: '[Developing advanced web apps & searching for opportunities]' },
  ] as MilestoneItem[],

  // Achievements (Marked clearly with placeholders)
  achievements: [
    {
      id: 1,
      type: 'HACKATHON',
      title: '[Winner / Participant]',
      subtitle: '[Smart India Hackathon / Event Name]',
      date: '[2024]',
      isPlaceholder: true,
    },
    {
      id: 2,
      type: 'CERTIFICATION',
      title: '[Meta Frontend Developer]',
      subtitle: '[Coursera / Certificate Provider]',
      date: '[2024]',
      isPlaceholder: true,
    },
    {
      id: 3,
      type: 'CERTIFICATION',
      title: '[AWS Cloud Practitioner]',
      subtitle: '[Amazon / Certificate Provider]',
      date: '[2025]',
      isPlaceholder: true,
    },
    {
      id: 4,
      type: 'ACHIEVEMENT',
      title: '[100+ Commits]',
      subtitle: '[GitHub Streak / Contribution]',
      date: '[2024 - 2026]',
      isPlaceholder: true,
    },
    {
      id: 5,
      type: 'ACHIEVEMENT',
      title: '[15+ Projects Completed]',
      subtitle: '[Personal & Client Projects]',
      date: '[2022 - 2026]',
      isPlaceholder: true,
    },
  ] as AchievementItem[],
};
