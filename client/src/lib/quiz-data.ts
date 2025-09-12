export type QuizOption = {
  text: string;
  stream: string;
};

export type QuizQuestion = {
  question: string;
  options: QuizOption[];
};

// Class 10 Quiz Questions (Fun, kid-friendly)
export const class10QuizData: QuizQuestion[] = [
  {
    question: "Which subject do you enjoy most? 📚",
    options: [
      { text: "Science 🧪 - I love experiments and discoveries!", stream: "Science" },
      { text: "Math 🔢 - Numbers and puzzles are fun!", stream: "Science" },
      { text: "History 🏛️ - Stories from the past fascinate me!", stream: "Arts" },
      { text: "English 📖 - Reading and writing excite me!", stream: "Creative" },
      { text: "Art 🎨 - I love drawing and being creative!", stream: "Creative" },
    ],
  },
  {
    question: "What do you like doing in your free time? 🎮",
    options: [
      { text: "Build things 🔧 - Making models, gadgets, or crafts", stream: "Science" },
      { text: "Read books 📚 - Adventure, mystery, or fantasy stories", stream: "Arts" },
      { text: "Draw or paint 🎨 - Creating beautiful artwork", stream: "Creative" },
      { text: "Solve puzzles 🧩 - Brain teasers and logic games", stream: "Science" },
      { text: "Organize events 🎉 - Planning parties or group activities", stream: "Commerce" },
    ],
  },
  {
    question: "Who inspires you most? 🌟",
    options: [
      { text: "Scientists 🔬 - Like Einstein, Newton, or Kalam!", stream: "Science" },
      { text: "Entrepreneurs 💼 - Like Steve Jobs or Ratan Tata!", stream: "Commerce" },
      { text: "Leaders 🏛️ - Like Gandhi, or great politicians!", stream: "Social" },
      { text: "Artists 🎭 - Like painters, actors, or musicians!", stream: "Creative" },
      { text: "Teachers 👨‍🏫 - People who help others learn!", stream: "Social" },
    ],
  },
  {
    question: "What excites you the most? ⚡",
    options: [
      { text: "Experiments 🧪 - Mixing chemicals or trying new things!", stream: "Science" },
      { text: "Business ideas 💡 - Thinking of ways to make money!", stream: "Commerce" },
      { text: "Storytelling 📖 - Writing stories or making videos!", stream: "Creative" },
      { text: "Helping people 🤝 - Making others happy or solving their problems!", stream: "Social" },
      { text: "Designing 🎨 - Creating beautiful things that others will love!", stream: "Creative" },
    ],
  },
  {
    question: "How do you like learning? 🎓",
    options: [
      { text: "Visual 👀 - Pictures, videos, and colorful diagrams!", stream: "Creative" },
      { text: "Hands-on 🙌 - Touching, building, and trying things myself!", stream: "Science" },
      { text: "Reading 📚 - Books, stories, and written explanations!", stream: "Arts" },
      { text: "Group discussions 👥 - Talking and sharing ideas with friends!", stream: "Social" },
      { text: "Projects 📋 - Working on assignments and presentations!", stream: "Commerce" },
    ],
  },
  {
    question: "If you could choose a dream job, what would it be? 💭",
    options: [
      { text: "Doctor 👩‍⚕️ - Helping sick people get better!", stream: "Science" },
      { text: "Business Owner 💼 - Having my own company!", stream: "Commerce" },
      { text: "Teacher 👨‍🏫 - Teaching kids amazing things!", stream: "Social" },
      { text: "Artist 🎨 - Creating movies, music, or paintings!", stream: "Creative" },
      { text: "Politician 🏛️ - Making important decisions for the country!", stream: "Social" },
    ],
  },
];

