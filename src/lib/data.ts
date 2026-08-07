// Realistic dummy data for the CampuSphere frontend prototype.

export type Event = {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  prize: string;
  date: string;
  startsAt: string;
  time: string;
  venue: string;
  seatsLeft: number;
  seatsTotal: number;
  participants: number;
  organizer: { name: string; club: string; email: string };
  gradient: string;
  emoji: string;
  gallery: string[];
  agenda: { time: string; title: string }[];
  discussion: { user: string; message: string; ago: string }[];
  tags: string[];
};

const inDays = (d: number, h = 18) => {
  const dt = new Date(2026, 6, 29 + d, h, 30, 0);
  return dt.toISOString();
};

export const events: Event[] = [
  {
    id: "hackspire-2026",
    title: "HackSpire 2026",
    category: "Hackathon",
    tagline: "36 hours. One idea. Infinite impact.",
    description:
      "The flagship inter-university hackathon returns. Build with AI, robotics or fintech tracks, get mentored by engineers from top product companies, and pitch to a live jury on demo day.",
    prize: "₹3,50,000",
    date: "Aug 07, 2026",
    startsAt: inDays(9, 9),
    time: "09:00 AM – 09:00 PM",
    venue: "Innovation Arena, Block C",
    seatsLeft: 64,
    seatsTotal: 500,
    participants: 436,
    organizer: {
      name: "Ananya Rao",
      club: "Coding Club",
      email: "hackspire@campusphere.edu",
    },
    gradient: "from-brand via-violet to-cyan",
    emoji: "⚡",
    gallery: ["Opening keynote", "Mentor round", "Demo day", "Winners"],
    agenda: [
      { time: "09:00", title: "Check-in & team formation" },
      { time: "10:30", title: "Problem statements go live" },
      { time: "16:00", title: "Mentor review round 1" },
      { time: "20:00", title: "Final pitch & jury" },
    ],
    discussion: [
      { user: "Rohit S.", message: "Looking for a frontend dev for the AI track!", ago: "2h" },
      { user: "Meera K.", message: "Is the hardware track providing kits?", ago: "5h" },
      { user: "Ananya Rao", message: "Yes — Arduino + sensor kits provided on site.", ago: "4h" },
    ],
    tags: ["AI", "Fintech", "Robotics", "Team of 4"],
  },
  {
    id: "resonance-night",
    title: "Resonance – Cultural Night",
    category: "Cultural",
    tagline: "The campus comes alive after dark.",
    description:
      "An evening of live bands, classical fusion, dance crews and a headline set from the university's own alumni artists. Open to all departments.",
    prize: "₹75,000",
    date: "Aug 02, 2026",
    startsAt: inDays(4, 18),
    time: "06:30 PM – 11:00 PM",
    venue: "Open Air Amphitheatre",
    seatsLeft: 212,
    seatsTotal: 1200,
    participants: 988,
    organizer: { name: "Kabir Menon", club: "Cultural Council", email: "resonance@campusphere.edu" },
    gradient: "from-violet via-brand to-warning",
    emoji: "🎶",
    gallery: ["Band setup", "Dance crew", "Light show", "Finale"],
    agenda: [
      { time: "18:30", title: "Doors open" },
      { time: "19:15", title: "Fusion orchestra" },
      { time: "21:00", title: "Headline set" },
    ],
    discussion: [{ user: "Isha P.", message: "Are outside guests allowed?", ago: "1d" }],
    tags: ["Music", "Dance", "Open to all"],
  },
  {
    id: "ai-summit",
    title: "Applied AI Summit",
    category: "Tech Talk",
    tagline: "From research papers to production systems.",
    description:
      "A single-day summit with practitioners covering LLM evaluation, on-device inference and responsible AI deployment in Indian universities.",
    prize: "Certificates + Internship shortlist",
    date: "Aug 12, 2026",
    startsAt: inDays(14, 10),
    time: "10:00 AM – 05:00 PM",
    venue: "Auditorium 2, Block A",
    seatsLeft: 18,
    seatsTotal: 300,
    participants: 282,
    organizer: { name: "Dr. Vikram Iyer", club: "AI Research Lab", email: "aisummit@campusphere.edu" },
    gradient: "from-cyan via-brand to-violet",
    emoji: "🧠",
    gallery: ["Keynote", "Panel", "Poster session", "Networking"],
    agenda: [
      { time: "10:00", title: "Keynote: LLMs in the wild" },
      { time: "13:00", title: "Panel: Responsible AI" },
      { time: "15:30", title: "Poster session" },
    ],
    discussion: [{ user: "Tanmay G.", message: "Will sessions be recorded?", ago: "3h" }],
    tags: ["LLM", "Research", "Industry"],
  },
  {
    id: "startup-pitch",
    title: "Founders' Pitch Day",
    category: "Entrepreneurship",
    tagline: "Six minutes to change your trajectory.",
    description:
      "Student founders pitch to a panel of angel investors and the university incubation cell. Top three teams receive seed grants and a 6-month incubation slot.",
    prize: "₹2,00,000 seed grant",
    date: "Aug 19, 2026",
    startsAt: inDays(21, 11),
    time: "11:00 AM – 04:00 PM",
    venue: "Incubation Centre, Block D",
    seatsLeft: 40,
    seatsTotal: 120,
    participants: 80,
    organizer: { name: "Neha Bansal", club: "E-Cell", email: "ecell@campusphere.edu" },
    gradient: "from-warning via-destructive to-violet",
    emoji: "🚀",
    gallery: ["Pitch stage", "Investor panel", "Mentor lounge", "Award"],
    agenda: [
      { time: "11:00", title: "Shortlist announcement" },
      { time: "12:00", title: "Pitch rounds" },
      { time: "15:30", title: "Grant announcement" },
    ],
    discussion: [{ user: "Arjun D.", message: "Can first-years apply solo?", ago: "6h" }],
    tags: ["Startup", "Investors", "Grant"],
  },
  {
    id: "photowalk",
    title: "Golden Hour Photowalk",
    category: "Workshop",
    tagline: "Light, composition and the campus at dusk.",
    description:
      "A hands-on photowalk across the heritage quad led by the Photography Society, followed by a live editing clinic.",
    prize: "Featured in campus annual",
    date: "Jul 31, 2026",
    startsAt: inDays(2, 17),
    time: "05:00 PM – 07:30 PM",
    venue: "Heritage Quad",
    seatsLeft: 6,
    seatsTotal: 40,
    participants: 34,
    organizer: { name: "Sara Fernandes", club: "Photography Society", email: "photo@campusphere.edu" },
    gradient: "from-warning via-violet to-brand",
    emoji: "📸",
    gallery: ["Quad", "Portraits", "Editing clinic", "Print wall"],
    agenda: [
      { time: "17:00", title: "Briefing & gear check" },
      { time: "17:45", title: "Walk begins" },
      { time: "19:00", title: "Editing clinic" },
    ],
    discussion: [{ user: "Dev M.", message: "Phone cameras welcome?", ago: "12h" }],
    tags: ["Photography", "Beginner friendly"],
  },
  {
    id: "sports-meet",
    title: "Inter-Hostel Sports Meet",
    category: "Sports",
    tagline: "Twelve hostels. One trophy.",
    description:
      "Track, football, basketball and the legendary hostel relay. Register as an athlete or come cheer with your block.",
    prize: "Rolling Trophy + ₹50,000",
    date: "Aug 24, 2026",
    startsAt: inDays(26, 7),
    time: "07:00 AM – 06:00 PM",
    venue: "Central Sports Complex",
    seatsLeft: 310,
    seatsTotal: 800,
    participants: 490,
    organizer: { name: "Coach Rathore", club: "Sports Board", email: "sports@campusphere.edu" },
    gradient: "from-success via-cyan to-brand",
    emoji: "🏆",
    gallery: ["Track", "Football final", "Relay", "Trophy"],
    agenda: [
      { time: "07:00", title: "Track heats" },
      { time: "11:00", title: "Football semifinals" },
      { time: "16:00", title: "Hostel relay" },
    ],
    discussion: [{ user: "Priya N.", message: "Relay team registrations open?", ago: "8h" }],
    tags: ["Athletics", "Hostel", "Team"],
  },
];

