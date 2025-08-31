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
    question: "Which subject do you enjoy the most?",
    options: [
      { text: "Math & Logic", stream: "Engineering & Technology" },
      { text: "Biology & Life Sciences", stream: "Medicine & Healthcare" },
      { text: "Economics & Business", stream: "Commerce & Finance" },
      { text: "History & Literature", stream: "Arts & Humanities" },
    ],
  },
  {
    question: "What kind of problems do you like solving?",
    options: [
      { text: "Building systems & apps", stream: "Engineering & Technology" },
      { text: "Helping people stay healthy", stream: "Medicine & Healthcare" },
      { text: "Managing money & trade", stream: "Commerce & Finance" },
      { text: "Exploring culture & ideas", stream: "Arts & Humanities" },
    ],
  },
  {
    question: "Pick your favorite activity:",
    options: [
      { text: "Coding or robotics", stream: "Engineering & Technology" },
      { text: "Volunteering at hospitals", stream: "Medicine & Healthcare" },
      { text: "Stock market tracking", stream: "Commerce & Finance" },
      { text: "Creative writing", stream: "Arts & Humanities" },
    ],
  },
  {
    question: "Which skill do you value most?",
    options: [
      { text: "Logical reasoning", stream: "Engineering & Technology" },
      { text: "Empathy & care", stream: "Medicine & Healthcare" },
      { text: "Analytical thinking", stream: "Commerce & Finance" },
      { text: "Critical analysis", stream: "Arts & Humanities" },
    ],
  },
  {
    question: "Your dream job involves:",
    options: [
      { text: "Building future tech", stream: "Engineering & Technology" },
      { text: "Saving lives", stream: "Medicine & Healthcare" },
      { text: "Running businesses", stream: "Commerce & Finance" },
      { text: "Research & teaching", stream: "Arts & Humanities" },
    ],
  },
  {
    question: "Which environment do you prefer?",
    options: [
      { text: "Labs & workshops", stream: "Engineering & Technology" },
      { text: "Hospitals", stream: "Medicine & Healthcare" },
      { text: "Offices", stream: "Commerce & Finance" },
      { text: "Libraries", stream: "Arts & Humanities" },
    ],
  },
  {
    question: "Your friends describe you as:",
    options: [
      { text: "Problem solver", stream: "Engineering & Technology" },
      { text: "Compassionate", stream: "Medicine & Healthcare" },
      { text: "Strategic thinker", stream: "Commerce & Finance" },
      { text: "Creative", stream: "Arts & Humanities" },
    ],
  },
  {
    question: "What excites you more?",
    options: [
      { text: "AI & robotics", stream: "Engineering & Technology" },
      { text: "Medical discoveries", stream: "Medicine & Healthcare" },
      { text: "Financial growth", stream: "Commerce & Finance" },
      { text: "Art & culture", stream: "Arts & Humanities" },
    ],
  },
  {
    question: "Which tool appeals to you most?",
    options: [
      { text: "Computer & gadgets", stream: "Engineering & Technology" },
      { text: "Stethoscope", stream: "Medicine & Healthcare" },
      { text: "Balance sheet", stream: "Commerce & Finance" },
      { text: "Pen & books", stream: "Arts & Humanities" },
    ],
  },
  {
    question: "What's your ultimate goal?",
    options: [
      { text: "Innovate technology", stream: "Engineering & Technology" },
      { text: "Heal people", stream: "Medicine & Healthcare" },
      { text: "Grow wealth", stream: "Commerce & Finance" },
      { text: "Inspire society", stream: "Arts & Humanities" },
    ],
  },
];

export const careerStreamInfo = {
  "Engineering & Technology": {
    icon: "Settings",
    gradient: "from-blue-500 to-purple-600",
    description: "You have a natural aptitude for logical thinking and problem-solving. Technology and engineering offer exciting opportunities to build innovative solutions and shape the future.",
    careers: ["Software Developer", "Data Scientist", "Cybersecurity Specialist", "AI Engineer", "Robotics Engineer"]
  },
  "Medicine & Healthcare": {
    icon: "Heart",
    gradient: "from-red-500 to-pink-600",
    description: "Your empathy and desire to help others make you well-suited for healthcare. This field offers the opportunity to make a direct positive impact on people's lives.",
    careers: ["Doctor", "Nurse", "Physical Therapist", "Medical Researcher", "Healthcare Administrator"]
  },
  "Commerce & Finance": {
    icon: "PieChart",
    gradient: "from-green-500 to-emerald-600",
    description: "Your analytical mindset and strategic thinking align perfectly with business and finance. These fields offer dynamic environments with growth opportunities.",
    careers: ["Financial Analyst", "Business Consultant", "Investment Banker", "Marketing Manager", "Entrepreneur"]
  },
  "Arts & Humanities": {
    icon: "Palette",
    gradient: "from-yellow-500 to-orange-600",
    description: "Your creativity and critical thinking skills are valuable assets in arts and humanities. These fields allow you to express ideas and influence culture.",
    careers: ["Writer", "Designer", "Teacher", "Psychologist", "Museum Curator"]
  }
};
