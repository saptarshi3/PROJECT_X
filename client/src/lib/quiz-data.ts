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
      { text: "Physics & Math – Logic & problem-solving → Engineer, Pilot, Data Scientist", stream: "Science" },
      { text: "Chemistry & Biology – Life & matter → Doctor, Marine Biologist, Geneticist", stream: "Science" },
      { text: "Computer Science – Coding & AI → AI Specialist, Software Engineer", stream: "Science" },
      { text: "Environmental Science – Nature & sustainability → Environmental Scientist, Robotics Engineer", stream: "Science" }
    ],
  },
  {
    question: "What activity excites you most in daily life?",
    options: [
      { text: "Conducting experiments → Research Scientist, Chemist", stream: "Science" },
      { text: "Solving puzzles or algorithms → Data Scientist, Software Engineer", stream: "Science" },
      { text: "Flying drones or simulations → Pilot, Astronaut", stream: "Science" },
      { text: "Exploring oceans/labs → Marine Biologist, Environmental Scientist", stream: "Science" }
    ],
  },
  {
    question: "What kind of work environment suits you best?",
    options: [
      { text: "Lab or research institute → Research Scientist, Doctor", stream: "Science" },
      { text: "Tech company/startup → Software Engineer, AI Specialist", stream: "Science" },
      { text: "Air/sea operations → Pilot, Merchant Navy", stream: "Science" },
      { text: "Field & nature → Environmental Scientist, Marine Biologist", stream: "Science" }
    ],
  },
  {
    question: "Which factor matters most in choosing a career?",
    options: [
      { text: "Innovation & discovery → Research Scientist, AI Specialist", stream: "Science" },
      { text: "Helping people → Doctor, Geneticist", stream: "Science" },
      { text: "Leadership & responsibility → Pilot, Merchant Navy", stream: "Science" },
      { text: "Adventure & exploration → Astronaut, Marine Biologist", stream: "Science" }
    ],
  },
  {
    question: "What describes your problem-solving style?",
    options: [
      { text: "Analytical & logical → Software Engineer, Data Scientist", stream: "Science" },
      { text: "Hands-on experimentation → Chemist, Geneticist", stream: "Science" },
      { text: "Creative tech solutions → Robotics Engineer, AI Specialist", stream: "Science" },
      { text: "Strategic & operational → Pilot, Merchant Navy", stream: "Science" }
    ],
  },
  {
    question: "Your dream profession is?",
    options: [
      { text: "Doctor → Doctor, Surgeon", stream: "Science" },
      { text: "Engineer → Software Engineer, Mechanical Engineer", stream: "Science" },
      { text: "Explorer → Pilot, Astronaut, Marine Biologist", stream: "Science" },
      { text: "Tech Innovator → AI Specialist, Robotics Engineer", stream: "Science" }
    ],
  }
];