export type Club = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  about: string;
  mission: string;
  members: number;
  recruiting: boolean;
  coordinator: string;
  leads: { name: string; role: string }[];
  achievements: string[];
  gallery: string[];
  upcoming: string[];
  past: string[];
  socials: { label: string; handle: string }[];
  gradient: string;
  emoji: string;
};

export const clubs: Club[] = [
  {
    id: "coding-club",
    name: "Coding Club",
    category: "Technology",
    tagline: "Ship something every week.",
    about:
      "A builder-first community running weekly contests, open-source sprints and interview prep circles across all four years.",
    mission: "Make every student on campus confident enough to build and ship real software.",
    members: 1240,
    recruiting: true,
    coordinator: "Dr. Vikram Iyer",
    leads: [
      { name: "Ananya Rao", role: "President" },
      { name: "Rohit Sharma", role: "Tech Lead" },
      { name: "Fatima Khan", role: "Community Lead" },
    ],
    achievements: [
      "ICPC Regionals — Rank 4 (2025)",
      "Smart India Hackathon winners, two tracks",
      "312 open-source PRs merged in Hacktoberfest",
    ],
    gallery: ["Weekly contest", "OSS sprint", "Hack night", "Alumni AMA"],
    upcoming: ["HackSpire 2026", "DSA Bootcamp Cohort 7"],
    past: ["CodeStorm 5.0", "Git & GitHub Crash Course"],
    socials: [
      { label: "GitHub", handle: "@campusphere-coding" },
      { label: "Discord", handle: "codingclub" },
    ],
    gradient: "from-brand to-cyan",
    emoji: "💻",
  },
  {
    id: "robotics",
    name: "Robotics Society",
    category: "Technology",
    tagline: "We build things that move.",
    about:
      "From line followers to autonomous rovers, the Robotics Society runs a fully equipped lab open six days a week.",
    mission: "Give every student hands-on access to real hardware, not just simulations.",
    members: 480,
    recruiting: true,
    coordinator: "Prof. Meenakshi Nair",
    leads: [
      { name: "Aditya Verma", role: "Captain" },
      { name: "Nikita Joshi", role: "Design Head" },
    ],
    achievements: ["Robocon national finalists 2025", "Two published papers on SLAM"],
    gallery: ["Rover build", "Lab night", "Robocon", "Workshop"],
    upcoming: ["Autonomous Rover Sprint"],
    past: ["LineFollow Championship", "PCB Design 101"],
    socials: [{ label: "Instagram", handle: "@cs.robotics" }],
    gradient: "from-violet to-brand",
    emoji: "🤖",
  },
  {
    id: "cultural-council",
    name: "Cultural Council",
    category: "Arts",
    tagline: "The heartbeat of campus nights.",
    about:
      "Music, theatre, dance and spoken word — the Council produces the university's biggest cultural showcases.",
    mission: "Give every artist on campus a stage worth stepping onto.",
    members: 960,
    recruiting: false,
    coordinator: "Dr. Leela Menon",
    leads: [
      { name: "Kabir Menon", role: "Convener" },
      { name: "Riya Das", role: "Production Head" },
    ],
    achievements: ["Resonance drew 4,200 attendees", "Best campus fest — State Arts Council"],
    gallery: ["Stage design", "Theatre night", "Fusion set", "Backstage"],
    upcoming: ["Resonance – Cultural Night"],
    past: ["Monologue Mondays", "Rangmanch Theatre Fest"],
    socials: [{ label: "Instagram", handle: "@cs.cultural" }],
    gradient: "from-violet to-warning",
    emoji: "🎭",
  },
  {
    id: "e-cell",
    name: "Entrepreneurship Cell",
    category: "Business",
    tagline: "From dorm room to demo day.",
    about:
      "E-Cell runs the campus incubator, investor office hours and a founders' residency each semester.",
    mission: "Turn student ideas into funded, functioning companies before graduation.",
    members: 620,
    recruiting: true,
    coordinator: "Prof. Sandeep Kulkarni",
    leads: [
      { name: "Neha Bansal", role: "President" },
      { name: "Yash Patel", role: "Incubation Lead" },
    ],
    achievements: ["9 startups incubated", "₹1.2 Cr raised by alumni ventures"],
    gallery: ["Pitch day", "Investor AMA", "Residency", "Founder panel"],
    upcoming: ["Founders' Pitch Day"],
    past: ["Idea Sprint", "Unit Economics Workshop"],
    socials: [{ label: "LinkedIn", handle: "campusphere-ecell" }],
    gradient: "from-warning to-destructive",
    emoji: "🚀",
  },
  {
    id: "photography",
    name: "Photography Society",
    category: "Arts",
    tagline: "Seeing campus differently.",
    about: "Photowalks, darkroom sessions and the annual print exhibition in the heritage quad.",
    mission: "Document campus life honestly and beautifully.",
    members: 340,
    recruiting: true,
    coordinator: "Ms. Ritu Saxena",
    leads: [{ name: "Sara Fernandes", role: "Lead" }],
    achievements: ["National Geographic student feature", "Annual print show — 3,000 visitors"],
    gallery: ["Golden hour", "Portrait day", "Darkroom", "Exhibition"],
    upcoming: ["Golden Hour Photowalk"],
    past: ["Monsoon Frames", "Street Photography 101"],
    socials: [{ label: "Instagram", handle: "@cs.frames" }],
    gradient: "from-cyan to-violet",
    emoji: "📷",
  },
  {
    id: "debate",
    name: "Debate & Literary Society",
    category: "Literary",
    tagline: "Arguments, sharpened.",
    about: "Parliamentary debate, MUN delegations and a weekly writers' room.",
    mission: "Make persuasive, careful thinking a campus habit.",
    members: 410,
    recruiting: false,
    coordinator: "Dr. Aparna Ghosh",
    leads: [{ name: "Imran Qureshi", role: "Secretary" }],
    achievements: ["Best delegation — National MUN 2025", "Inter-university debate champions"],
    gallery: ["MUN", "Debate finals", "Writers' room", "Open mic"],
    upcoming: ["Monsoon Parliamentary Open"],
    past: ["MUN 2025", "Poetry Slam"],
    socials: [{ label: "X", handle: "@cs_debate" }],
    gradient: "from-brand to-violet",
    emoji: "🗣️",
  },
];

