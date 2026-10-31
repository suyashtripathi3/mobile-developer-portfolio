// ─── CONFIG — Suyash: fill these in. They are intentionally left blank, never guessed. ───
export const CONFIG = {
  LINKEDIN_URL: '', // e.g. 'https://www.linkedin.com/in/your-profile'
  EMAIL: '',        // e.g. 'you@example.com'
  RESUME_URL: '',   // optional: link to a hosted PDF. Leave blank to use the in-app resume.
}

export const PROFILE = {
  name: 'Suyash Tripathi',
  title: 'React Native Developer | Mobile Application Developer',
  intro:
    'I am a passionate React Native Developer focused on building modern, intuitive, and high-performance mobile applications. I enjoy transforming ideas into beautiful digital products through thoughtful UI/UX, clean architecture, and practical engineering.',
  initials: 'ST',
  github: 'https://github.com/suyashtripathi3',
  oldPortfolio: 'https://my-portfolio-eight-alpha-54.vercel.app/',
  availability: 'Availability: contact via GitHub',
  interests: [
    'Cross-platform mobile development',
    'React Native and JavaScript',
    'Android and iOS application development',
    'REST API integration',
    'Firebase integration',
    'Mobile application performance',
    'Secure application development',
    'Modern UI/UX implementation',
  ],
}

export const SKILLS = [
  { group: 'Mobile Development', emphasis: true, items: ['React Native', 'React Native CLI', 'Android Development', 'iOS Development', 'JavaScript', 'JSX'] },
  { group: 'Frontend', items: ['React.js', 'HTML', 'CSS', 'Tailwind CSS'] },
  { group: 'Backend & API', items: ['Node.js', 'Express.js', 'REST APIs', 'Firebase', 'Authentication', 'JWT'] },
  { group: 'Database', items: ['MongoDB', 'SQL'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Postman', 'Android Studio', 'VS Code'] },
]

export const EXPERIENCE = [
  {
    role: 'React Native Developer',
    company: 'DesignersX Web and App Solutions',
    period: 'Current',
    current: true,
    description: 'Mobile application development.',
  },
  {
    role: 'MERN Stack Developer Intern',
    company: 'Whitelabelled Solutions Pvt. Ltd.',
    period: 'July 2024 – Dec 2024',
    current: false,
    description: 'Developed full-stack applications using MongoDB, Express.js, React, and Node.js. Built responsive user interfaces using React.js and Tailwind CSS. Integrated Firebase authentication and third-party REST APIs. Collaborated in an Agile environment with GitHub for version control, daily stand-ups and code reviews.',
  },
]

// Only features supplied by Suyash are listed. No download counts, ratings,
// user statistics, client names or performance metrics are claimed anywhere.
export const PROJECTS = [
  {
    id: 'skysnap',
    name: 'SkySnap',
    tagline: 'Weather Application',
    status: 'Project',
    statusNote: 'Details as supplied. Repository link not verified — none shown.',
    repo: '',
    demo: '',
    stack: ['React Native CLI', 'JavaScript', 'JSX', 'Open-Meteo API', 'Open-Meteo Geocoding API', 'AsyncStorage'],
    description: 'A premium weather interface with GPS-based location detection and weather forecasts.',
    features: ['GPS-based location detection', 'Weather forecasts via Open-Meteo API', 'Location search via Open-Meteo Geocoding API', 'Saved preferences with AsyncStorage', 'Premium weather interface'],
    preview: 'weather',
  },
  {
    id: 'tiwil',
    name: 'TIWIL',
    tagline: 'Mobile Application',
    status: 'Project',
    statusNote: 'Details as supplied. Repository link not verified — none shown.',
    repo: '',
    demo: '',
    stack: ['React Native', 'Firebase Authentication', 'Firebase Cloud Messaging', 'API integration'],
    description: 'A mobile application with authentication, push notifications, API integration and deep linking.',
    features: ['Firebase Authentication', 'Firebase Cloud Messaging', 'API integration', 'Deep linking', 'Mobile application features'],
    preview: 'app',
  },
  {
    id: 'hisabrakho',
    name: 'HisabRakho',
    tagline: 'Expense Management Application',
    status: 'Under development',
    statusNote: 'Backend is dev-only (in-memory store); mobile side is API clients plus a navigation skeleton. Not yet production-ready.',
    repo: 'https://github.com/suyashtripathi3/HR-App',
    demo: '',
    stack: ['React Native CLI', 'JavaScript', 'Node.js', 'Express.js'],
    description: 'Personal expense tracking, group expense management, shared investments and expenses, with financial summaries and analytics.',
    features: ['Personal expense tracking', 'Group expense management', 'Shared investments and expenses', 'Financial summaries and analytics'],
    preview: 'expense',
  },
  {
    id: 'rn-e-com',
    name: 'RN-E-COM',
    tagline: 'Mini E-commerce App',
    status: 'Completed',
    statusNote: 'Built and pushed to GitHub, including dark mode.',
    repo: 'https://github.com/suyashtripathi3/RN-E-COM',
    demo: '',
    stack: ['Expo', 'React Native', 'TypeScript', 'Expo Router', 'Zustand', 'AsyncStorage'],
    description: 'A mini e-commerce app with product listing, search, filtering and sorting, product detail, cart, checkout, wishlist, orders and dark mode.',
    features: ['Product listing, search, filter and sort', 'Product detail', 'Cart and checkout', 'Wishlist and orders', 'Dark mode'],
    preview: 'shop',
  },
]

export const APPS = [
  { id: 'about', label: 'About Me', icon: 'about', tint: '#2563eb' },
  { id: 'projects', label: 'My Projects', icon: 'projects', tint: '#0e7490' },
  { id: 'experience', label: 'Experience', icon: 'experience', tint: '#4338ca' },
  { id: 'skills', label: 'Technical Skills', icon: 'skills', tint: '#0369a1' },
  { id: 'resume', label: 'Resume', icon: 'resume', tint: '#b45309' },
  { id: 'contact', label: 'Contact Me', icon: 'contact', tint: '#047857' },
  { id: 'github', label: 'GitHub', icon: 'github', tint: '#111827' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', tint: '#0a66c2' },
]