// Science Stream Quiz Questions (6 Questions, 4-5 options each)
export const scienceStreamQuizData: QuizQuestion[] = [
  {
    question: "Which subject excites you the most?",
    options: [
      { text: "Physics & Math – Logic & problem-solving", stream: "Science" },
      { text: "Chemistry & Biology – Life & matter", stream: "Science" },
      { text: "Computer Science – Coding & AI", stream: "Science" },
      { text: "Environmental Science – Nature & sustainability", stream: "Science" }
    ],
  },
  {
    question: "What activity excites you most in daily life?",
    options: [
      { text: "Conducting experiments", stream: "Science" },
      { text: "Solving puzzles or algorithms", stream: "Science" },
      { text: "Flying drones or simulations", stream: "Science" },
      { text: "Exploring oceans/labs", stream: "Science" }
    ],
  },
  {
    question: "What kind of work environment suits you best?",
    options: [
      { text: "Lab or research institute", stream: "Science" },
      { text: "Tech company/startup", stream: "Science" },
      { text: "Air/sea operations", stream: "Science" },
      { text: "Field & nature", stream: "Science" }
    ],
  },
  {
    question: "Which factor matters most in choosing a career?",
    options: [
      { text: "Innovation & discovery", stream: "Science" },
      { text: "Helping people", stream: "Science" },
      { text: "Leadership & responsibility", stream: "Science" },
      { text: "Adventure & exploration", stream: "Science" }
    ],
  },
  {
    question: "What describes your problem-solving style?",
    options: [
      { text: "Analytical & logical", stream: "Science" },
      { text: "Hands-on experimentation", stream: "Science" },
      { text: "Creative tech solutions", stream: "Science" },
      { text: "Strategic & operational", stream: "Science" }
    ],
  },
  {
    question: "Your dream profession is?",
    options: [
      { text: "Doctor", stream: "Science" },
      { text: "Engineer", stream: "Science" },
      { text: "Explorer", stream: "Science" },
      { text: "Tech Innovator", stream: "Science" }
    ],
  }
];

// Commerce Stream Quiz Questions (6 Questions, 4 options each)
export const commerceStreamQuizData: QuizQuestion[] = [
  {
    question: "Which subject do you enjoy the most?",
    options: [
      { text: "Accounts & Economics", stream: "Commerce" },
      { text: "Business Studies", stream: "Commerce" },
      { text: "Marketing & Strategy", stream: "Commerce" },
      { text: "Maths & Data Analysis", stream: "Commerce" }
    ],
  },
  {
    question: "Your ideal work activity?",
    options: [
      { text: "Managing finances", stream: "Commerce" },
      { text: "Running a company", stream: "Commerce" },
      { text: "Research & planning", stream: "Commerce" },
      { text: "Creative campaigns", stream: "Commerce" }
    ],
  },
  {
    question: "What motivates you most in a career?",
    options: [
      { text: "High income", stream: "Commerce" },
      { text: "Leadership", stream: "Commerce" },
      { text: "Strategic impact", stream: "Commerce" },
      { text: "Creativity", stream: "Commerce" }
    ],
  },
  {
    question: "Preferred work environment?",
    options: [
      { text: "Corporate office", stream: "Commerce" },
      { text: "Startup", stream: "Commerce" },
      { text: "Research institute", stream: "Commerce" },
      { text: "Creative agency", stream: "Commerce" }
    ],
  },
  {
    question: "How do you approach challenges?",
    options: [
      { text: "Analytical", stream: "Commerce" },
      { text: "Risk-taking", stream: "Commerce" },
      { text: "Strategy-driven", stream: "Commerce" },
      { text: "Innovative & creative", stream: "Commerce" }
    ],
  },
  {
    question: "Dream career path?",
    options: [
      { text: "Finance & Accounts", stream: "Commerce" },
      { text: "Business Leadership", stream: "Commerce" },
      { text: "Policy & Governance", stream: "Commerce" },
      { text: "Marketing & Branding", stream: "Commerce" }
    ],
  }
];

