import {
  mobile,
  backend,
  web,
  fullstack,
  javascript,
  reactjs,
  tailwind,
  mongodb,
  aws,
  python,
  typescript,
  nodejs,
  nextjs,
  redux,
  openai,
  langchain,
  docker,
  html,
  figma,
  git,
  sukriti,
  edneed,
  speako24,
  ignou,
  niet,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "education",
    title: "Education",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "React Developer",
    icon: fullstack,
  },
  {
    title: "Full-Stack Engineer",
    icon: backend,
  },
  {
    title: "AI / LLM Engineer",
    icon: mobile,
  },
  {
    title: "Cloud & AWS",
    icon: web,
  },
];

const education = [
  {
    title: "Master of Computer Applications (MCA)",
    company_name: "Indira Gandhi National Open University · Distance Learning",
    icon: ignou,
    iconBg: "#fff",
    date: "2025 – Present",
    points: [
      "Pursuing MCA via distance learning while working as a freelance React / AI Engineer.",
    ],
  },
  {
    title: "Bachelor of Technology",
    company_name: "Noida Institute of Engineering & Technology, Greater Noida",
    icon: niet,
    iconBg: "#fff",
    date: "2016 – 2020",
    points: ["B.Tech"],
  },
];

const experiences = [
  {
    title: "Freelance React / AI Engineer",
    company_name: "Self-Employed · Remote",
    icon: fullstack,
    iconBg: "#1a1a2e",
    date: "Jan 2025 – Present",
    points: [
      "Building LLM-powered web apps for global clients using OpenAI API, LangChain, and RAG pipelines — deployed on Vercel with CI/CD via GitHub Actions.",
      "Architected a document Q&A chatbot (RAG + ChromaDB + streaming responses) that cut a client's manual search time by ~60%, handling 10K+ queries/day.",
      "Developed a multi-agent AI workflow using LangGraph that automates content generation pipelines, reducing client turnaround from 4 hours to under 10 minutes.",
      "Deliver end-to-end Next.js + TypeScript frontends with Tailwind CSS, integrating REST/GraphQL APIs and real-time WebSocket features for 5+ active clients.",
      "Established a reusable LLM integration library (prompt templates, retry logic, cost tracking) adopted across 3 client codebases, saving ~2 days per new project.",
    ],
  },
  {
    title: "React JS Developer",
    company_name: "Sukriti Social Pvt. Ltd. · Noida",
    icon: speako24,
    iconBg: "#fff",
    date: "Feb 2022 – Dec 2024",
    points: [
      "Built a real-time IoT dashboard tracking 100+ smart toilet units — live MQTT data over AWS IoT Core WebSockets with sub-200ms latency, serving municipal clients across 3 states.",
      "Engineered a custom useMqttSubscription hook with exponential-backoff reconnection, eliminating duplicate AWS IoT connections and reducing connection errors by 85% in production.",
      "Slashed UI re-renders from 600/min to 18/min by throttling MQTT state updates, virtualising 2000-row tables, and memoising chart components with React.memo and useCallback.",
      "Built a multi-tenant MIS portal (Redux Toolkit + AWS Lambda + S3) for 10+ client organisations with Cognito RBAC role management — halved report generation time by parallelising Lambda invocations.",
      "Boosted Lighthouse performance score from 54 → 91 through lazy loading, route-based code splitting, image optimisation, and CloudFront CDN edge caching.",
      "Mentored 2 junior engineers, conducted code reviews, and established a component design system that cut feature dev time by 30%.",
    ],
  },
  {
    title: "MERN Stack Developer",
    company_name: "Edneed Technology Pvt. Ltd. · Delhi",
    icon: edneed,
    iconBg: "#fff",
    date: "Jul 2021 – Dec 2021",
    points: [
      "Engineered the complete online exam module from scratch — teacher scheduling, live proctoring UI, auto-submit with grace-time countdown, successfully handling 500+ concurrent exam sessions.",
      "Built a real-time exam monitoring dashboard with socket-based activity tracking, flagging suspicious behaviour patterns and streaming live student status to proctors.",
      "Integrated Firebase push notifications, transactional email, and WhatsApp alerts with MongoDB-based deduplication, ensuring exactly-once delivery across all notification channels.",
      "Developed a rich-text assignment builder with drag-and-drop question ordering, bulk CSV import, and automated scoring — reducing teacher setup time by 70%.",
      "Optimised MongoDB aggregation pipelines for analytics reports, cutting query time from 8s → 600ms by adding compound indexes and query projection.",
    ],
  },
  {
    title: "Software Engineer — Frontend",
    company_name: "Speako24 (Classhour) · Noida",
    icon: sukriti,
    iconBg: "#fff",
    date: "Dec 2020 – Jun 2021",
    points: [
      "Built 20+ production React components for a tuition-booking platform, including a teacher discovery page with real-time availability filtering serving 5K+ monthly users.",
      "Designed and maintained a TypeScript + SCSS component library (buttons, modals, form controls, calendars) standardised across 15+ platform pages.",
      "Migrated custom in-house auth to Firebase Authentication, reducing login-related support tickets by 40% and eliminating session expiry edge cases.",
      "Implemented lazy-loaded route splitting and skeleton screens, reducing initial bundle size by 35% and improving perceived load time significantly.",
      "Collaborated with the backend team to design RESTful API contracts and integrated booking, payment status, and tutor rating endpoints into the React frontend.",
    ],
  },
];

