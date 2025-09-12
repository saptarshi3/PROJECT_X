// Comprehensive Career Matches Data with detailed information
// Organized by clusters: Science, Commerce, Arts, Creative, Social, Vocational

export interface CareerMatchData {
  id: string;
  title: string;
  cluster: string;
  description: string;
  opportunities: string[];
  path: string;
  courses: string[];
  colleges: Array<{
    name: string;
    cutoff: string;
    fees: string;
    location?: string;
  }>;
  careers: string[];
  salaryRange: string;
  skills: string[];
  workEnvironments: string[];
  futureScope: string;
}

export const careerMatchesData: CareerMatchData[] = [
  // SCIENCE CLUSTER - Engineering
  {
    id: "software-engineer",
    title: "Software Engineer",
    cluster: "Science - Engineering",
    description: "Software Engineers design, develop, test, and maintain software applications and systems. They solve complex problems through programming and create innovative digital solutions.",
    opportunities: ["Tech Companies", "Startups", "MNCs", "Government", "Freelancing", "Product Companies"],
    path: "Class 12 Science (PCM) → B.Tech/B.E. Computer Science → Internships → Junior Developer → Senior Developer",
    courses: ["B.Tech Computer Science", "B.E. Information Technology", "BCA", "MCA", "M.Tech"],
    colleges: [
      { name: "IIT Bombay", cutoff: "JEE Rank < 100", fees: "₹2.5L/year", location: "Mumbai" },
      { name: "IIT Delhi", cutoff: "JEE Rank < 150", fees: "₹2.5L/year", location: "Delhi" },
      { name: "BITS Pilani", cutoff: "BITSAT > 350", fees: "₹5.5L/year", location: "Pilani" },
      { name: "VIT Vellore", cutoff: "VITEEE > 25,000", fees: "₹2.5L/year", location: "Vellore" }
    ],
    careers: ["Full Stack Developer", "Backend Developer", "Mobile App Developer", "DevOps Engineer", "System Architect"],
    salaryRange: "₹4-25 LPA",
    skills: ["Programming", "Problem Solving", "Data Structures", "Algorithms", "System Design"],
    workEnvironments: ["Tech Offices", "Remote Work", "Startup Environment", "Corporate"],
    futureScope: "Excellent growth with AI/ML integration, high demand globally, opportunities in emerging technologies like blockchain, IoT, and quantum computing"
  },
  
  {
    id: "pilot",
    title: "Commercial Pilot",
    cluster: "Science - Specialized",
    description: "Commercial Pilots operate aircraft for airlines, charter companies, and cargo services. They ensure safe transportation of passengers and goods while navigating complex flight systems.",
    opportunities: ["Airlines", "Charter Services", "Cargo Companies", "Government Aviation", "Flight Training", "Aviation Consulting"],
    path: "Class 12 Science (PCM) → CPL Training → ATPL → First Officer → Captain",
    courses: ["Commercial Pilot License (CPL)", "Airline Transport Pilot License (ATPL)", "Aircraft Maintenance Engineering"],
    colleges: [
      { name: "Indira Gandhi Rashtriya Uran Akademi", cutoff: "NDA/IGRUA Exam", fees: "₹25L total", location: "Fursatganj" },
      { name: "Government Flying Club", cutoff: "Pilot Aptitude Test", fees: "₹20L total", location: "Multiple Cities" },
      { name: "CAE Oxford Aviation Academy", cutoff: "International Standards", fees: "₹35L total", location: "Gondia" }
    ],
    careers: ["Airline Pilot", "Charter Pilot", "Flight Instructor", "Test Pilot", "Air Traffic Controller"],
    salaryRange: "₹8-50 LPA",
    skills: ["Aviation Knowledge", "Quick Decision Making", "Spatial Awareness", "Communication", "Leadership"],
    workEnvironments: ["Aircraft Cockpit", "Airports", "Flight Training Centers", "Airlines"],
    futureScope: "Growing aviation industry in India, international opportunities, potential for airline management roles"
  },

  {
    id: "doctor",
    title: "Medical Doctor",
    cluster: "Science - Medical",
    description: "Medical Doctors diagnose, treat, and prevent diseases and injuries. They provide healthcare services, conduct medical research, and work to improve patient outcomes.",
    opportunities: ["Hospitals", "Private Practice", "Research", "Public Health", "Medical Education", "Pharmaceuticals"],
    path: "Class 12 Science (PCB) → NEET → MBBS → Internship → MD/MS → Specialist",
    courses: ["MBBS", "MD (Doctor of Medicine)", "MS (Master of Surgery)", "Diploma Courses"],
    colleges: [
      { name: "AIIMS Delhi", cutoff: "NEET Rank < 100", fees: "₹5,500/year", location: "Delhi" },
      { name: "Christian Medical College", cutoff: "NEET Rank < 500", fees: "₹80K/year", location: "Vellore" },
      { name: "Armed Forces Medical College", cutoff: "NEET + AFMC Test", fees: "Free (Bond)", location: "Pune" },
      { name: "King George Medical University", cutoff: "NEET State Rank < 1000", fees: "₹50K/year", location: "Lucknow" }
    ],
    careers: ["General Physician", "Surgeon", "Cardiologist", "Neurologist", "Pediatrician", "Radiologist"],
    salaryRange: "₹6-50 LPA",
    skills: ["Medical Knowledge", "Empathy", "Critical Thinking", "Communication", "Precision"],
    workEnvironments: ["Hospitals", "Clinics", "Research Labs", "Medical Colleges", "Community Health Centers"],
    futureScope: "Always high demand, specialization opportunities, medical technology integration, telemedicine growth"
  },

  {
    id: "data-scientist",
    title: "Data Scientist",
    cluster: "Science - Technology",
    description: "Data Scientists extract insights from large datasets using statistical methods, machine learning, and programming to help organizations make data-driven decisions.",
    opportunities: ["Tech Companies", "Financial Services", "Healthcare", "E-commerce", "Consulting", "Research"],
    path: "Class 12 Science (PCM) → B.Tech/B.Sc. → Data Science Certification → Junior Analyst → Data Scientist",
    courses: ["B.Tech Computer Science", "B.Sc. Statistics", "M.Sc. Data Science", "Certification Courses"],
    colleges: [
      { name: "Indian Statistical Institute", cutoff: "ISI Admission Test", fees: "₹15K/year", location: "Kolkata" },
      { name: "IIT Hyderabad", cutoff: "JEE Advanced", fees: "₹2.5L/year", location: "Hyderabad" },
      { name: "IIIT Bangalore", cutoff: "GATE Score", fees: "₹3L/year", location: "Bangalore" }
    ],
    careers: ["Machine Learning Engineer", "Business Analyst", "Research Scientist", "AI Specialist", "Quantitative Analyst"],
    salaryRange: "₹8-40 LPA",
    skills: ["Statistics", "Programming (Python/R)", "Machine Learning", "Data Visualization", "Business Acumen"],
    workEnvironments: ["Tech Offices", "Research Labs", "Corporate", "Remote Work", "Startups"],
    futureScope: "Explosive growth with AI boom, high demand across industries, emerging roles in AI ethics and governance"
  },

  // COMMERCE CLUSTER
  {
    id: "chartered-accountant",
    title: "Chartered Accountant (CA)",
    cluster: "Commerce - Finance",
    description: "Chartered Accountants provide financial expertise including auditing, taxation, financial planning, and business advisory services to individuals and organizations.",
    opportunities: ["Public Practice", "Industry", "Government", "International Firms", "Consulting", "Banking"],
    path: "Class 12 Commerce → CA Foundation → CA Intermediate → Articleship → CA Final → Practice",
    courses: ["CA Foundation", "CA Intermediate", "CA Final", "Articleship Training"],
    colleges: [
      { name: "Institute of Chartered Accountants of India", cutoff: "CA Entrance", fees: "₹1.5L total", location: "All India" },
      { name: "Shri Ram College of Commerce", cutoff: "95%+ in Commerce", fees: "₹20K/year", location: "Delhi" },
      { name: "Loyola College", cutoff: "90%+ in Commerce", fees: "₹15K/year", location: "Chennai" }
    ],
    careers: ["Auditor", "Tax Consultant", "Financial Analyst", "CFO", "Investment Advisor", "Forensic Accountant"],
    salaryRange: "₹6-35 LPA",
    skills: ["Accounting", "Taxation", "Financial Analysis", "Audit", "Compliance", "Business Advisory"],
    workEnvironments: ["CA Firms", "Corporate Offices", "Banks", "Government", "Client Sites"],
    futureScope: "Digital transformation opportunities, international certifications, growing demand for financial advisory"
  },

  {
    id: "investment-banker",
    title: "Investment Banker",
    cluster: "Commerce - Finance",
    description: "Investment Bankers help corporations, governments, and institutions raise capital, provide strategic financial advice, and facilitate mergers and acquisitions.",
    opportunities: ["Investment Banks", "Private Equity", "Hedge Funds", "Corporate Finance", "Wealth Management", "Consulting"],
    path: "Class 12 Commerce → BBA/B.Com → MBA Finance → Analyst → Associate → VP",
    courses: ["BBA", "B.Com", "MBA Finance", "CFA", "FRM"],
    colleges: [
      { name: "IIM Ahmedabad", cutoff: "CAT 99%+", fees: "₹25L total", location: "Ahmedabad" },
      { name: "IIM Bangalore", cutoff: "CAT 98%+", fees: "₹24L total", location: "Bangalore" },
      { name: "XLRI Jamshedpur", cutoff: "XAT 95%+", fees: "₹25L total", location: "Jamshedpur" },
      { name: "FMS Delhi", cutoff: "CAT 98%+", fees: "₹20K total", location: "Delhi" }
    ],
    careers: ["Equity Research Analyst", "M&A Specialist", "Portfolio Manager", "Risk Manager", "Venture Capitalist"],
    salaryRange: "₹15-80 LPA",
    skills: ["Financial Modeling", "Valuation", "Market Analysis", "Communication", "Networking", "Deal Structuring"],
    workEnvironments: ["Financial Districts", "Corporate Offices", "Client Meetings", "International Travel"],
    futureScope: "Fintech integration, sustainable finance growing, international opportunities, wealth management expansion"
  },

  {
    id: "entrepreneur",
    title: "Entrepreneur",
    cluster: "Commerce - Business",
    description: "Entrepreneurs identify business opportunities, create innovative solutions, and build companies from the ground up. They take calculated risks to create value and drive economic growth.",
    opportunities: ["Startups", "Small Business", "E-commerce", "Tech Ventures", "Social Enterprises", "Franchising"],
    path: "Class 12 Commerce → BBA/B.Com → MBA/Experience → Idea Development → Startup Launch → Scale",
    courses: ["BBA", "B.Com", "MBA", "Entrepreneurship Certification", "Industry-specific courses"],
    colleges: [
      { name: "Indian School of Business", cutoff: "GMAT 700+", fees: "₹35L total", location: "Hyderabad" },
      { name: "IIM Bangalore", cutoff: "CAT 98%+", fees: "₹24L total", location: "Bangalore" },
      { name: "NMIMS Mumbai", cutoff: "NMAT 85%", fees: "₹18L total", location: "Mumbai" }
    ],
    careers: ["Startup Founder", "Business Owner", "Franchise Owner", "Social Entrepreneur", "Serial Entrepreneur"],
    salaryRange: "₹0-Unlimited (Variable)",
    skills: ["Leadership", "Innovation", "Risk Management", "Marketing", "Financial Planning", "Networking"],
    workEnvironments: ["Own Office", "Co-working Spaces", "Client Locations", "Home Office", "Travel"],
    futureScope: "Government support for startups, digital economy growth, emerging sectors like cleantech and healthtech"
  },

  {
    id: "economist",
    title: "Economist",
    cluster: "Commerce - Economics",
    description: "Economists study the production and distribution of resources, goods, and services by collecting and analyzing data, researching trends, and evaluating economic issues for businesses, governments, and organizations.",
    opportunities: ["Government", "Research Institutes", "Banks", "Consulting", "International Organizations", "Academia"],
    path: "Class 12 Commerce → B.A./B.Com Economics → M.A. Economics → Research/Job → Ph.D. (optional)",
    courses: ["B.A. Economics", "B.Com Economics", "M.A. Economics", "M.Phil Economics", "Ph.D. Economics"],
    colleges: [
      { name: "Delhi School of Economics", cutoff: "DU Economics Entrance", fees: "₹15K/year", location: "Delhi" },
      { name: "Indian Statistical Institute", cutoff: "ISI Admission Test", fees: "₹15K/year", location: "Kolkata" },
      { name: "Madras School of Economics", cutoff: "MSE Entrance", fees: "₹80K/year", location: "Chennai" },
      { name: "Gokhale Institute of Politics", cutoff: "GIPE Entrance", fees: "₹25K/year", location: "Pune" }
    ],
    careers: ["Economic Analyst", "Policy Researcher", "Financial Economist", "Development Economist", "Econometrician"],
    salaryRange: "₹4-20 LPA",
    skills: ["Statistical Analysis", "Economic Modeling", "Data Analysis", "Research", "Critical Thinking", "Writing"],
    workEnvironments: ["Government Offices", "Research Centers", "Banks", "Consulting Firms", "Universities"],
    futureScope: "Growing demand for data-driven policy making, economic consulting, fintech sector growth, development economics focus"
  },

  {
    id: "market-research-analyst",
    title: "Market Research Analyst",
    cluster: "Commerce - Marketing",
    description: "Market Research Analysts study market conditions to examine potential sales of products and services. They help companies understand what people want, who will buy products, and at what price.",
    opportunities: ["Market Research Firms", "Consulting", "Corporates", "Advertising Agencies", "Government", "Startups"],
    path: "Class 12 Commerce → BBA/B.Com → MBA Marketing/Market Research Certification → Analyst → Senior Analyst",
    courses: ["BBA", "B.Com", "MBA Marketing", "Market Research Certification", "Data Analytics Courses"],
    colleges: [
      { name: "IIM Ahmedabad", cutoff: "CAT 99%+", fees: "₹25L total", location: "Ahmedabad" },
      { name: "Xavier School of Management", cutoff: "XAT 95%+", fees: "₹25L total", location: "Jamshedpur" },
      { name: "Symbiosis Institute of Business", cutoff: "SNAP 90%+", fees: "₹22L total", location: "Pune" },
      { name: "Narsee Monjee Institute", cutoff: "NMAT 85%+", fees: "₹18L total", location: "Mumbai" }
    ],
    careers: ["Market Research Analyst", "Consumer Insights Analyst", "Business Analyst", "Brand Analyst", "Product Manager"],
    salaryRange: "₹4-18 LPA",
    skills: ["Statistical Analysis", "Survey Design", "Data Interpretation", "Report Writing", "Consumer Psychology", "Software Tools"],
    workEnvironments: ["Corporate Offices", "Research Firms", "Client Sites", "Remote Work", "Field Research"],
    futureScope: "Digital marketing growth, big data analytics, AI-powered insights, e-commerce expansion, consumer behavior evolution"
  },

  {
    id: "business-economist",
    title: "Business Economist",
    cluster: "Commerce - Business Analysis",
    description: "Business Economists apply economic theory and quantitative methods to analyze business issues, market trends, and help organizations make strategic decisions based on economic principles.",
    opportunities: ["Corporations", "Consulting Firms", "Financial Services", "Government", "International Organizations", "Research"],
    path: "Class 12 Commerce → Economics Degree → MBA/M.A. Economics → Business Analyst → Senior Economist",
    courses: ["B.A./B.Com Economics", "MBA", "M.A. Economics", "Business Analytics", "Financial Economics"],
    colleges: [
      { name: "Indian School of Business", cutoff: "GMAT 700+", fees: "₹35L total", location: "Hyderabad" },
      { name: "Delhi School of Economics", cutoff: "DU Economics", fees: "₹15K/year", location: "Delhi" },
      { name: "IIM Calcutta", cutoff: "CAT 98%+", fees: "₹24L total", location: "Kolkata" },
      { name: "Xavier School of Management", cutoff: "XAT 95%+", fees: "₹25L total", location: "Jamshedpur" }
    ],
    careers: ["Business Economist", "Economic Consultant", "Strategic Analyst", "Market Economist", "Policy Analyst"],
    salaryRange: "₹6-25 LPA",
    skills: ["Economic Analysis", "Financial Modeling", "Strategic Thinking", "Data Analysis", "Forecasting", "Business Strategy"],
    workEnvironments: ["Corporate Head Offices", "Consulting Firms", "Government", "International Organizations", "Research Centers"],
    futureScope: "Strategic consulting growth, data-driven decision making, international business expansion, policy advisory roles"
  },

  {
    id: "policy-analyst",
    title: "Policy Analyst",
    cluster: "Commerce - Public Policy",
    description: "Policy Analysts research, analyze, and evaluate government policies and programs. They study social and economic issues to help develop effective policies and provide recommendations to decision-makers.",
    opportunities: ["Government", "Think Tanks", "NGOs", "International Organizations", "Consulting", "Research Institutes"],
    path: "Class 12 Commerce → Public Policy/Economics/Political Science → Masters → Internships → Analyst → Senior Analyst",
    courses: ["Public Policy", "Economics", "Political Science", "Public Administration", "Development Studies"],
    colleges: [
      { name: "Tata Institute of Social Sciences", cutoff: "TISS Entrance", fees: "₹1.5L/year", location: "Mumbai" },
      { name: "Jawaharlal Nehru University", cutoff: "JNU Entrance", fees: "₹5K/year", location: "Delhi" },
      { name: "Indian Institute of Technology Delhi", cutoff: "GATE", fees: "₹2L/year", location: "Delhi" },
      { name: "Central University of Rajasthan", cutoff: "CUET", fees: "₹25K/year", location: "Rajasthan" }
    ],
    careers: ["Policy Analyst", "Program Evaluator", "Research Associate", "Policy Advisor", "Development Consultant"],
    salaryRange: "₹4-15 LPA",
    skills: ["Policy Research", "Data Analysis", "Report Writing", "Stakeholder Engagement", "Critical Thinking", "Public Speaking"],
    workEnvironments: ["Government Offices", "Think Tanks", "NGO Offices", "Research Centers", "Field Work"],
    futureScope: "Evidence-based policy making, digital governance, sustainable development focus, international development cooperation"
  },

  {
    id: "business-manager",
    title: "Business Manager",
    cluster: "Commerce - Management",
    description: "Business Managers oversee business operations, develop strategies, manage teams, and ensure organizational goals are met. They coordinate various business functions to drive growth and efficiency.",
    opportunities: ["Corporations", "Small Businesses", "Startups", "Consulting", "Government", "Non-Profit"],
    path: "Class 12 Commerce → BBA/B.Com → MBA/Experience → Management Trainee → Assistant Manager → Manager",
    courses: ["BBA", "B.Com", "MBA", "PGDM", "Executive Management Programs"],
    colleges: [
      { name: "IIM Bangalore", cutoff: "CAT 98%+", fees: "₹24L total", location: "Bangalore" },
      { name: "XLRI Jamshedpur", cutoff: "XAT 95%+", fees: "₹25L total", location: "Jamshedpur" },
      { name: "FMS Delhi", cutoff: "CAT 98%+", fees: "₹20K total", location: "Delhi" },
      { name: "Shailesh J. Mehta School", cutoff: "CAT 90%+", fees: "₹20L total", location: "Mumbai" }
    ],
    careers: ["General Manager", "Operations Manager", "Project Manager", "Business Development Manager", "Strategic Manager"],
    salaryRange: "₹5-30 LPA",
    skills: ["Leadership", "Strategic Planning", "Operations Management", "Team Management", "Financial Analysis", "Communication"],
    workEnvironments: ["Corporate Offices", "Branch Offices", "Client Sites", "Remote Work", "Travel"],
    futureScope: "Digital transformation leadership, sustainable business practices, global business opportunities, startup ecosystem growth"
  },

  // ARTS CLUSTER
  {
    id: "ias-officer",
    title: "IAS Officer",
    cluster: "Arts - Government",
    description: "IAS Officers are the backbone of Indian administration, responsible for policy implementation, governance, and public service delivery at district, state, and central levels.",
    opportunities: ["District Administration", "State Government", "Central Government", "International Organizations", "Policy Making", "Development Programs"],
    path: "Class 12 Arts → Graduate Degree → UPSC CSE → Foundation Course → Field Training → Service",
    courses: ["Any Graduate Degree", "UPSC CSE Preparation", "Foundation Course at LBSNAA"],
    colleges: [
      { name: "St. Stephen's College", cutoff: "95%+ in Arts", fees: "₹40K/year", location: "Delhi" },
      { name: "Hindu College", cutoff: "93%+ in Arts", fees: "₹15K/year", location: "Delhi" },
      { name: "Presidency College", cutoff: "90%+ in Arts", fees: "₹10K/year", location: "Kolkata" },
      { name: "Fergusson College", cutoff: "85%+ in Arts", fees: "₹20K/year", location: "Pune" }
    ],
    careers: ["District Magistrate", "Joint Secretary", "Secretary", "Commissioner", "Ambassador"],
    salaryRange: "₹8-25 LPA (with perks)",
    skills: ["Leadership", "Public Administration", "Policy Analysis", "Communication", "Problem Solving", "Ethics"],
    workEnvironments: ["Government Offices", "Field Locations", "Courts", "Community", "Policy Meetings"],
    futureScope: "Digital governance initiatives, international assignments, policy innovation, sustainable development focus"
  },

  {
    id: "lawyer",
    title: "Lawyer",
    cluster: "Arts - Law",
    description: "Lawyers provide legal advice, represent clients in court proceedings, draft legal documents, and ensure justice through proper application of law and legal procedures.",
    opportunities: ["Law Firms", "Corporate Legal", "Government Legal", "Judiciary", "Legal Consulting", "Academia"],
    path: "Class 12 Arts → LLB (5 years) or Graduate → LLB (3 years) → Bar Exam → Practice/Job",
    courses: ["BA LLB", "BBA LLB", "LLB", "LLM", "Specialized Law Courses"],
    colleges: [
      { name: "National Law School of India", cutoff: "CLAT Rank < 50", fees: "₹2.5L/year", location: "Bangalore" },
      { name: "NALSAR University", cutoff: "CLAT Rank < 100", fees: "₹2L/year", location: "Hyderabad" },
      { name: "Rajiv Gandhi School of Law", cutoff: "CLAT Rank < 200", fees: "₹1.5L/year", location: "Mumbai" },
      { name: "Faculty of Law, Delhi University", cutoff: "DU LLB Entrance", fees: "₹15K/year", location: "Delhi" }
    ],
    careers: ["Corporate Lawyer", "Criminal Lawyer", "Civil Lawyer", "Judge", "Legal Advisor", "Legal Consultant"],
    salaryRange: "₹3-50 LPA",
    skills: ["Legal Research", "Advocacy", "Legal Writing", "Critical Thinking", "Communication", "Ethics"],
    workEnvironments: ["Law Firms", "Courts", "Corporate Offices", "Government", "Client Meetings"],
    futureScope: "Legal tech adoption, international law opportunities, corporate compliance growth, alternative dispute resolution"
  },

  {
    id: "journalist",
    title: "Journalist",
    cluster: "Arts - Media",
    description: "Journalists research, investigate, and report news and current events through various media platforms. They inform the public and hold institutions accountable through factual reporting.",
    opportunities: ["Newspapers", "Television", "Digital Media", "Radio", "Magazines", "Freelance", "International Media"],
    path: "Class 12 Arts → Mass Communication/Journalism → Internships → Reporter → Senior Journalist → Editor",
    courses: ["BA Journalism", "Mass Communication", "MA Journalism", "Digital Media Courses"],
    colleges: [
      { name: "Indian Institute of Mass Communication", cutoff: "IIMC Entrance", fees: "₹50K/year", location: "Delhi" },
      { name: "Xavier Institute of Communications", cutoff: "XIC Entrance", fees: "₹80K/year", location: "Mumbai" },
      { name: "Symbiosis Institute of Media", cutoff: "SET Entrance", fees: "₹2.5L/year", location: "Pune" }
    ],
    careers: ["News Reporter", "Editor", "News Anchor", "Documentary Filmmaker", "Content Writer", "Media Analyst"],
    salaryRange: "₹3-20 LPA",
    skills: ["Writing", "Research", "Communication", "Investigation", "Digital Media", "Ethics"],
    workEnvironments: ["Newsrooms", "Field Reporting", "Studios", "Remote Work", "Travel"],
    futureScope: "Digital journalism growth, multimedia storytelling, data journalism, international correspondencies"
  },

  // CREATIVE CLUSTER
  {
    id: "architect",
    title: "Architect",
    cluster: "Creative - Architecture",
    description: "Architects design buildings and spaces that are functional, safe, and aesthetically pleasing. They combine artistic vision with technical knowledge to create sustainable environments.",
    opportunities: ["Architectural Firms", "Real Estate", "Government", "Urban Planning", "Interior Design", "Freelance Practice"],
    path: "Class 12 (Any Stream) → B.Arch → Internship → Junior Architect → Licensed Architect → Principal Architect",
    courses: ["B.Arch", "M.Arch", "Urban Planning", "Interior Design"],
    colleges: [
      { name: "IIT Kharagpur", cutoff: "JEE Advanced + AAT", fees: "₹2.5L/year", location: "Kharagpur" },
      { name: "SPA Delhi", cutoff: "JEE Main + AAT", fees: "₹1L/year", location: "Delhi" },
      { name: "CEPT University", cutoff: "CEPT Entrance", fees: "₹2.5L/year", location: "Ahmedabad" },
      { name: "Sir JJ College of Architecture", cutoff: "MHT-CET", fees: "₹50K/year", location: "Mumbai" }
    ],
    careers: ["Design Architect", "Project Architect", "Urban Planner", "Landscape Architect", "Conservation Architect"],
    salaryRange: "₹4-30 LPA",
    skills: ["Design", "Technical Drawing", "Project Management", "3D Modeling", "Building Codes", "Sustainability"],
    workEnvironments: ["Design Studios", "Construction Sites", "Client Offices", "Government Buildings"],
    futureScope: "Sustainable architecture focus, smart cities development, BIM technology adoption, green building demand"
  },

  {
    id: "graphic-designer",
    title: "Graphic Designer",
    cluster: "Creative - Design",
    description: "Graphic Designers create visual communications using typography, imagery, and layout techniques. They design for digital and print media to convey messages effectively.",
    opportunities: ["Design Agencies", "Advertising", "Digital Marketing", "Publishing", "Corporate", "Freelance"],
    path: "Class 12 (Any) → Graphic Design Course → Portfolio Development → Junior Designer → Senior Designer → Art Director",
    courses: ["BFA Graphic Design", "Diploma in Graphic Design", "Animation Courses", "Digital Design Certification"],
    colleges: [
      { name: "National Institute of Design", cutoff: "NID Entrance", fees: "₹3L/year", location: "Ahmedabad" },
      { name: "Pearl Academy", cutoff: "Pearl Entrance", fees: "₹4L/year", location: "Multiple Cities" },
      { name: "MIT Institute of Design", cutoff: "MITID Entrance", fees: "₹5L/year", location: "Pune" }
    ],
    careers: ["UI/UX Designer", "Art Director", "Brand Designer", "Web Designer", "Packaging Designer"],
    salaryRange: "₹3-25 LPA",
    skills: ["Adobe Creative Suite", "Typography", "Color Theory", "Layout Design", "Brand Development", "Digital Tools"],
    workEnvironments: ["Design Studios", "Agencies", "Corporate Offices", "Remote Work", "Client Meetings"],
    futureScope: "Digital design growth, AR/VR design opportunities, sustainable design focus, AI-assisted design tools"
  },

  // SOCIAL CLUSTER
  {
    id: "psychologist",
    title: "Clinical Psychologist",
    cluster: "Social - Psychology",
    description: "Clinical Psychologists assess, diagnose, and treat mental health disorders. They provide therapy, counseling, and psychological interventions to improve mental well-being.",
    opportunities: ["Hospitals", "Mental Health Clinics", "Private Practice", "Schools", "Corporate Wellness", "Research"],
    path: "Class 12 (Any) → BA Psychology → MA Psychology → M.Phil Clinical → Practice License",
    courses: ["BA Psychology", "MA Clinical Psychology", "M.Phil Clinical Psychology", "PhD Psychology"],
    colleges: [
      { name: "Tata Institute of Social Sciences", cutoff: "TISS Entrance", fees: "₹1.5L/year", location: "Mumbai" },
      { name: "Christ University", cutoff: "Christ Entrance", fees: "₹2L/year", location: "Bangalore" },
      { name: "Jamia Millia Islamia", cutoff: "JMI Entrance", fees: "₹20K/year", location: "Delhi" }
    ],
    careers: ["Clinical Psychologist", "Counseling Psychologist", "School Psychologist", "Forensic Psychologist", "Research Psychologist"],
    salaryRange: "₹3-15 LPA",
    skills: ["Psychological Assessment", "Therapy Techniques", "Counseling", "Research", "Empathy", "Communication"],
    workEnvironments: ["Hospitals", "Clinics", "Schools", "Private Practice", "Research Centers"],
    futureScope: "Growing mental health awareness, teletherapy expansion, corporate wellness programs, integrated healthcare"
  },

  // VOCATIONAL CLUSTER
  {
    id: "chef",
    title: "Professional Chef",
    cluster: "Vocational - Culinary",
    description: "Professional Chefs plan menus, prepare food, manage kitchen operations, and create culinary experiences in restaurants, hotels, and catering services.",
    opportunities: ["Restaurants", "Hotels", "Catering", "Food Media", "Culinary Education", "Food Consulting"],
    path: "Class 12 (Any) → Hotel Management/Culinary Arts → Kitchen Training → Commis Chef → Chef de Partie → Executive Chef",
    courses: ["Hotel Management", "Culinary Arts", "Food Production", "Bakery & Confectionery"],
    colleges: [
      { name: "Institute of Hotel Management (IHM)", cutoff: "NCHM JEE", fees: "₹2L/year", location: "Multiple Cities" },
      { name: "Welcomgroup Graduate School", cutoff: "WGSHA Entrance", fees: "₹4L/year", location: "Manipal" },
      { name: "Oberoi Centre of Learning", cutoff: "OCLD Entrance", fees: "₹6L/year", location: "Delhi" }
    ],
    careers: ["Executive Chef", "Sous Chef", "Pastry Chef", "Food Stylist", "Restaurant Owner", "Culinary Instructor"],
    salaryRange: "₹3-20 LPA",
    skills: ["Culinary Techniques", "Menu Planning", "Kitchen Management", "Food Safety", "Creativity", "Leadership"],
    workEnvironments: ["Restaurant Kitchens", "Hotels", "Catering Facilities", "Food Studios", "Culinary Schools"],
    futureScope: "Food delivery growth, celebrity chef culture, international cuisine demand, sustainable cooking practices"
  },

  {
    id: "hotel-manager",
    title: "Hotel Manager",
    cluster: "Vocational - Hospitality",
    description: "Hotel Managers oversee daily operations of hotels and resorts, ensuring guest satisfaction, managing staff, and maintaining service standards while maximizing profitability.",
    opportunities: ["Hotels", "Resorts", "Cruise Lines", "Event Management", "Tourism", "Corporate Hospitality"],
    path: "Class 12 (Any) → Hotel Management → Management Trainee → Assistant Manager → Manager → General Manager",
    courses: ["BHM (Bachelor of Hotel Management)", "MBA Hospitality", "Diploma in Hotel Management"],
    colleges: [
      { name: "IHM Mumbai", cutoff: "NCHM JEE Rank < 500", fees: "₹1.5L/year", location: "Mumbai" },
      { name: "IHM Delhi", cutoff: "NCHM JEE Rank < 300", fees: "₹1.5L/year", location: "Delhi" },
      { name: "Taj School of Hotel Management", cutoff: "Taj Entrance", fees: "₹8L/year", location: "Mumbai" }
    ],
    careers: ["General Manager", "Operations Manager", "Front Office Manager", "F&B Manager", "Event Manager"],
    salaryRange: "₹4-25 LPA",
    skills: ["Operations Management", "Customer Service", "Leadership", "Financial Management", "Communication", "Problem Solving"],
    workEnvironments: ["Hotels", "Resorts", "Conference Centers", "Cruise Ships", "Event Venues"],
    futureScope: "Hospitality tech integration, sustainable tourism growth, luxury segment expansion, international opportunities"
  }
];

// Career clusters for filtering and categorization
export const careerClusters = [
  { id: "science", name: "Science", color: "from-blue-500 to-purple-600", icon: "⚗️" },
  { id: "commerce", name: "Commerce", color: "from-emerald-500 to-teal-600", icon: "💼" },
  { id: "arts", name: "Arts", color: "from-purple-500 to-pink-600", icon: "📚" },
  { id: "creative", name: "Creative", color: "from-pink-500 to-orange-600", icon: "🎨" },
  { id: "social", name: "Social", color: "from-green-500 to-emerald-600", icon: "❤️" },
  { id: "vocational", name: "Vocational", color: "from-orange-500 to-red-600", icon: "🛠️" }
];

// Get careers by cluster
export const getCareersByCluster = (clusterId: string): CareerMatchData[] => {
  return careerMatchesData.filter(career => 
    career.cluster.toLowerCase().includes(clusterId.toLowerCase())
  );
};

// Get all careers
export const getAllCareers = (): CareerMatchData[] => {
  return careerMatchesData;
};