export type Session = {
  id: string;
  title: string;
  faculty: string;
  department: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  sessions: number;
  duration: string;
  enrolled: number;
  rating: number;
  schedule: string;
  emoji: string;
  gradient: string;
  outcomes: string[];
};

export const skillSessions: Session[] = [
  {
    id: "applied-ai",
    title: "Applied AI: Build with LLMs",
    faculty: "Dr. Vikram Iyer",
    department: "Computer Science",
    category: "AI",
    level: "Intermediate",
    sessions: 8,
    duration: "12h",
    enrolled: 486,
    rating: 4.9,
    schedule: "Tue & Thu · 5:00 PM",
    emoji: "🧠",
    gradient: "from-brand to-violet",
    outcomes: ["Prompt patterns", "RAG pipelines", "Evaluation & guardrails"],
  },
  {
    id: "fullstack",
    title: "Modern Full-Stack Web Development",
    faculty: "Prof. Anil Kapoor",
    department: "Information Technology",
    category: "Web Development",
    level: "Beginner",
    sessions: 10,
    duration: "18h",
    enrolled: 812,
    rating: 4.8,
    schedule: "Mon & Wed · 6:00 PM",
    emoji: "🌐",
    gradient: "from-cyan to-brand",
    outcomes: ["React + TypeScript", "APIs & auth", "Deploying to production"],
  },
  {
    id: "dsa-mastery",
    title: "DSA Mastery for Placements",
    faculty: "Dr. Shalini Reddy",
    department: "Computer Science",
    category: "DSA",
    level: "Advanced",
    sessions: 14,
    duration: "24h",
    enrolled: 1204,
    rating: 4.9,
    schedule: "Sat · 10:00 AM",
    emoji: "🧩",
    gradient: "from-violet to-brand",
    outcomes: ["Graphs & DP", "Contest strategy", "Mock interviews"],
  },
  {
    id: "cloud-native",
    title: "Cloud Native Foundations",
    faculty: "Prof. Rajeev Menon",
    department: "Computer Science",
    category: "Cloud",
    level: "Intermediate",
    sessions: 6,
    duration: "10h",
    enrolled: 342,
    rating: 4.7,
    schedule: "Fri · 4:00 PM",
    emoji: "☁️",
    gradient: "from-cyan to-success",
    outcomes: ["Containers", "CI/CD", "Observability"],
  },
  {
    id: "photography-craft",
    title: "Photography: Light & Story",
    faculty: "Ms. Ritu Saxena",
    department: "Design",
    category: "Photography",
    level: "Beginner",
    sessions: 5,
    duration: "8h",
    enrolled: 198,
    rating: 4.8,
    schedule: "Sun · 5:00 PM",
    emoji: "📸",
    gradient: "from-warning to-violet",
    outcomes: ["Exposure triangle", "Composition", "Editing workflow"],
  },
  {
    id: "research-methods",
    title: "Research Methods & Paper Writing",
    faculty: "Dr. Aparna Ghosh",
    department: "Humanities",
    category: "Research",
    level: "Advanced",
    sessions: 7,
    duration: "11h",
    enrolled: 276,
    rating: 4.6,
    schedule: "Wed · 3:00 PM",
    emoji: "📚",
    gradient: "from-brand to-cyan",
    outcomes: ["Literature review", "Methodology", "Journal submission"],
  },
  {
    id: "public-speaking",
    title: "Public Speaking & Stage Presence",
    faculty: "Dr. Leela Menon",
    department: "Humanities",
    category: "Communication",
    level: "Beginner",
    sessions: 6,
    duration: "9h",
    enrolled: 524,
    rating: 4.9,
    schedule: "Thu · 6:30 PM",
    emoji: "🎤",
    gradient: "from-violet to-warning",
    outcomes: ["Structure a talk", "Voice & pacing", "Handling Q&A"],
  },
  {
    id: "product-comm",
    title: "Professional Communication at Work",
    faculty: "Prof. Sandeep Kulkarni",
    department: "Management",
    category: "Communication",
    level: "Intermediate",
    sessions: 5,
    duration: "7h",
    enrolled: 388,
    rating: 4.7,
    schedule: "Tue · 7:00 PM",
    emoji: "✍️",
    gradient: "from-success to-cyan",
    outcomes: ["Written clarity", "Stakeholder updates", "Interview framing"],
  },
];