const projects = [
  {
    name: "ViralCut ✂️",
    description:
      "AI-powered viral short-form video editor. Automatically detects highlight moments, auto-captions clips, and exports platform-ready content for TikTok, Reels & YouTube Shorts. Built with React and deployed on Vercel.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "AI/ML", color: "green-text-gradient" },
      { name: "Node.js", color: "pink-text-gradient" },
      { name: "Vercel", color: "blue-text-gradient" },
    ],
    themeKey: "viralcut",
    source_code_link: "https://github.com/Dipanshu-js/ViralCut",
    live_project_link: "https://viralcut-tau.vercel.app",
  },
  {
    name: "DocuMind AI 🧠",
    description:
      "RAG-powered document intelligence platform. Upload PDFs, research papers, or contracts — ask questions in natural language and get cited, accurate answers instantly. Built with LangChain, ChromaDB, and Next.js.",
    tags: [
      { name: "LangChain", color: "green-text-gradient" },
      { name: "OpenAI", color: "blue-text-gradient" },
      { name: "Next.js", color: "pink-text-gradient" },
      { name: "Python", color: "green-text-gradient" },
    ],
    themeKey: "documind",
    source_code_link: "",
    live_project_link: "",
  },
  {
    name: "IoT Command Center 📡",
    description:
      "Real-time IoT monitoring dashboard tracking 100+ smart devices via MQTT over AWS IoT Core WebSockets. Includes live sensor charts, alert thresholds, multi-tenant access, and automated PDF reports.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "AWS IoT", color: "green-text-gradient" },
      { name: "Redux", color: "pink-text-gradient" },
      { name: "Node.js", color: "blue-text-gradient" },
    ],
    themeKey: "iot",
    source_code_link: "",
    live_project_link: "",
  },
  {
    name: "ExamPro Platform 📝",
    description:
      "Full-featured online examination system with live proctoring, auto-submit with grace timer, rich-text question builder, CSV bulk import, real-time student monitoring, and automated scoring — built for 500+ concurrent users.",
    tags: [
      { name: "Node.js", color: "blue-text-gradient" },
      { name: "Firebase", color: "green-text-gradient" },
      { name: "MongoDB", color: "pink-text-gradient" },
      { name: "React", color: "blue-text-gradient" },
    ],
    themeKey: "exam",
    source_code_link: "",
    live_project_link: "",
  },
  {
    name: "AI Agent Workflow 🤖",
    description:
      "Multi-agent orchestration system using LangGraph that automates content generation pipelines. Agents collaborate to research, draft, review, and publish content — reducing turnaround from 4 hours to under 10 minutes.",
    tags: [
      { name: "LangGraph", color: "green-text-gradient" },
      { name: "OpenAI", color: "blue-text-gradient" },
      { name: "Python", color: "pink-text-gradient" },
      { name: "FastAPI", color: "green-text-gradient" },
    ],
    themeKey: "agent",
    source_code_link: "",
    live_project_link: "",
  },
];

export { services, experiences, projects, education };