// Commerce Stream Quiz Questions (6 Questions, 4 options each)
export const commerceStreamQuizData: QuizQuestion[] = [
  {
    question: "Which subject do you enjoy the most?",
    options: [
      { text: "Accounts & Economics → CA, Financial Analyst", stream: "Commerce" },
      { text: "Business Studies → Entrepreneur, Business Manager", stream: "Commerce" },
      { text: "Marketing & Strategy → Digital Marketer, Marketing Manager", stream: "Commerce" },
      { text: "Maths & Data Analysis → Investment Banker, Economist", stream: "Commerce" }
    ],
  },
  {
    question: "Your ideal work activity?",
    options: [
      { text: "Managing finances → CA, Financial Analyst", stream: "Commerce" },
      { text: "Running a company → Entrepreneur, Business Manager", stream: "Commerce" },
      { text: "Research & planning → Economist, Policy Analyst", stream: "Commerce" },
      { text: "Creative campaigns → Digital Marketer, Marketing Manager", stream: "Commerce" }
    ],
  },
  {
    question: "What motivates you most in a career?",
    options: [
      { text: "High income → Investment Banker, CA", stream: "Commerce" },
      { text: "Leadership → Entrepreneur, Business Manager", stream: "Commerce" },
      { text: "Strategic impact → Economist, Policy Analyst", stream: "Commerce" },
      { text: "Creativity → Marketing Manager, Digital Marketer", stream: "Commerce" }
    ],
  },
  {
    question: "Preferred work environment?",
    options: [
      { text: "Corporate office → CA, Investment Banker", stream: "Commerce" },
      { text: "Startup → Entrepreneur, Business Manager", stream: "Commerce" },
      { text: "Research institute → Economist, Policy Analyst", stream: "Commerce" },
      { text: "Creative agency → Digital Marketer, Marketing Manager", stream: "Commerce" }
    ],
  },
  {
    question: "How do you approach challenges?",
    options: [
      { text: "Analytical → CA, Financial Analyst", stream: "Commerce" },
      { text: "Risk-taking → Entrepreneur", stream: "Commerce" },
      { text: "Strategy-driven → Economist, Policy Analyst", stream: "Commerce" },
      { text: "Innovative & creative → Marketing Manager, Digital Marketer", stream: "Commerce" }
    ],
  },
  {
    question: "Dream career path?",
    options: [
      { text: "Finance & Accounts → CA, Investment Banker", stream: "Commerce" },
      { text: "Business Leadership → Entrepreneur, Business Manager", stream: "Commerce" },
      { text: "Policy & Governance → Economist, Policy Analyst", stream: "Commerce" },
      { text: "Marketing & Branding → Marketing Manager, Digital Marketer", stream: "Commerce" }
    ],
  }
];

// Arts Stream Quiz Questions (6 Questions, 4-5 options each)
export const artsStreamQuizData: QuizQuestion[] = [
  {
    question: "Which subject excites you the most?",
    options: [
      { text: "History & Political Science → IAS, IPS, Lawyer", stream: "Arts" },
      { text: "Literature & English → Teacher, Journalist, Writer", stream: "Arts" },
      { text: "Fine Arts & Music → Designer, Filmmaker, Musician", stream: "Creative" },
      { text: "Tourism & Hospitality → Hotel Management, Chef, Tourism Professional", stream: "Vocational" }
    ],
  },
  {
    question: "Which activity excites you most?",
    options: [
      { text: "Debates & Public Speaking → IAS, IPS, Lawyer", stream: "Arts" },
      { text: "Writing & storytelling → Journalist, Writer", stream: "Arts" },
      { text: "Creating art/design → Designer, Filmmaker, Musician", stream: "Creative" },
      { text: "Planning events → Hotel Manager, Tourism Professional", stream: "Vocational" }
    ],
  },
  {
    question: "What motivates you in a career?",
    options: [
      { text: "Societal impact → IAS, IPS, Social Worker", stream: "Arts" },
      { text: "Creativity → Designer, Filmmaker, Musician", stream: "Creative" },
      { text: "Knowledge & teaching → Teacher, Journalist", stream: "Arts" },
      { text: "Service & hospitality → Hotel Management, Tourism Professional", stream: "Vocational" }
    ],
  },
  {
    question: "Preferred work environment?",
    options: [
      { text: "Government/Public Office → IAS, IPS", stream: "Arts" },
      { text: "Studio/Creative agency → Filmmaker, Designer, Musician", stream: "Creative" },
      { text: "Classroom → Teacher", stream: "Arts" },
      { text: "Hotels & tourism → Hotel Management, Tourism Professional", stream: "Vocational" }
    ],
  },
  {
    question: "Problem-solving style?",
    options: [
      { text: "Logical & strategic → IAS, IPS, Lawyer", stream: "Arts" },
      { text: "Creative & expressive → Designer, Filmmaker, Musician", stream: "Creative" },
      { text: "Analytical & research-based → Teacher, Journalist", stream: "Arts" },
      { text: "Operational & service-oriented → Hotel Management, Tourism Professional", stream: "Vocational" }
    ],
  },
  {
    question: "Dream career?",
    options: [
      { text: "Civil Services → IAS, IPS", stream: "Arts" },
      { text: "Media & Writing → Journalist, Writer", stream: "Arts" },
      { text: "Arts & Entertainment → Designer, Filmmaker, Musician", stream: "Creative" },
      { text: "Hospitality → Hotel Manager, Chef, Tourism Professional", stream: "Vocational" }
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