export type Mentor = {
  id: string;
  name: string;
  year: string;
  branch: string;
  headline: string;
  skills: string[];
  rating: number;
  sessionsDone: number;
  responseTime: string;
  available: boolean;
  emoji: string;
};

export const mentors: Mentor[] = [
  {
    id: "ananya",
    name: "Ananya Rao",
    year: "Final Year",
    branch: "Computer Science",
    headline: "SDE intern at a global product company. Ask me about system design.",
    skills: ["DSA", "System Design", "Interview", "React"],
    rating: 4.9,
    sessionsDone: 142,
    responseTime: "~2h",
    available: true,
    emoji: "🌟",
  },
  {
    id: "rohit",
    name: "Rohit Sharma",
    year: "Third Year",
    branch: "Information Technology",
    headline: "Open-source maintainer. Frontend, TypeScript and shipping fast.",
    skills: ["React", "TypeScript", "Open Source", "Coding"],
    rating: 4.8,
    sessionsDone: 96,
    responseTime: "~4h",
    available: true,
    emoji: "⚙️",
  },
  {
    id: "neha",
    name: "Neha Bansal",
    year: "Final Year",
    branch: "Management",
    headline: "Founded two campus startups. Resume, pitching and internships.",
    skills: ["Resume", "Interview", "Startup", "Communication"],
    rating: 4.9,
    sessionsDone: 118,
    responseTime: "~1h",
    available: false,
    emoji: "🚀",
  },
  {
    id: "aditya",
    name: "Aditya Verma",
    year: "Third Year",
    branch: "Mechanical",
    headline: "Robocon finalist. CAD, embedded systems and hardware projects.",
    skills: ["Robotics", "Embedded", "CAD"],
    rating: 4.7,
    sessionsDone: 63,
    responseTime: "~6h",
    available: true,
    emoji: "🤖",
  },
  {
    id: "fatima",
    name: "Fatima Khan",
    year: "Second Year",
    branch: "Computer Science",
    headline: "Data science and ML competitions. Great for first-year starters.",
    skills: ["Python", "Machine Learning", "Coding"],
    rating: 4.8,
    sessionsDone: 51,
    responseTime: "~3h",
    available: true,
    emoji: "📊",
  },
  {
    id: "imran",
    name: "Imran Qureshi",
    year: "Final Year",
    branch: "Humanities",
    headline: "MUN best delegate. Communication, writing and interview presence.",
    skills: ["Communication", "Interview", "Writing"],
    rating: 4.9,
    sessionsDone: 87,
    responseTime: "~5h",
    available: true,
    emoji: "🗣️",
  },
];