// Arts Stream Quiz Questions (6 Questions, 4-5 options each)
export const artsStreamQuizData: QuizQuestion[] = [
  {
    question: "Which subject excites you the most?",
    options: [
      { text: "History & Political Science", stream: "Arts" },
      { text: "Literature & English", stream: "Arts" },
      { text: "Fine Arts & Music", stream: "Creative" },
      { text: "Tourism & Hospitality", stream: "Vocational" }
    ],
  },
  {
    question: "Which activity excites you most?",
    options: [
      { text: "Debates & Public Speaking", stream: "Arts" },
      { text: "Writing & storytelling", stream: "Arts" },
      { text: "Creating art/design", stream: "Creative" },
      { text: "Planning events", stream: "Vocational" }
    ],
  },
  {
    question: "What motivates you in a career?",
    options: [
      { text: "Societal impact", stream: "Arts" },
      { text: "Creativity", stream: "Creative" },
      { text: "Knowledge & teaching", stream: "Arts" },
      { text: "Service & hospitality", stream: "Vocational" }
    ],
  },
  {
    question: "Preferred work environment?",
    options: [
      { text: "Government/Public Office", stream: "Arts" },
      { text: "Studio/Creative agency", stream: "Creative" },
      { text: "Classroom", stream: "Arts" },
      { text: "Hotels & tourism", stream: "Vocational" }
    ],
  },
  {
    question: "Problem-solving style?",
    options: [
      { text: "Logical & strategic", stream: "Arts" },
      { text: "Creative & expressive", stream: "Creative" },
      { text: "Analytical & research-based", stream: "Arts" },
      { text: "Operational & service-oriented", stream: "Vocational" }
    ],
  },
  {
    question: "Dream career?",
    options: [
      { text: "Civil Services", stream: "Arts" },
      { text: "Media & Writing", stream: "Arts" },
      { text: "Arts & Entertainment", stream: "Creative" },
      { text: "Hospitality", stream: "Vocational" }
    ],
  }
];

// Class 11/12 Quiz Questions (Legacy - now points to stream-specific data)
export const class1112QuizData: QuizQuestion[] = scienceStreamQuizData; // Default to Science for backward compatibility

// Legacy quiz for backward compatibility
export const quizData = class1112QuizData;

