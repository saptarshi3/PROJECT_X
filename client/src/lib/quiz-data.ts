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

// Class 11/12 Quiz Questions (Enhanced with expanded career clusters)
export const class1112QuizData: QuizQuestion[] = [
  {
    question: "Which subject combination excites you the most?",
    options: [
      { text: "Physics & Math - Engineering, aviation, space technology", stream: "Science" },
      { text: "Biology & Chemistry - Medicine, research, biotechnology", stream: "Science" },
      { text: "History & Political Science - Civil services, law, governance", stream: "Arts" },
      { text: "English & Fine Arts - Architecture, journalism, creative writing", stream: "Creative" },
      { text: "Economics & Business Studies - CA, banking, entrepreneurship", stream: "Commerce" },
      { text: "Physical Education & Communication - Sports, hospitality, tourism", stream: "Vocational" },
    ],
  },
  {
    question: "Which activity energizes you the most?",
    options: [
      { text: "Solving complex problems and conducting experiments", stream: "Science" },
      { text: "Designing, creating art, or writing stories", stream: "Creative" },
      { text: "Organizing events, managing teams, or starting ventures", stream: "Commerce" },
      { text: "Researching historical events or analyzing social issues", stream: "Arts" },
      { text: "Counseling friends or volunteering for causes", stream: "Social" },
      { text: "Cooking, sports coaching, or hands-on practical work", stream: "Vocational" },
    ],
  },
  {
    question: "Which career path seems most appealing after Class 12?",
    options: [
      { text: "Engineering/Medical/Pilot - High-tech specialized careers", stream: "Science" },
      { text: "CA/MBA/Investment Banking - Finance and business leadership", stream: "Commerce" },
      { text: "IAS/IPS/Law - Civil services and legal practice", stream: "Arts" },
      { text: "Architecture/Journalism/Film - Creative and media industries", stream: "Creative" },
      { text: "Psychology/Social Work/NGO - Community service and counseling", stream: "Social" },
      { text: "Hotel Management/Chef/Sports Coach - Service and skill-based careers", stream: "Vocational" },
    ],
  },
  {
    question: "What motivates you most in choosing a career?",
    options: [
      { text: "Financial success and wealth building", stream: "Commerce" },
      { text: "Creative expression and artistic freedom", stream: "Creative" },
      { text: "Serving society and making a positive impact", stream: "Social" },
      { text: "Intellectual growth and academic research", stream: "Arts" },
      { text: "Innovation, technology, and scientific discovery", stream: "Science" },
      { text: "Practical skills, customer service, and hands-on work", stream: "Vocational" },
    ],
  },
  {
    question: "Which work environment appeals to you most?",
    options: [
      { text: "High-tech labs, research centers, or engineering firms", stream: "Science" },
      { text: "Government offices, courts, or administrative services", stream: "Arts" },
      { text: "Corporate offices, banks, or business centers", stream: "Commerce" },
      { text: "Studios, media houses, or creative agencies", stream: "Creative" },
      { text: "Community centers, hospitals, or counseling facilities", stream: "Social" },
      { text: "Hotels, restaurants, sports facilities, or training centers", stream: "Vocational" },
    ],
  },
  {
    question: "Which of these career challenges excites you most?",
    options: [
      { text: "Building rockets, curing diseases, or developing AI", stream: "Science" },
      { text: "Managing crores of rupees and growing businesses", stream: "Commerce" },
      { text: "Reforming policies, fighting cases, or governing states", stream: "Arts" },
      { text: "Creating movies, designing buildings, or writing novels", stream: "Creative" },
      { text: "Healing trauma, fighting for rights, or supporting communities", stream: "Social" },
      { text: "Managing 5-star hotels, winning competitions, or cooking for celebrities", stream: "Vocational" },
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