export type Material = {
  id: string;
  title: string;
  type: "Notes" | "PDF" | "Video" | "Paper";
  subject: string;
  author: string;
  size: string;
  progress: number;
  downloads: number;
  bookmarked: boolean;
  emoji: string;
};

export const materials: Material[] = [
  { id: "m1", title: "Operating Systems — Complete Notes", type: "Notes", subject: "OS", author: "Dr. Shalini Reddy", size: "4.2 MB", progress: 72, downloads: 3120, bookmarked: true, emoji: "🖥️" },
  { id: "m2", title: "DBMS Previous Year Papers (2019–2025)", type: "Paper", subject: "DBMS", author: "Exam Cell", size: "8.9 MB", progress: 30, downloads: 5402, bookmarked: true, emoji: "🗄️" },
  { id: "m3", title: "Graph Algorithms Masterclass", type: "Video", subject: "DSA", author: "Dr. Shalini Reddy", size: "1h 48m", progress: 55, downloads: 2210, bookmarked: false, emoji: "🧩" },
  { id: "m4", title: "Computer Networks Handbook", type: "PDF", subject: "CN", author: "Prof. Rajeev Menon", size: "6.1 MB", progress: 12, downloads: 1890, bookmarked: false, emoji: "🌐" },
  { id: "m5", title: "Linear Algebra Crash Notes", type: "Notes", subject: "Maths", author: "Dr. P. Nandakumar", size: "2.4 MB", progress: 100, downloads: 4110, bookmarked: true, emoji: "📐" },
  { id: "m6", title: "Machine Learning Lecture Series", type: "Video", subject: "ML", author: "Dr. Vikram Iyer", size: "6h 20m", progress: 41, downloads: 3780, bookmarked: false, emoji: "🤖" },
  { id: "m7", title: "Digital Electronics Solved Problems", type: "PDF", subject: "DE", author: "Prof. Meenakshi Nair", size: "3.8 MB", progress: 0, downloads: 1420, bookmarked: false, emoji: "🔌" },
  { id: "m8", title: "Compiler Design Question Bank", type: "Paper", subject: "CD", author: "Exam Cell", size: "2.9 MB", progress: 0, downloads: 980, bookmarked: false, emoji: "🛠️" },
];

