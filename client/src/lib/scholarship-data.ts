export interface Exam {
  id: string;
  name: string;
  fullName: string;
  category: 'Engineering' | 'Medical' | 'Management' | 'Law' | 'Civil Services' | 'Arts' | 'Commerce' | 'Design';
  eligibility: string;
  applicationPeriod: string;
  examDate: string;
  website: string;
  description: string;
  streams: string[];
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  type: 'Merit-based' | 'Need-based' | 'Category-based' | 'State-specific' | 'Central';
  eligibility: string;
  amount: string;
  applicationPeriod: string;
  website: string;
  description: string;
  category: string[];
}

export const examData: Exam[] = [
  // Engineering Exams
  {
    id: 'jee-main',
    name: 'JEE Main',
    fullName: 'Joint Entrance Examination Main',
    category: 'Engineering',
    eligibility: 'Class 12 pass with PCM, Age limit: 25 years',
    applicationPeriod: 'December - January, March - April',
    examDate: 'January, April, May',
    website: 'https://jeemain.nta.nic.in',
    description: 'National level entrance exam for admission to NITs, IIITs, and other CFTIs.',
    streams: ['Engineering', 'Technology']
  },
  {
    id: 'jee-advanced',
    name: 'JEE Advanced',
    fullName: 'Joint Entrance Examination Advanced',
    category: 'Engineering',
    eligibility: 'JEE Main qualified, Class 12 pass with PCM',
    applicationPeriod: 'May - June',
    examDate: 'May',
    website: 'https://jeeadv.ac.in',
    description: 'For admission to IITs and ISM Dhanbad. Only JEE Main qualified students can appear.',
    streams: ['Engineering', 'Technology', 'Architecture']
  },
  {
    id: 'bitsat',
    name: 'BITSAT',
    fullName: 'Birla Institute of Technology and Science Admission Test',
    category: 'Engineering',
    eligibility: 'Class 12 pass with PCM, minimum 75% aggregate',
    applicationPeriod: 'January - March',
    examDate: 'May - June',
    website: 'https://bitsadmission.com',
    description: 'Entrance exam for BITS Pilani campuses across India.',
    streams: ['Engineering', 'Pharmacy', 'Science']
  },

  // Medical Exams  
  {
    id: 'neet-ug',
    name: 'NEET UG',
    fullName: 'National Eligibility cum Entrance Test (Undergraduate)',
    category: 'Medical',
    eligibility: 'Class 12 pass with PCB, Age limit: 25 years (30 for reserved)',
    applicationPeriod: 'February - March',
    examDate: 'May',
    website: 'https://neet.nta.nic.in',
    description: 'National level medical entrance exam for MBBS and BDS courses.',
    streams: ['Medical', 'Dental', 'AYUSH']
  },
  {
    id: 'aiims',
    name: 'AIIMS',
    fullName: 'All India Institute of Medical Sciences',
    category: 'Medical',
    eligibility: 'Class 12 pass with PCB',
    applicationPeriod: 'March - April',
    examDate: 'May - June',
    website: 'https://www.aiims.edu',
    description: 'Entrance exam for AIIMS institutes across India.',
    streams: ['Medical', 'Nursing', 'Allied Health']
  },

  // Management Exams
  {
    id: 'cat',
    name: 'CAT',
    fullName: 'Common Admission Test',
    category: 'Management',
    eligibility: 'Bachelor\'s degree with 50% marks',
    applicationPeriod: 'August - September',
    examDate: 'November',
    website: 'https://iimcat.ac.in',
    description: 'Premier MBA entrance exam for IIMs and other top B-schools.',
    streams: ['Management', 'Business Administration']
  },
  {
    id: 'xat',
    name: 'XAT',
    fullName: 'Xavier Aptitude Test',
    category: 'Management',
    eligibility: 'Bachelor\'s degree with 50% marks',
    applicationPeriod: 'August - November',
    examDate: 'January',
    website: 'https://xatonline.in',
    description: 'Entrance exam for XLRI and other premier B-schools.',
    streams: ['Management', 'Business Administration']
  },

  // Law Exams
  {
    id: 'clat',
    name: 'CLAT',
    fullName: 'Common Law Admission Test',
    category: 'Law',
    eligibility: 'Class 12 pass for UG, LLB degree for PG',
    applicationPeriod: 'January - April',
    examDate: 'May',
    website: 'https://consortiumofnlus.ac.in',
    description: 'National level law entrance exam for NLUs across India.',
    streams: ['Law', 'Legal Studies']
  },

  // Civil Services
  {
    id: 'upsc-cse',
    name: 'UPSC CSE',
    fullName: 'Union Public Service Commission Civil Services Examination',
    category: 'Civil Services',
    eligibility: 'Bachelor\'s degree, Age: 21-32 years',
    applicationPeriod: 'February - March',
    examDate: 'June (Prelims), September (Mains)',
    website: 'https://upsc.gov.in',
    description: 'Premier exam for IAS, IPS, IFS and other central services.',
    streams: ['Administration', 'Public Service']
  },
  {
    id: 'ssc-cgl',
    name: 'SSC CGL',
    fullName: 'Staff Selection Commission Combined Graduate Level',
    category: 'Civil Services',
    eligibility: 'Bachelor\'s degree, Age: 18-27 years',
    applicationPeriod: 'May - June',
    examDate: 'August - September',
    website: 'https://ssc.nic.in',
    description: 'For various Group B and C posts in central government.',
    streams: ['Administration', 'Accounts', 'Audit']
  },

  // Design Exams
  {
    id: 'nid-dat',
    name: 'NID DAT',
    fullName: 'National Institute of Design - Design Aptitude Test',
    category: 'Design',
    eligibility: 'Class 12 pass for UG, Bachelor\'s degree for PG',
    applicationPeriod: 'October - December',
    examDate: 'January',
    website: 'https://admissions.nid.edu',
    description: 'Entrance exam for NID campuses offering various design programs.',
    streams: ['Product Design', 'Communication Design', 'Textile Design']
  }
];

