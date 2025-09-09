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

// Class 11/12 Quiz Questions (Mature, streamlined)
export const class1112QuizData: QuizQuestion[] = [
  {
    question: "Which subject do you enjoy most?",
    options: [
      { text: "Mathematics and Physics - Logic and problem-solving", stream: "Science" },
      { text: "Chemistry and Biology - Understanding life and matter", stream: "Science" },
      { text: "History and Political Science - Society and governance", stream: "Arts" },
      { text: "English and Literature - Language and expression", stream: "Creative" },
      { text: "Economics and Business Studies - Markets and commerce", stream: "Commerce" },
    ],
  },
  {
    question: "Which activity excites you most in daily life?",
    options: [
      { text: "Analyzing data and finding patterns", stream: "Science" },
      { text: "Creating content, designs, or artistic work", stream: "Creative" },
      { text: "Leading group projects and organizing events", stream: "Commerce" },
      { text: "Researching topics and writing detailed reports", stream: "Arts" },
      { text: "Volunteering and helping community causes", stream: "Social" },
    ],
  },
  {
    question: "After Class 12, which path are you most interested in?",
    options: [
      { text: "Engineering/Medical - Technical expertise and innovation", stream: "Science" },
      { text: "Business/Management - Entrepreneurship and leadership", stream: "Commerce" },
      { text: "Liberal Arts/Humanities - Research and critical thinking", stream: "Arts" },
      { text: "Creative Fields - Media, design, and artistic expression", stream: "Creative" },
      { text: "Social Work/Public Service - Making a societal impact", stream: "Social" },
    ],
  },
  {
    question: "Which factor matters most in choosing a career?",
    options: [
      { text: "High salary and financial growth potential", stream: "Commerce" },
      { text: "Following my passion and interests", stream: "Creative" },
      { text: "Making a positive social impact", stream: "Social" },
      { text: "Work-life balance and stability", stream: "Arts" },
      { text: "Job security and traditional respect", stream: "Science" },
    ],
  },
  {
    question: "Do you prefer new-age jobs or traditional jobs?",
    options: [
      { text: "New-age jobs - AI, robotics, digital marketing, gaming", stream: "Science" },
      { text: "Traditional jobs - Doctor, lawyer, government officer", stream: "Social" },
      { text: "Mix of both - Modern approach to traditional fields", stream: "Commerce" },
      { text: "Creative roles - Whether old or new, as long as it's creative", stream: "Creative" },
      { text: "Research-oriented - Academic or policy research roles", stream: "Arts" },
    ],
  },
  {
    question: "Where do you see yourself working best?",
    options: [
      { text: "Corporate environment - Structured growth and clear hierarchy", stream: "Commerce" },
      { text: "Startup ecosystem - Fast-paced, innovative, and flexible", stream: "Science" },
      { text: "Research institutions - Academic and policy research", stream: "Arts" },
      { text: "Government sector - Public service and policy implementation", stream: "Social" },
      { text: "Creative industry - Media houses, studios, agencies", stream: "Creative" },
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
    careers: ["Engineer", "Doctor", "Scientist", "Data Scientist", "Biotech Specialist", "IT Developer"],
    recommendedExams: ["jee-main", "jee-advanced", "neet-ug", "bitsat"],
    recommendedScholarships: ["inspire", "tata-scholarship", "aditya-birla"]
  },
  "Commerce": {
    icon: "PieChart",
    gradient: "from-emerald-500 to-teal-600",
    description: "Your business acumen and leadership skills position you well for India's expanding corporate landscape and entrepreneurial ecosystem.",
    careers: ["Accountant", "Entrepreneur", "Banker", "CA/CS", "Economist", "Marketing Manager"],
    recommendedExams: ["cat", "xat", "ca-foundation"],
    recommendedScholarships: ["reliance-scholarship", "tata-scholarship", "nsp"]
  },
  "Arts": {
    icon: "BookOpen",
    gradient: "from-purple-500 to-pink-600",
    description: "Your analytical and research skills make you perfect for humanities, law, and social sciences. Shape society through knowledge and policy.",
    careers: ["Lawyer", "Journalist", "Historian", "Teacher", "Psychologist", "Politician"],
    recommendedExams: ["clat", "upsc-cse", "ugc-net"],
    recommendedScholarships: ["nsp", "maulana-azad", "pmss"]
  },
  "Creative": {
    icon: "Palette",
    gradient: "from-pink-500 to-orange-600",
    description: "Your creative flair and artistic vision make you perfect for India's booming creative economy. Express your ideas and influence culture.",
    careers: ["Designer", "Musician", "Writer", "Actor", "Filmmaker", "Architect"],
    recommendedExams: ["nid-dat", "nift", "jmi-entrance"],
    recommendedScholarships: ["nsp", "reliance-scholarship", "cultural-scholarships"]
  },
  "Social": {
    icon: "Heart",
    gradient: "from-green-500 to-emerald-600",
    description: "Your empathy and desire to serve society align perfectly with public service careers. Make a direct impact on millions of lives.",
    careers: ["NGO Worker", "Social Worker", "Counselor", "Public Servant", "Environmentalist", "Community Leader"],
    recommendedExams: ["upsc-cse", "ssc-cgl", "state-psc"],
    recommendedScholarships: ["pmss", "nsp", "minority-scholarships"]
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
