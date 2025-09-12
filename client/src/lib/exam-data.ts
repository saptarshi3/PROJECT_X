// Comprehensive Exam Data with detailed information
// Organized by streams: Science, Commerce, Arts, Vocational, General

export interface ExamData {
  id: string;
  name: string;
  fullName: string;
  stream: string;
  examDate: string; // YYYY-MM-DD format
  registrationStart: string; // YYYY-MM-DD format
  registrationEnd: string; // YYYY-MM-DD format
  officialWebsite: string;
  description: string;
  eligibility: string[];
  fees: string;
  conductedBy: string;
  examMode: 'Online' | 'Offline' | 'Both';
  syllabus: string[];
}

export const examData: ExamData[] = [
  // SCIENCE STREAM EXAMS
  {
    id: "jee-main-2025",
    name: "JEE Main 2025",
    fullName: "Joint Entrance Examination Main",
    stream: "Science",
    examDate: "2025-04-15",
    registrationStart: "2025-02-01",
    registrationEnd: "2025-03-15",
    officialWebsite: "https://jeemain.nta.nic.in/",
    description: "National level engineering entrance exam for admission to NITs, IIITs, and other technical institutes",
    eligibility: ["Class 12 passed with PCM", "75% in Class 12 or top 20 percentile", "Age limit: 25 years"],
    fees: "₹1000 (General), ₹500 (SC/ST/PwD)",
    conductedBy: "National Testing Agency (NTA)",
    examMode: "Online",
    syllabus: ["Physics", "Chemistry", "Mathematics"]
  },
  {
    id: "neet-2025",
    name: "NEET 2025",
    fullName: "National Eligibility cum Entrance Test",
    stream: "Science",
    examDate: "2025-05-05",
    registrationStart: "2025-02-15",
    registrationEnd: "2025-03-20",
    officialWebsite: "https://neet.nta.nic.in/",
    description: "Medical entrance exam for MBBS, BDS, AYUSH courses in India",
    eligibility: ["Class 12 with PCB", "17-25 years age limit", "50% marks in PCB (40% for SC/ST)"],
    fees: "₹1700 (General), ₹1500 (SC/ST/PwD)",
    conductedBy: "National Testing Agency (NTA)",
    examMode: "Offline",
    syllabus: ["Physics", "Chemistry", "Biology"]
  },
  {
    id: "bitsat-2025",
    name: "BITSAT 2025",
    fullName: "Birla Institute of Technology and Science Admission Test",
    stream: "Science",
    examDate: "2025-06-10",
    registrationStart: "2025-03-01",
    registrationEnd: "2025-05-15",
    officialWebsite: "https://www.bitsadmission.com/",
    description: "Entrance exam for admission to BITS Pilani campuses",
    eligibility: ["Class 12 with PCM", "75% aggregate in PCM", "English proficiency required"],
    fees: "₹3400 for Indian students",
    conductedBy: "BITS Pilani",
    examMode: "Online",
    syllabus: ["Physics", "Chemistry", "Mathematics", "English", "Logical Reasoning"]
  },
  {
    id: "viteee-2025",
    name: "VITEEE 2025",
    fullName: "Vellore Institute of Technology Engineering Entrance Exam",
    stream: "Science",
    examDate: "2025-04-25",
    registrationStart: "2025-01-15",
    registrationEnd: "2025-03-30",
    officialWebsite: "https://viteee.vit.ac.in/",
    description: "Entrance exam for B.Tech admission at VIT campuses",
    eligibility: ["Class 12 with PCM", "60% aggregate in PCM", "Born on or after July 1, 2001"],
    fees: "₹1150",
    conductedBy: "Vellore Institute of Technology",
    examMode: "Online",
    syllabus: ["Physics", "Chemistry", "Mathematics"]
  },

  // COMMERCE STREAM EXAMS
  {
    id: "ca-foundation-2025",
    name: "CA Foundation 2025",
    fullName: "Chartered Accountant Foundation",
    stream: "Commerce",
    examDate: "2025-06-15",
    registrationStart: "2025-02-01",
    registrationEnd: "2025-04-30",
    officialWebsite: "https://www.icai.org/",
    description: "Entry level exam for Chartered Accountancy course",
    eligibility: ["Class 12 passed", "Commerce background preferred", "No age limit"],
    fees: "₹9000 (registration) + ₹1500 (exam)",
    conductedBy: "Institute of Chartered Accountants of India (ICAI)",
    examMode: "Offline",
    syllabus: ["Principles of Accounting", "Business Laws", "Business Mathematics", "Business Economics"]
  },
  {
    id: "cs-foundation-2025",
    name: "CS Foundation 2025",
    fullName: "Company Secretary Foundation",
    stream: "Commerce",
    examDate: "2025-06-20",
    registrationStart: "2025-02-15",
    registrationEnd: "2025-05-01",
    officialWebsite: "https://www.icsi.edu/",
    description: "Foundation level exam for Company Secretary course",
    eligibility: ["Class 12 passed", "Any stream eligible", "No age limit"],
    fees: "₹1200",
    conductedBy: "Institute of Company Secretaries of India (ICSI)",
    examMode: "Offline",
    syllabus: ["Business Environment", "Business Management", "Business Economics", "Fundamentals of Accounting"]
  },
  {
    id: "cma-foundation-2025",
    name: "CMA Foundation 2025",
    fullName: "Cost and Management Accountant Foundation",
    stream: "Commerce",
    examDate: "2025-06-25",
    registrationStart: "2025-03-01",
    registrationEnd: "2025-05-15",
    officialWebsite: "https://icmai.in/",
    description: "Entry level exam for Cost and Management Accountancy",
    eligibility: ["Class 12 passed", "Any stream eligible", "No upper age limit"],
    fees: "₹2500",
    conductedBy: "Institute of Cost Accountants of India (ICAI)",
    examMode: "Offline",
    syllabus: ["Fundamentals of Economics", "Fundamentals of Accounting", "Fundamentals of Laws", "Fundamentals of Business Mathematics"]
  },

  // ARTS STREAM EXAMS
  {
    id: "clat-2025",
    name: "CLAT 2025",
    fullName: "Common Law Admission Test",
    stream: "Arts",
    examDate: "2025-05-15",
    registrationStart: "2025-01-15",
    registrationEnd: "2025-04-15",
    officialWebsite: "https://consortiumofnlus.ac.in/",
    description: "National level law entrance exam for admission to NLUs",
    eligibility: ["Class 12 passed", "45% marks (40% for SC/ST)", "Age limit: 20 years for UG, 22 for PG"],
    fees: "₹4000 (General), ₹3500 (SC/ST)",
    conductedBy: "Consortium of National Law Universities",
    examMode: "Offline",
    syllabus: ["English", "General Knowledge", "Legal Reasoning", "Logical Reasoning", "Quantitative Techniques"]
  },
  {
    id: "cuet-2025",
    name: "CUET 2025",
    fullName: "Common University Entrance Test",
    stream: "Arts",
    examDate: "2025-05-20",
    registrationStart: "2025-02-20",
    registrationEnd: "2025-04-20",
    officialWebsite: "https://cuet.samarth.ac.in/",
    description: "Common entrance test for admission to central universities",
    eligibility: ["Class 12 passed", "Subject-wise eligibility varies", "No age limit"],
    fees: "₹650 for 5 subjects",
    conductedBy: "National Testing Agency (NTA)",
    examMode: "Online",
    syllabus: ["Domain subjects", "General Test", "Language Test"]
  },
  {
    id: "jmi-entrance-2025",
    name: "JMI Entrance 2025",
    fullName: "Jamia Millia Islamia Entrance Test",
    stream: "Arts",
    examDate: "2025-06-01",
    registrationStart: "2025-03-15",
    registrationEnd: "2025-05-15",
    officialWebsite: "https://www.jmi.ac.in/",
    description: "Entrance exam for various UG and PG courses at JMI",
    eligibility: ["Class 12 passed", "Course-specific eligibility", "No age bar"],
    fees: "₹1000 (General), ₹500 (SC/ST)",
    conductedBy: "Jamia Millia Islamia",
    examMode: "Offline",
    syllabus: ["General Knowledge", "English", "Subject-specific topics"]
  },

  // VOCATIONAL STREAM EXAMS
  {
    id: "nchm-jee-2025",
    name: "NCHM JEE 2025",
    fullName: "National Council for Hotel Management Joint Entrance Exam",
    stream: "Vocational",
    examDate: "2025-04-30",
    registrationStart: "2025-01-30",
    registrationEnd: "2025-03-30",
    officialWebsite: "https://nchmjee.nta.nic.in/",
    description: "National level entrance exam for hotel management courses",
    eligibility: ["Class 12 passed", "English as compulsory subject", "Born on or after July 1, 2002"],
    fees: "₹1400",
    conductedBy: "National Testing Agency (NTA)",
    examMode: "Online",
    syllabus: ["English Language", "Numerical Ability", "Reasoning & Logical Deduction", "General Knowledge", "Service Aptitude"]
  },
  {
    id: "nift-2025",
    name: "NIFT 2025",
    fullName: "National Institute of Fashion Technology Entrance",
    stream: "Vocational",
    examDate: "2025-02-09",
    registrationStart: "2024-12-15",
    registrationEnd: "2025-01-20",
    officialWebsite: "https://www.nift.ac.in/",
    description: "Entrance exam for fashion design and technology courses",
    eligibility: ["Class 12 passed", "No age limit", "Portfolio submission required for some courses"],
    fees: "₹2000",
    conductedBy: "National Institute of Fashion Technology",
    examMode: "Offline",
    syllabus: ["General Ability Test", "Creative Ability Test", "Situation Test"]
  },
  {
    id: "aieed-2025",
    name: "AIEED 2025",
    fullName: "All India Entrance Examination for Design",
    stream: "Vocational",
    examDate: "2025-05-25",
    registrationStart: "2025-02-01",
    registrationEnd: "2025-04-30",
    officialWebsite: "https://www.arch-college.ac.in/",
    description: "National level design entrance exam for architecture and design courses",
    eligibility: ["Class 12 passed", "Mathematics as compulsory subject for B.Arch", "No age limit"],
    fees: "₹2500",
    conductedBy: "Arch College of Design and Business",
    examMode: "Offline",
    syllabus: ["Drawing Test", "Aesthetic Sensitivity", "Logical Reasoning", "Mathematics"]
  },

  // GENERAL/COMPETITIVE EXAMS
  {
    id: "upsc-cse-2025",
    name: "UPSC CSE 2025",
    fullName: "Union Public Service Commission Civil Services Examination",
    stream: "General",
    examDate: "2025-06-15",
    registrationStart: "2025-02-15",
    registrationEnd: "2025-03-15",
    officialWebsite: "https://www.upsc.gov.in/",
    description: "Premier civil services examination for IAS, IPS, IFS and other services",
    eligibility: ["Graduate degree", "21-32 years age limit", "Attempt limits vary by category"],
    fees: "₹100 (General), Exempt for SC/ST/PwD/Women",
    conductedBy: "Union Public Service Commission",
    examMode: "Offline",
    syllabus: ["General Studies", "Optional Subject", "Essay", "Interview"]
  }
];

