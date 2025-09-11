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

// Class 11/12 Quiz Questions (Student-friendly with clear career mapping)
export const class1112QuizData: QuizQuestion[] = [
  {
    question: "Which subject excites you the most?",
    options: [
      { text: "Physics & Math – Logic & problem-solving → Engineer, Pilot, Data Scientist", stream: "Science" },
      { text: "Chemistry & Biology – Life & matter → Doctor, Marine Biologist, Geneticist", stream: "Science" },
      { text: "Accounts & Economics → CA, Financial Analyst, Investment Banker", stream: "Commerce" },
      { text: "History & Political Science → IAS, IPS, Lawyer", stream: "Arts" },
      { text: "Literature & English → Teacher, Journalist, Writer", stream: "Creative" },
      { text: "Tourism & Hospitality → Hotel Management, Chef, Tourism Professional", stream: "Vocational" },
    ],
  },
  {
    question: "What activity excites you most in daily life?",
    options: [
      { text: "Conducting experiments or solving puzzles → Research Scientist, Software Engineer", stream: "Science" },
      { text: "Managing finances or running a business → CA, Entrepreneur, Business Manager", stream: "Commerce" },
      { text: "Debates & public speaking → IAS, IPS, Lawyer", stream: "Arts" },
      { text: "Writing & storytelling or creating art → Journalist, Designer, Filmmaker", stream: "Creative" },
      { text: "Helping friends or volunteering → Social Worker, Counselor, Psychologist", stream: "Social" },
      { text: "Cooking or planning events → Chef, Hotel Manager, Event Manager", stream: "Vocational" },
    ],
  },
  {
    question: "What kind of work environment suits you best?",
    options: [
      { text: "Lab or tech company → Research Scientist, Software Engineer, AI Specialist", stream: "Science" },
      { text: "Corporate office or startup → CA, Investment Banker, Entrepreneur", stream: "Commerce" },
      { text: "Government office or court → IAS, IPS, Lawyer, Judge", stream: "Arts" },
      { text: "Studio or creative agency → Designer, Filmmaker, Musician", stream: "Creative" },
      { text: "Community center or hospital → Social Worker, Counselor, Therapist", stream: "Social" },
      { text: "Hotels & restaurants → Hotel Manager, Chef, Tourism Professional", stream: "Vocational" },
    ],
  },
  {
    question: "What motivates you most in choosing a career?",
    options: [
      { text: "Innovation & discovery → Research Scientist, AI Specialist, Engineer", stream: "Science" },
      { text: "High income & financial success → Investment Banker, CA, Entrepreneur", stream: "Commerce" },
      { text: "Societal impact & governance → IAS, IPS, Social Worker", stream: "Arts" },
      { text: "Creativity & artistic expression → Designer, Filmmaker, Musician", stream: "Creative" },
      { text: "Helping people & making a difference → Psychologist, Counselor, NGO Worker", stream: "Social" },
      { text: "Service & hospitality → Hotel Manager, Chef, Tourism Professional", stream: "Vocational" },
    ],
  },
  {
    question: "How do you approach problem-solving?",
    options: [
      { text: "Analytical & logical → Software Engineer, Data Scientist, Pilot", stream: "Science" },
      { text: "Strategic & business-minded → Economist, Business Manager, Financial Analyst", stream: "Commerce" },
      { text: "Research-based & systematic → Teacher, Journalist, IAS Officer", stream: "Arts" },
      { text: "Creative & expressive → Designer, Filmmaker, Architect", stream: "Creative" },
      { text: "Empathetic & people-focused → Psychologist, Social Worker, Counselor", stream: "Social" },
      { text: "Practical & hands-on → Chef, Sports Coach, Event Manager", stream: "Vocational" },
    ],
  },
  {
    question: "What's your dream career path?",
    options: [
      { text: "Doctor, Engineer, or Pilot → Medicine, Technology, Aviation", stream: "Science" },
      { text: "CA, Entrepreneur, or Investment Banker → Finance, Business Leadership", stream: "Commerce" },
      { text: "IAS, IPS, or Lawyer → Civil Services, Law, Governance", stream: "Arts" },
      { text: "Designer, Filmmaker, or Architect → Arts, Media, Entertainment", stream: "Creative" },
      { text: "Psychologist, Social Worker, or NGO Leader → Community Service, Mental Health", stream: "Social" },
      { text: "Hotel Manager, Chef, or Sports Coach → Hospitality, Culinary, Sports", stream: "Vocational" },
    ],
  },
];

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