export const scholarshipData: Scholarship[] = [
  // Central Government Scholarships
  {
    id: 'nsp',
    name: 'National Scholarship Portal',
    provider: 'Government of India',
    type: 'Merit-based',
    eligibility: 'Various criteria for different schemes',
    amount: 'Varies by scheme (₹1,000 - ₹20,000 per year)',
    applicationPeriod: 'August - November',
    website: 'https://scholarships.gov.in',
    description: 'Umbrella platform for various central and state government scholarships.',
    category: ['All Streams']
  },
  {
    id: 'inspire',
    name: 'INSPIRE Scholarship',
    provider: 'Department of Science and Technology',
    type: 'Merit-based',
    eligibility: 'Top 1% in Class 12 board exam with science stream',
    amount: '₹80,000 per year for 5 years',
    applicationPeriod: 'June - July',
    website: 'https://www.inspire-dst.gov.in',
    description: 'For students pursuing B.Sc, B.Tech, and integrated courses in science.',
    category: ['Science', 'Engineering']
  },
  {
    id: 'kvpy',
    name: 'KVPY Fellowship',
    provider: 'Indian Institute of Science',
    type: 'Merit-based',
    eligibility: 'Class 11, 12, and 1st year undergraduate students',
    amount: '₹5,000 - ₹7,000 per month + Annual Contingency',
    applicationPeriod: 'July - August',
    website: 'http://kvpy.iisc.ernet.in',
    description: 'For students with aptitude for research in basic sciences.',
    category: ['Science', 'Research']
  },
  {
    id: 'pmss',
    name: 'PM Scholarship Scheme',
    provider: 'Ministry of Home Affairs',
    type: 'Category-based',
    eligibility: 'Children/widow of Ex-servicemen, Ex-CPF personnel',
    amount: '₹2,250 - ₹3,000 per month',
    applicationPeriod: 'July - October',
    website: 'https://ksb.gov.in',
    description: 'For wards and widows of ex-servicemen and paramilitary forces.',
    category: ['All Streams']
  },
  {
    id: 'jrf',
    name: 'UGC JRF',
    provider: 'University Grants Commission',
    type: 'Merit-based',
    eligibility: 'Master\'s degree with 55% marks',
    amount: '₹31,000 per month for first 2 years, ₹35,000 thereafter',
    applicationPeriod: 'March, September',
    website: 'https://csirnet.nta.nic.in',
    description: 'For pursuing Ph.D and research in universities.',
    category: ['Research', 'All Streams']
  },

  // State Government Scholarships
  {
    id: 'ts-eamcet',
    name: 'TS Fee Reimbursement',
    provider: 'Government of Telangana',
    type: 'Need-based',
    eligibility: 'Family income below ₹2 lakhs per annum',
    amount: 'Full tuition fee reimbursement',
    applicationPeriod: 'July - September',
    website: 'https://telanganaepass.cgg.gov.in',
    description: 'Complete fee reimbursement for eligible students in Telangana.',
    category: ['Engineering', 'Medical', 'All Streams']
  },
  {
    id: 'karnataka-vidyasiri',
    name: 'Vidyasiri Scholarship',
    provider: 'Government of Karnataka',
    type: 'Merit-based',
    eligibility: 'Merit students with family income below ₹2.5 lakhs',
    amount: '₹15,000 - ₹25,000 per year',
    applicationPeriod: 'June - August',
    website: 'https://karepass.cgg.gov.in',
    description: 'Merit-cum-means scholarship for Karnataka students.',
    category: ['Engineering', 'Medical', 'All Streams']
  },
  {
    id: 'ap-fee-reimbursement',
    name: 'AP Fee Reimbursement',
    provider: 'Government of Andhra Pradesh',
    type: 'Need-based',
    eligibility: 'Family income below ₹2 lakhs per annum',
    amount: 'Full tuition fee + ₹20,000 maintenance',
    applicationPeriod: 'July - October',
    website: 'https://apepass.cgg.gov.in',
    description: 'Complete fee reimbursement with maintenance allowance.',
    category: ['Engineering', 'Medical', 'All Streams']
  },

  // Private Scholarships
  {
    id: 'tata-scholarship',
    name: 'Tata Scholarship',
    provider: 'Tata Trusts',
    type: 'Merit-based',
    eligibility: 'Family income below ₹4 lakhs, merit in Class 12',
    amount: '₹50,000 - ₹2,00,000 per year',
    applicationPeriod: 'April - May',
    website: 'https://www.tatatrusts.org',
    description: 'For undergraduate studies at premier institutions.',
    category: ['Engineering', 'Science', 'All Streams']
  },
  {
    id: 'reliance-scholarship',
    name: 'Reliance Foundation Scholarship',
    provider: 'Reliance Foundation',
    type: 'Merit-based',
    eligibility: 'Family income below ₹6 lakhs, good academic record',
    amount: '₹2,00,000 per year',
    applicationPeriod: 'May - July',
    website: 'https://www.reliancefoundation.org',
    description: 'For undergraduate studies across various disciplines.',
    category: ['Engineering', 'Medical', 'All Streams']
  },
  {
    id: 'aditya-birla',
    name: 'Aditya Birla Scholarship',
    provider: 'Aditya Birla Group',
    type: 'Merit-based',
    eligibility: 'Top rankers in JEE, BITSAT, and other entrance exams',
    amount: '₹1,75,000 per year',
    applicationPeriod: 'July - August',
    website: 'https://www.adityabirla.com',
    description: 'For students admitted to premier engineering institutes.',
    category: ['Engineering']
  },

  // Minority Scholarships
  {
    id: 'maulana-azad',
    name: 'Maulana Azad National Fellowship',
    provider: 'UGC',
    type: 'Category-based',
    eligibility: 'Minority community students for M.Phil/Ph.D',
    amount: '₹25,000 per month + ₹28,000 contingency',
    applicationPeriod: 'October - November',
    website: 'https://www.ugc.ac.in',
    description: 'For research studies by minority community students.',
    category: ['Research', 'All Streams']
  }
];

export const examCategories = ['All', 'Engineering', 'Medical', 'Management', 'Law', 'Civil Services', 'Design', 'Arts', 'Commerce'];
export const scholarshipCategories = ['All', 'Merit-based', 'Need-based', 'Category-based', 'Central', 'State-specific'];