// Exam streams for filtering
export const examStreams = [
  { id: "all", name: "All Streams", icon: "🎯", color: "from-blue-500 to-purple-600" },
  { id: "science", name: "Science", icon: "🔬", color: "from-green-500 to-blue-600" },
  { id: "commerce", name: "Commerce", icon: "💼", color: "from-blue-500 to-teal-600" },
  { id: "arts", name: "Arts", icon: "📚", color: "from-purple-500 to-pink-600" },
  { id: "vocational", name: "Vocational", icon: "🛠️", color: "from-orange-500 to-red-600" },
  { id: "general", name: "General", icon: "🏛️", color: "from-gray-500 to-slate-600" }
];

// Get exams by stream
export const getExamsByStream = (streamId: string): ExamData[] => {
  if (streamId === 'all') return examData;
  return examData.filter(exam => 
    exam.stream.toLowerCase() === streamId.toLowerCase()
  );
};

// Calculate days until exam
export const calculateDaysUntil = (examDate: string): number => {
  const today = new Date();
  const exam = new Date(examDate);
  const timeDiff = exam.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return Math.max(0, daysDiff);
};

// Check if registration is open
export const isRegistrationOpen = (startDate: string, endDate: string): boolean => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  return today >= start && today <= end;
};

// Get exam status
export const getExamStatus = (exam: ExamData): 'upcoming' | 'registration-open' | 'registration-closed' | 'completed' => {
  const today = new Date();
  const examDate = new Date(exam.examDate);
  const regStart = new Date(exam.registrationStart);
  const regEnd = new Date(exam.registrationEnd);
  
  if (today > examDate) return 'completed';
  if (today >= regStart && today <= regEnd) return 'registration-open';
  if (today > regEnd) return 'registration-closed';
  return 'upcoming';
};

// Search exams by name
export const searchExams = (query: string): ExamData[] => {
  if (!query.trim()) return examData;
  
  const searchTerm = query.toLowerCase();
  return examData.filter(exam =>
    exam.name.toLowerCase().includes(searchTerm) ||
    exam.fullName.toLowerCase().includes(searchTerm) ||
    exam.description.toLowerCase().includes(searchTerm) ||
    exam.conductedBy.toLowerCase().includes(searchTerm)
  );
};