export const announcements = [
  {
    id: "a1",
    title: "Mid-semester examination schedule released",
    body: "The mid-semester timetable for all departments is now live. Check your slot and seating allocation on the exam portal.",
    author: "Examination Cell",
    tag: "Academics",
    ago: "35m ago",
    priority: "high" as const,
  },
  {
    id: "a2",
    title: "Library extends hours to 2 AM during exam week",
    body: "Central Library and Block B reading rooms will remain open until 2:00 AM from Aug 3 to Aug 18.",
    author: "Central Library",
    tag: "Campus",
    ago: "3h ago",
    priority: "normal" as const,
  },
  {
    id: "a3",
    title: "Placement drive: 14 companies confirmed for August",
    body: "Registrations open Monday. Pre-placement talks begin the same week — attendance is mandatory for eligibility.",
    author: "Training & Placement",
    tag: "Placements",
    ago: "6h ago",
    priority: "high" as const,
  },
  {
    id: "a4",
    title: "Shuttle route change: Gate 2 under maintenance",
    body: "Campus shuttles will use Gate 4 until further notice. Add five minutes to your commute.",
    author: "Campus Operations",
    tag: "Campus",
    ago: "1d ago",
    priority: "normal" as const,
  },
  {
    id: "a5",
    title: "Research grant applications close Aug 15",
    body: "Undergraduate research grants of up to ₹1,00,000 are open for proposals across all departments.",
    author: "Research Office",
    tag: "Research",
    ago: "2d ago",
    priority: "normal" as const,
  },
];

