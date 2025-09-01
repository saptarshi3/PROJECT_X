export interface College {
  id: string;
  name: string;
  state: string;
  city: string;
  stream: string[];
  nirfRank?: number;
  type: 'Government' | 'Private' | 'Deemed';
  website: string;
  courses: string[];
  establishedYear: number;
  description: string;
}

export const indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh', 
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep',
  'Puducherry',
  'Andaman and Nicobar Islands'
];

export const streams = [
  'Engineering',
  'Medical',
  'Commerce',
  'Arts & Humanities',
  'Design',
  'Law',
  'Management',
  'Science',
  'Agriculture',
  'Architecture'
];

export const collegeData: College[] = [
  // Engineering Colleges
  {
    id: 'iit-bombay',
    name: 'Indian Institute of Technology Bombay',
    state: 'Maharashtra',
    city: 'Mumbai',
    stream: ['Engineering'],
    nirfRank: 1,
    type: 'Government',
    website: 'https://www.iitb.ac.in',
    courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Chemical Engineering'],
    establishedYear: 1958,
    description: 'Premier engineering institute known for its cutting-edge research and excellent placements.'
  },
  {
    id: 'iit-delhi',
    name: 'Indian Institute of Technology Delhi',
    state: 'Delhi',
    city: 'New Delhi',
    stream: ['Engineering'],
    nirfRank: 2,
    type: 'Government',
    website: 'https://www.iitd.ac.in',
    courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'],
    establishedYear: 1961,
    description: 'Leading engineering institute with strong industry connections and research programs.'
  },
  {
    id: 'iit-madras',
    name: 'Indian Institute of Technology Madras',
    state: 'Tamil Nadu',
    city: 'Chennai',
    stream: ['Engineering'],
    nirfRank: 3,
    type: 'Government',
    website: 'https://www.iitm.ac.in',
    courses: ['Computer Science', 'Electrical Engineering', 'Aerospace Engineering', 'Ocean Engineering'],
    establishedYear: 1959,
    description: 'Top-ranked IIT known for innovation and technology development.'
  },
  {
    id: 'iit-kanpur',
    name: 'Indian Institute of Technology Kanpur',
    state: 'Uttar Pradesh',
    city: 'Kanpur',
    stream: ['Engineering'],
    nirfRank: 4,
    type: 'Government',
    website: 'https://www.iitk.ac.in',
    courses: ['Computer Science', 'Mechanical Engineering', 'Materials Science', 'Aerospace Engineering'],
    establishedYear: 1959,
    description: 'Prestigious IIT with strong emphasis on research and development.'
  },
  {
    id: 'iit-kharagpur',
    name: 'Indian Institute of Technology Kharagpur',
    state: 'West Bengal',
    city: 'Kharagpur',
    stream: ['Engineering'],
    nirfRank: 5,
    type: 'Government',
    website: 'https://www.iitkgp.ac.in',
    courses: ['Computer Science', 'Electronics', 'Mining Engineering', 'Architecture'],
    establishedYear: 1951,
    description: 'First IIT established in India with diverse engineering programs.'
  },

  // Medical Colleges
  {
    id: 'aiims-delhi',
    name: 'All India Institute of Medical Sciences Delhi',
    state: 'Delhi',
    city: 'New Delhi',
    stream: ['Medical'],
    nirfRank: 1,
    type: 'Government',
    website: 'https://www.aiims.edu',
    courses: ['MBBS', 'MD', 'MS', 'DM', 'MCh'],
    establishedYear: 1956,
    description: 'Premier medical institute of India with excellent healthcare and research facilities.'
  },
  {
    id: 'pgimer-chandigarh',
    name: 'Post Graduate Institute of Medical Education and Research',
    state: 'Chandigarh',
    city: 'Chandigarh',
    stream: ['Medical'],
    nirfRank: 2,
    type: 'Government',
    website: 'https://www.pgimer.edu.in',
    courses: ['MBBS', 'MD', 'MS', 'DM', 'MCh'],
    establishedYear: 1962,
    description: 'Leading medical institute in North India with advanced healthcare facilities.'
  },
  {
    id: 'cmc-vellore',
    name: 'Christian Medical College Vellore',
    state: 'Tamil Nadu',
    city: 'Vellore',
    stream: ['Medical'],
    nirfRank: 3,
    type: 'Private',
    website: 'https://www.cmcvellore.ac.in',
    courses: ['MBBS', 'MD', 'MS', 'Allied Health Sciences'],
    establishedYear: 1918,
    description: 'Renowned private medical college with a century-old legacy in healthcare education.'
  },

  // Commerce Colleges
  {
    id: 'srcc-delhi',
    name: 'Shri Ram College of Commerce',
    state: 'Delhi',
    city: 'New Delhi',
    stream: ['Commerce'],
    type: 'Government',
    website: 'https://www.srcc.du.ac.in',
    courses: ['B.Com (Hons)', 'B.A. Economics (Hons)', 'M.Com'],
    establishedYear: 1926,
    description: 'Premier commerce college under Delhi University with excellent placement records.'
  },
  {
    id: 'hansraj-delhi',
    name: 'Hansraj College',
    state: 'Delhi',
    city: 'New Delhi',
    stream: ['Commerce', 'Science'],
    type: 'Government',
    website: 'https://www.hansrajcollege.ac.in',
    courses: ['B.Com (Hons)', 'B.Sc. (Hons)', 'B.A. Economics'],
    establishedYear: 1948,
    description: 'Top-ranked college under Delhi University known for academic excellence.'
  },

  // Management Colleges
  {
    id: 'iim-ahmedabad',
    name: 'Indian Institute of Management Ahmedabad',
    state: 'Gujarat',
    city: 'Ahmedabad',
    stream: ['Management'],
    nirfRank: 1,
    type: 'Government',
    website: 'https://www.iima.ac.in',
    courses: ['PGP', 'MBA', 'Executive MBA', 'Fellow Programme'],
    establishedYear: 1961,
    description: 'Premier management institute with global recognition and excellent placements.'
  },
  {
    id: 'iim-bangalore',
    name: 'Indian Institute of Management Bangalore',
    state: 'Karnataka',
    city: 'Bangalore',
    stream: ['Management'],
    nirfRank: 2,
    type: 'Government',
    website: 'https://www.iimb.ac.in',
    courses: ['PGP', 'MBA', 'Executive Education', 'PhD'],
    establishedYear: 1973,
    description: 'Top IIM known for innovation, entrepreneurship and leadership development.'
  },

  // Law Colleges
  {
    id: 'nlu-delhi',
    name: 'National Law University Delhi',
    state: 'Delhi',
    city: 'New Delhi',
    stream: ['Law'],
    nirfRank: 1,
    type: 'Government',
    website: 'https://www.nludelhi.ac.in',
    courses: ['BA LLB', 'LLM', 'PhD'],
    establishedYear: 2008,
    description: 'Premier law university with focus on legal education and research.'
  },
  {
    id: 'nalsar-hyderabad',
    name: 'NALSAR University of Law',
    state: 'Telangana',
    city: 'Hyderabad',
    stream: ['Law'],
    nirfRank: 2,
    type: 'Government',
    website: 'https://www.nalsar.ac.in',
    courses: ['BA LLB', 'LLM', 'PhD', 'MBA'],
    establishedYear: 1998,
    description: 'Leading law university in South India with excellent academic programs.'
  },

  // Design Colleges
  {
    id: 'nid-ahmedabad',
    name: 'National Institute of Design Ahmedabad',
    state: 'Gujarat',
    city: 'Ahmedabad',
    stream: ['Design'],
    nirfRank: 1,
    type: 'Government',
    website: 'https://www.nid.edu',
    courses: ['Product Design', 'Communication Design', 'Textile Design', 'Animation'],
    establishedYear: 1961,
    description: 'Premier design institute fostering creativity and innovation in design education.'
  },

  // Arts & Humanities
  {
    id: 'jnu-delhi',
    name: 'Jawaharlal Nehru University',
    state: 'Delhi',
    city: 'New Delhi',
    stream: ['Arts & Humanities'],
    nirfRank: 1,
    type: 'Government',
    website: 'https://www.jnu.ac.in',
    courses: ['BA', 'MA', 'M.Phil', 'PhD'],
    establishedYear: 1969,
    description: 'Premier university for social sciences, languages and humanities.'
  },
  {
    id: 'du-delhi',
    name: 'University of Delhi',
    state: 'Delhi',
    city: 'New Delhi',
    stream: ['Arts & Humanities', 'Commerce', 'Science'],
    nirfRank: 2,
    type: 'Government',
    website: 'https://www.du.ac.in',
    courses: ['BA', 'B.Sc', 'B.Com', 'MA', 'M.Sc', 'M.Com'],
    establishedYear: 1922,
    description: 'One of India\'s largest and most prestigious universities.'
  }
];