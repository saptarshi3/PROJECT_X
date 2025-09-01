export type QuizOption = {
  text: string;
  stream: string;
};

export type QuizQuestion = {
  question: string;
  options: QuizOption[];
};

export const quizData: QuizQuestion[] = [
  {
    question: "Which type of problems do you enjoy solving the most?",
    options: [
      { text: "Solving complex logical or mathematical problems", stream: "Technology & Engineering" },
      { text: "Creating new ideas, designs, or content", stream: "Creative & Media" },
      { text: "Helping and guiding others", stream: "Social Service" },
      { text: "Building or fixing things hands-on", stream: "Technical & Hands-on" },
      { text: "Organizing, planning, and managing activities", stream: "Business & Management" },
    ],
  },
  {
    question: "Which subjects or fields do you naturally excel in?",
    options: [
      { text: "Mathematics and Science", stream: "Technology & Engineering" },
      { text: "Arts, Humanities, or Languages", stream: "Creative & Media" },
      { text: "Social Sciences or Psychology", stream: "Social Service" },
      { text: "Technology, Computers, or Engineering", stream: "Technical & Hands-on" },
      { text: "Commerce, Business, or Economics", stream: "Business & Management" },
    ],
  },
  {
    question: "Where do you see yourself thriving?",
    options: [
      { text: "Corporate world with structured growth", stream: "Business & Management" },
      { text: "Creative industries (media, design, art)", stream: "Creative & Media" },
      { text: "Research labs or academia", stream: "Technology & Engineering" },
      { text: "Government jobs or civil services", stream: "Social Service" },
      { text: "Startups or entrepreneurship", stream: "Technical & Hands-on" },
    ],
  },
  {
    question: "Which describes you best?",
    options: [
      { text: "Logical Thinker", stream: "Technology & Engineering" },
      { text: "Creative & Imaginative", stream: "Creative & Media" },
      { text: "Empathetic & People-oriented", stream: "Social Service" },
      { text: "Practical & Hands-on", stream: "Technical & Hands-on" },
      { text: "Ambitious & Business-minded", stream: "Business & Management" },
    ],
  },
  {
    question: "What is your highest education goal as of now?",
    options: [
      { text: "Class 10th Pass", stream: "Foundation" },
      { text: "Class 12th Pass (Science/Commerce/Arts)", stream: "Intermediate" },
      { text: "Undergraduate Degree", stream: "Graduate" },
      { text: "Postgraduate Degree", stream: "Postgraduate" },
      { text: "Specialized/Professional Certifications", stream: "Professional" },
    ],
  },
  {
    question: "Which of these career paths excites you the most?",
    options: [
      { text: "Technology & Engineering", stream: "Technology & Engineering" },
      { text: "Medicine & Healthcare", stream: "Social Service" },
      { text: "Arts, Film & Media", stream: "Creative & Media" },
      { text: "Government Jobs (UPSC, SSC, Defense)", stream: "Social Service" },
      { text: "Business, Management, and Startups", stream: "Business & Management" },
    ],
  },
  {
    question: "Would you like to explore futuristic and niche careers?",
    options: [
      { text: "Yes, I love emerging careers like AI, Space Tech, Gaming", stream: "Technology & Engineering" },
      { text: "No, I prefer traditional stable careers", stream: "Social Service" },
      { text: "Maybe, I'd like to see both options", stream: "Business & Management" },
    ],
  },
  {
    question: "How do you want your career to feel?",
    options: [
      { text: "Stable, Secure, and Structured", stream: "Social Service" },
      { text: "Creative, Fun, and Flexible", stream: "Creative & Media" },
      { text: "Impactful, Helping Society", stream: "Social Service" },
      { text: "Challenging, High-Growth", stream: "Technology & Engineering" },
      { text: "Independent, Entrepreneurial", stream: "Business & Management" },
    ],
  },
];

export const careerStreamInfo = {
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