export const classes = [
  { id: "c1", code: "CS-402", name: "Distributed Systems", time: "09:00 – 09:55", room: "Block A · 204", faculty: "Dr. Vikram Iyer", status: "done" as const },
  { id: "c2", code: "CS-411", name: "Machine Learning Lab", time: "10:15 – 12:05", room: "Block C · Lab 3", faculty: "Dr. Shalini Reddy", status: "live" as const },
  { id: "c3", code: "MA-301", name: "Probability & Statistics", time: "13:00 – 13:55", room: "Block A · 108", faculty: "Dr. P. Nandakumar", status: "next" as const },
  { id: "c4", code: "HS-210", name: "Professional Communication", time: "15:00 – 15:55", room: "Block B · 011", faculty: "Prof. Sandeep Kulkarni", status: "upcoming" as const },
];

export const deadlines = [
  { id: "d1", title: "ML Lab Assignment 4", course: "CS-411", due: "Tomorrow, 11:59 PM", urgency: "high" as const },
  { id: "d2", title: "Distributed Systems Paper Review", course: "CS-402", due: "In 3 days", urgency: "medium" as const },
  { id: "d3", title: "Statistics Problem Set 6", course: "MA-301", due: "In 5 days", urgency: "low" as const },
  { id: "d4", title: "Communication Presentation Draft", course: "HS-210", due: "Next Monday", urgency: "low" as const },
];

export const activity = [
  { id: "r1", text: "You registered for Applied AI Summit", ago: "2h ago", kind: "event" as const },
  { id: "r2", text: "Rohit Sharma accepted your mentorship request", ago: "5h ago", kind: "mentor" as const },
  { id: "r3", text: "Completed 3 modules in DSA Mastery", ago: "Yesterday", kind: "learning" as const },
  { id: "r4", text: "Coding Club posted a new open-source sprint", ago: "Yesterday", kind: "club" as const },
  { id: "r5", text: "Downloaded Operating Systems — Complete Notes", ago: "2 days ago", kind: "material" as const },
];

export const campusPlaces = [
  { id: "p1", name: "Block A — Academic", type: "Academic", floors: 5, open: "07:00 – 21:00", x: 22, y: 30, walk: "3 min" },
  { id: "p2", name: "Block C — Innovation Arena", type: "Labs", floors: 4, open: "24 hours", x: 62, y: 22, walk: "6 min" },
  { id: "p3", name: "Central Library", type: "Library", floors: 3, open: "08:00 – 02:00", x: 44, y: 52, walk: "4 min" },
  { id: "p4", name: "Open Air Amphitheatre", type: "Events", floors: 1, open: "Event days", x: 76, y: 62, walk: "9 min" },
  { id: "p5", name: "Central Sports Complex", type: "Sports", floors: 2, open: "05:30 – 22:00", x: 18, y: 72, walk: "11 min" },
  { id: "p6", name: "Food Court & Cafés", type: "Dining", floors: 2, open: "07:30 – 23:00", x: 52, y: 78, walk: "5 min" },
  { id: "p7", name: "Incubation Centre — Block D", type: "Startup", floors: 3, open: "09:00 – 20:00", x: 84, y: 34, walk: "8 min" },
  { id: "p8", name: "Hostel Circle", type: "Residence", floors: 8, open: "24 hours", x: 32, y: 14, walk: "12 min" },
];