export const careerStreamInfo = {
  "Science": {
    icon: "Settings",
    gradient: "from-blue-500 to-purple-600",
    description: "You have exceptional logical thinking and problem-solving abilities. Science and technology offer limitless opportunities to innovate and build the future.",
    careers: ["Engineer", "Doctor", "Pilot", "Scientist", "Data Scientist", "Merchant Navy Officer"],
    recommendedExams: ["jee-main", "jee-advanced", "neet-ug", "bitsat", "pilot-entrance"],
    recommendedScholarships: ["inspire", "tata-scholarship", "aditya-birla"]
  },
  "Commerce": {
    icon: "PieChart",
    gradient: "from-emerald-500 to-teal-600",
    description: "Your business acumen and leadership skills position you well for India's expanding corporate landscape and entrepreneurial ecosystem.",
    careers: ["Chartered Accountant", "Investment Banker", "Entrepreneur", "Economist", "Business Manager", "Financial Analyst"],
    recommendedExams: ["cat", "xat", "ca-foundation", "cfa"],
    recommendedScholarships: ["reliance-scholarship", "tata-scholarship", "nsp"]
  },
  "Arts": {
    icon: "BookOpen",
    gradient: "from-purple-500 to-pink-600",
    description: "Your analytical and research skills make you perfect for humanities, law, and social sciences. Shape society through knowledge and policy.",
    careers: ["IAS Officer", "IPS Officer", "Lawyer", "Journalist", "Teacher", "Judge"],
    recommendedExams: ["upsc-cse", "clat", "ugc-net", "state-psc"],
    recommendedScholarships: ["nsp", "maulana-azad", "pmss"]
  },
  "Creative": {
    icon: "Palette",
    gradient: "from-pink-500 to-orange-600",
    description: "Your creative flair and artistic vision make you perfect for India's booming creative economy. Express your ideas and influence culture.",
    careers: ["Architect", "Fashion Designer", "Film Director", "Journalist", "UX Designer", "Photographer"],
    recommendedExams: ["nid-dat", "nift", "jmi-entrance", "ceed"],
    recommendedScholarships: ["nsp", "reliance-scholarship", "cultural-scholarships"]
  },
  "Social": {
    icon: "Heart",
    gradient: "from-green-500 to-emerald-600",
    description: "Your empathy and desire to serve society align perfectly with public service careers. Make a direct impact on millions of lives.",
    careers: ["Psychologist", "Social Worker", "Counselor", "NGO Worker", "Human Rights Activist", "Therapist"],
    recommendedExams: ["upsc-cse", "ssc-cgl", "state-psc", "set"],
    recommendedScholarships: ["pmss", "nsp", "minority-scholarships"]
  },
  "Vocational": {
    icon: "Settings",
    gradient: "from-orange-500 to-red-600",
    description: "Your practical skills and hands-on approach are perfect for India's growing service and hospitality sectors. Build expertise through experience.",
    careers: ["Hotel Manager", "Chef", "Sports Coach", "Tourism Guide", "Event Manager", "Fitness Trainer"],
    recommendedExams: ["nchmct-jee", "iihm-exam", "nis-coaching"],
    recommendedScholarships: ["nsp", "skill-development-schemes", "hospitality-scholarships"]
  },
  // Legacy support
  "Technology & Engineering": {
    icon: "Settings",
    gradient: "from-blue-500 to-purple-600",
    description: "You have exceptional logical thinking and problem-solving abilities. Technology and engineering offer limitless opportunities to innovate and build the future of India.",
    careers: ["Software Engineer", "AI/ML Engineer", "Cybersecurity Specialist", "Data Scientist", "Robotics Engineer", "Blockchain Developer"],
    recommendedExams: ["jee-main", "jee-advanced", "bitsat"],
    recommendedScholarships: ["inspire", "tata-scholarship", "aditya-birla"]
  },
  "Creative & Media": {
    icon: "Palette",
    gradient: "from-pink-500 to-orange-600",
    description: "Your creative flair and artistic vision make you perfect for India's booming creative economy. Express your ideas and influence culture through various mediums.",
    careers: ["Graphic Designer", "Film Director", "Content Creator", "Animator", "Game Designer", "Digital Artist"],
    recommendedExams: ["nid-dat"],
    recommendedScholarships: ["nsp", "reliance-scholarship"]
  },
  "Social Service": {
    icon: "Heart",
    gradient: "from-green-500 to-emerald-600",
    description: "Your empathy and desire to serve society align perfectly with public service careers. Make a direct impact on millions of lives across India.",
    careers: ["IAS Officer", "Doctor", "Teacher", "Social Worker", "NGO Leader", "Policy Researcher"],
    recommendedExams: ["upsc-cse", "ssc-cgl", "neet-ug"],
    recommendedScholarships: ["pmss", "nsp", "maulana-azad"]
  },
  "Technical & Hands-on": {
    icon: "Settings",
    gradient: "from-indigo-500 to-blue-600",
    description: "Your practical approach and hands-on skills are valuable in India's growing manufacturing and technical sectors. Build and create tangible solutions.",
    careers: ["Mechanical Engineer", "Electrical Engineer", "Civil Engineer", "Technician", "Quality Inspector", "Project Manager"],
    recommendedExams: ["jee-main", "bitsat"],
    recommendedScholarships: ["inspire", "ts-eamcet", "ap-fee-reimbursement"]
  },
  "Business & Management": {
    icon: "PieChart",
    gradient: "from-emerald-500 to-teal-600",
    description: "Your business acumen and leadership skills position you well for India's expanding corporate landscape and entrepreneurial ecosystem.",
    careers: ["Business Analyst", "Marketing Manager", "Financial Advisor", "Entrepreneur", "Consultant", "Product Manager"],
    recommendedExams: ["cat", "xat"],
    recommendedScholarships: ["reliance-scholarship", "tata-scholarship", "nsp"]
  }
};