export const student = {
  name: "Aarav Sharma",
  initials: "AS",
  roll: "CS22B1043",
  branch: "Computer Science & Engineering",
  year: "Third Year · Semester 6",
  cgpa: 8.72,
  attendance: 91,
  credits: 132,
  email: "aarav.sharma@campusphere.edu",
  bio: "Third-year CSE student building AI tooling. Coding Club tech team, HackSpire finalist, currently obsessed with distributed systems.",
  skills: ["React", "TypeScript", "Python", "PyTorch", "PostgreSQL", "Docker", "System Design"],
  badges: ["Hack Finalist", "Top Mentor Mentee", "100-Day Streak", "Open Source"],
  projects: [
    { name: "LectureLens", desc: "AI summariser for recorded lectures, used by 400+ students.", stack: "Next.js · Whisper" },
    { name: "HostelMess", desc: "Menu voting and food-waste analytics for four hostels.", stack: "React · Supabase" },
    { name: "PaperTrail", desc: "Search engine for previous-year question papers.", stack: "FastAPI · pgvector" },
  ],
  certificates: [
    { name: "Deep Learning Specialisation", issuer: "Campus AI Lab", year: "2025" },
    { name: "Cloud Native Foundations", issuer: "CampuSphere Skill Hub", year: "2026" },
    { name: "Advanced DSA", issuer: "Coding Club", year: "2025" },
  ],
};

export const faculty = {
  name: "Dr. Vikram Iyer",
  initials: "VI",
  title: "Associate Professor, Computer Science",
  email: "vikram.iyer@campusphere.edu",
  office: "Block A · 412",
  hours: "Mon & Wed · 2:00 – 4:00 PM",
  bio: "Researches distributed machine learning systems. Runs the campus AI Research Lab and mentors the Coding Club.",
  interests: ["Distributed ML", "LLM evaluation", "Edge inference", "Systems education"],
  publications: 47,
  citations: 2130,
  students: 6,
};

export const weekActivity = [
  { day: "Mon", hours: 3.2, events: 1 },
  { day: "Tue", hours: 4.1, events: 2 },
  { day: "Wed", hours: 2.6, events: 0 },
  { day: "Thu", hours: 5.4, events: 3 },
  { day: "Fri", hours: 3.9, events: 1 },
  { day: "Sat", hours: 6.2, events: 2 },
  { day: "Sun", hours: 2.1, events: 0 },
];

export const learningProgress = [
  { name: "DSA Mastery", value: 68, color: "var(--color-chart-1)" },
  { name: "Applied AI", value: 42, color: "var(--color-chart-2)" },
  { name: "Cloud Native", value: 85, color: "var(--color-chart-3)" },
];

/** Skill Hub enrolments — learning progress is tied to enrolled faculty sessions. */
export const enrolledSessions = [
  { sessionId: "dsa-mastery", completed: 8, lastActivity: "Yesterday" },
  { sessionId: "applied-ai", completed: 3, lastActivity: "2 days ago" },
  { sessionId: "cloud-native", completed: 5, lastActivity: "Today" },
  { sessionId: "public-speaking", completed: 1, lastActivity: "Last week" },
];


export const adminStats = [
  { label: "Active students", value: "18,420", delta: "+4.2%" },
  { label: "Events this month", value: "126", delta: "+18%" },
  { label: "Club memberships", value: "9,318", delta: "+6.9%" },
  { label: "Skill Hub enrolments", value: "4,231", delta: "+11%" },
];

export const departmentSplit = [
  { name: "Engineering", value: 8200 },
  { name: "Sciences", value: 3400 },
  { name: "Management", value: 2600 },
  { name: "Humanities", value: 2100 },
  { name: "Design", value: 2120 },
];

export const news = [
  { id: "n1", title: "CampuSphere wins national ed-tech innovation award", source: "University Press", ago: "1d" },
  { id: "n2", title: "New 400-seat innovation wing opens in Block C", source: "Campus Today", ago: "2d" },
  { id: "n3", title: "Alumni fund launches ₹5 Cr student research corpus", source: "Alumni Office", ago: "4d" },
];
