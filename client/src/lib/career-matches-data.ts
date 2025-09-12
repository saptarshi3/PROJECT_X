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

  // ENGINEERING CLUSTER
  {
    id: "mechanical-engineer",
    title: "Mechanical Engineer",
    cluster: "Science - Engineering",
    description: "Mechanical Engineers design, develop, build, and test mechanical and thermal sensors and devices. They work on engines, machines, and various mechanical systems across industries.",
    opportunities: ["Manufacturing", "Automotive", "Aerospace", "Energy", "Consulting", "R&D", "Government"],
    path: "Class 12 Science (PCM) → JEE Main/Advanced → B.Tech Mechanical → Internships → Junior Engineer → Senior Engineer",
    courses: ["B.Tech Mechanical Engineering", "M.Tech Mechanical", "Diploma in Mechanical", "CAD/CAM Certification"],
    colleges: [
      { name: "IIT Bombay", cutoff: "JEE Advanced Rank < 500", fees: "₹2.5L/year", location: "Mumbai" },
      { name: "IIT Delhi", cutoff: "JEE Advanced Rank < 600", fees: "₹2.5L/year", location: "Delhi" },
      { name: "NIT Trichy", cutoff: "JEE Main Rank < 2000", fees: "₹1.5L/year", location: "Trichy" },
      { name: "BITS Pilani", cutoff: "BITSAT > 320", fees: "₹5.5L/year", location: "Pilani" }
    ],
    careers: ["Design Engineer", "Production Engineer", "Quality Engineer", "Project Manager", "R&D Engineer", "Consultant"],
    salaryRange: "₹4-30 LPA",
    skills: ["CAD/CAM", "Thermodynamics", "Machine Design", "Manufacturing Processes", "Project Management", "Problem Solving"],
    workEnvironments: ["Manufacturing Plants", "Design Studios", "R&D Labs", "Construction Sites", "Corporate Offices"],
    futureScope: "Industry 4.0 integration, renewable energy focus, automation and robotics, sustainable manufacturing"
  },

  {
    id: "civil-engineer",
    title: "Civil Engineer",
    cluster: "Science - Engineering",
    description: "Civil Engineers design, build, supervise, operate, and maintain construction projects and systems in public and private sectors, including roads, buildings, airports, tunnels, dams, and bridges.",
    opportunities: ["Construction", "Infrastructure", "Government", "Real Estate", "Consulting", "Urban Planning", "Environmental"],
    path: "Class 12 Science (PCM) → JEE Main → B.Tech Civil → Internships → Junior Engineer → Project Engineer → Manager",
    courses: ["B.Tech Civil Engineering", "M.Tech Structural/Environmental", "Diploma in Civil", "Project Management"],
    colleges: [
      { name: "IIT Madras", cutoff: "JEE Advanced Rank < 800", fees: "₹2.5L/year", location: "Chennai" },
      { name: "NIT Warangal", cutoff: "JEE Main Rank < 3000", fees: "₹1.5L/year", location: "Warangal" },
      { name: "Delhi Technological University", cutoff: "JEE Main Rank < 8000", fees: "₹1.5L/year", location: "Delhi" },
      { name: "Jadavpur University", cutoff: "WBJEE Rank < 2000", fees: "₹50K/year", location: "Kolkata" }
    ],
    careers: ["Structural Engineer", "Project Manager", "Site Engineer", "Urban Planner", "Environmental Engineer", "Consultant"],
    salaryRange: "₹3-25 LPA",
    skills: ["AutoCAD", "Structural Analysis", "Project Management", "Construction Management", "Environmental Planning", "Site Supervision"],
    workEnvironments: ["Construction Sites", "Design Offices", "Government Departments", "Consulting Firms", "Field Locations"],
    futureScope: "Smart cities development, green building technologies, infrastructure modernization, disaster-resistant construction"
  },

  {
    id: "aerospace-engineer",
    title: "Aerospace Engineer",
    cluster: "Science - Engineering",
    description: "Aerospace Engineers design aircraft, spacecraft, satellites, and missiles. They develop new technologies for use in aviation, defense systems, and space exploration.",
    opportunities: ["ISRO", "DRDO", "HAL", "Private Aerospace", "Airlines", "Defense", "Research Institutes"],
    path: "Class 12 Science (PCM) → JEE Advanced → B.Tech Aerospace → Internships → Junior Engineer → Systems Engineer",
    courses: ["B.Tech Aerospace Engineering", "M.Tech Aeronautical", "Aircraft Maintenance Engineering", "Space Technology"],
    colleges: [
      { name: "IIT Bombay", cutoff: "JEE Advanced Rank < 300", fees: "₹2.5L/year", location: "Mumbai" },
      { name: "IIT Madras", cutoff: "JEE Advanced Rank < 400", fees: "₹2.5L/year", location: "Chennai" },
      { name: "IIT Kanpur", cutoff: "JEE Advanced Rank < 500", fees: "₹2.5L/year", location: "Kanpur" },
      { name: "Indian Institute of Space Science", cutoff: "IIST Entrance", fees: "Free", location: "Thiruvananthapuram" }
    ],
    careers: ["Aircraft Design Engineer", "Flight Test Engineer", "Systems Engineer", "Mission Analyst", "Avionics Engineer"],
    salaryRange: "₹6-40 LPA",
    skills: ["Aerodynamics", "Propulsion", "Avionics", "Materials Science", "Flight Dynamics", "System Integration"],
    workEnvironments: ["ISRO Centers", "Aircraft Manufacturing", "Defense Labs", "Testing Facilities", "Mission Control"],
    futureScope: "Space missions expansion, commercial space industry, drone technology, sustainable aviation fuels"
  },

  {
    id: "robotics-engineer",
    title: "Robotics Engineer",
    cluster: "Science - Engineering",
    description: "Robotics Engineers design, build, and maintain robots and robotic systems. They work on automation, AI integration, and developing robotic solutions for various industries.",
    opportunities: ["Manufacturing", "Healthcare", "Defense", "Tech Companies", "Research Labs", "Startups", "Automotive"],
    path: "Class 12 Science (PCM) → B.Tech (CS/EE/Mech) → Robotics Specialization → Internships → Robotics Engineer",
    courses: ["B.Tech Computer Science", "B.Tech Electronics", "M.Tech Robotics", "AI/ML Certification"],
    colleges: [
      { name: "IIT Delhi", cutoff: "JEE Advanced Rank < 200", fees: "₹2.5L/year", location: "Delhi" },
      { name: "IIT Kanpur", cutoff: "JEE Advanced Rank < 300", fees: "₹2.5L/year", location: "Kanpur" },
      { name: "IISc Bangalore", cutoff: "KVPY/JEE Advanced", fees: "₹25K/year", location: "Bangalore" },
      { name: "IIIT Hyderabad", cutoff: "JEE Main Rank < 1000", fees: "₹3L/year", location: "Hyderabad" }
    ],
    careers: ["Automation Engineer", "AI Robotics Engineer", "Control Systems Engineer", "Research Scientist", "Product Developer"],
    salaryRange: "₹6-45 LPA",
    skills: ["Programming (C++/Python)", "Control Systems", "AI/ML", "Computer Vision", "Mechanical Design", "Electronics"],
    workEnvironments: ["R&D Labs", "Manufacturing Plants", "Tech Companies", "Research Institutes", "Startups"],
    futureScope: "Industrial automation growth, AI integration, service robots, autonomous vehicles, space robotics"
  },

  // MEDICAL SPECIALIZATION
  {
    id: "surgeon",
    title: "Surgeon",
    cluster: "Science - Medical",
    description: "Surgeons perform operations to treat diseases, injuries, and deformities. They specialize in various fields and use advanced surgical techniques to save lives and improve patient outcomes.",
    opportunities: ["Hospitals", "Medical Centers", "Private Practice", "Research", "Medical Colleges", "International Practice"],
    path: "Class 12 Science (PCB) → NEET → MBBS → Internship → MS Surgery → Specialization → Senior Surgeon",
    courses: ["MBBS", "MS (Master of Surgery)", "MCh (Super Specialization)", "Fellowship Programs"],
    colleges: [
      { name: "AIIMS Delhi", cutoff: "NEET Rank < 50", fees: "₹5,500/year", location: "Delhi" },
      { name: "Christian Medical College", cutoff: "NEET Rank < 200", fees: "₹80K/year", location: "Vellore" },
      { name: "Armed Forces Medical College", cutoff: "NEET + AFMC Test", fees: "Free (Bond)", location: "Pune" },
      { name: "King George Medical University", cutoff: "NEET State Rank < 500", fees: "₹50K/year", location: "Lucknow" }
    ],
    careers: ["Cardiac Surgeon", "Neurosurgeon", "Orthopedic Surgeon", "Plastic Surgeon", "General Surgeon", "Transplant Surgeon"],
    salaryRange: "₹10-80 LPA",
    skills: ["Surgical Techniques", "Medical Knowledge", "Precision", "Decision Making", "Emergency Response", "Leadership"],
    workEnvironments: ["Operation Theaters", "Hospitals", "Trauma Centers", "Research Facilities", "Medical Colleges"],
    futureScope: "Minimally invasive surgery, robotic surgery, organ transplantation advances, regenerative medicine"
  },

  {
    id: "medical-researcher",
    title: "Medical Researcher",
    cluster: "Science - Medical",
    description: "Medical Researchers conduct scientific studies to advance medical knowledge, develop new treatments, and improve healthcare outcomes through evidence-based research.",
    opportunities: ["Research Institutes", "Pharmaceutical Companies", "Hospitals", "Government Labs", "Universities", "International Organizations"],
    path: "Class 12 Science (PCB) → MBBS/B.Sc. Life Sciences → MD/Ph.D. → Postdoc → Research Scientist",
    courses: ["MBBS", "B.Sc. Life Sciences", "M.Sc. Medical Research", "Ph.D. Medical Sciences", "Clinical Research"],
    colleges: [
      { name: "AIIMS Delhi", cutoff: "NEET/Research Entrance", fees: "₹5,500/year", location: "Delhi" },
      { name: "Indian Institute of Science", cutoff: "KVPY/GATE", fees: "₹25K/year", location: "Bangalore" },
      { name: "Tata Memorial Centre", cutoff: "Research Entrance", fees: "₹50K/year", location: "Mumbai" },
      { name: "PGIMER Chandigarh", cutoff: "NEET PG", fees: "₹40K/year", location: "Chandigarh" }
    ],
    careers: ["Clinical Research Associate", "Biomedical Researcher", "Epidemiologist", "Drug Development Scientist", "Research Director"],
    salaryRange: "₹5-35 LPA",
    skills: ["Research Methodology", "Statistical Analysis", "Medical Writing", "Data Analysis", "Laboratory Techniques", "Critical Thinking"],
    workEnvironments: ["Research Labs", "Clinical Trial Centers", "Pharmaceutical Companies", "Universities", "Government Institutes"],
    futureScope: "Personalized medicine, gene therapy research, vaccine development, AI in medical research, global health initiatives"
  },

  {
    id: "pharmacist",
    title: "Pharmacist",
    cluster: "Science - Medical",
    description: "Pharmacists dispense medications, provide drug information, ensure medication safety, and work with healthcare teams to optimize patient care and treatment outcomes.",
    opportunities: ["Hospitals", "Retail Pharmacy", "Pharmaceutical Industry", "Clinical Research", "Government", "Academia"],
    path: "Class 12 Science (PCB) → GPAT → B.Pharmacy → M.Pharmacy → Pharmacist License → Practice/Industry",
    courses: ["B.Pharmacy", "Pharm.D", "M.Pharmacy", "Clinical Pharmacy", "Industrial Pharmacy"],
    colleges: [
      { name: "National Institute of Pharmaceutical Education", cutoff: "GPAT Rank < 100", fees: "₹2L/year", location: "Mohali" },
      { name: "Jamia Hamdard", cutoff: "GPAT Rank < 500", fees: "₹1.5L/year", location: "Delhi" },
      { name: "Manipal College of Pharmaceutical Sciences", cutoff: "GPAT/MET", fees: "₹3L/year", location: "Manipal" },
      { name: "L.M. College of Pharmacy", cutoff: "Gujarat CET", fees: "₹80K/year", location: "Ahmedabad" }
    ],
    careers: ["Clinical Pharmacist", "Hospital Pharmacist", "Industrial Pharmacist", "Regulatory Affairs", "Drug Inspector", "Research Associate"],
    salaryRange: "₹3-20 LPA",
    skills: ["Pharmacology", "Drug Interaction", "Patient Counseling", "Medication Management", "Quality Control", "Regulatory Knowledge"],
    workEnvironments: ["Hospitals", "Retail Pharmacies", "Pharmaceutical Companies", "Research Labs", "Regulatory Bodies"],
    futureScope: "Clinical pharmacy expansion, telepharmacy, personalized medicine, pharmaceutical care, drug development"
  },

  {
    id: "geneticist",
    title: "Geneticist",
    cluster: "Science - Medical",
    description: "Geneticists study genes, heredity, and genetic variation in living organisms. They work on genetic research, testing, counseling, and developing gene-based therapies.",
    opportunities: ["Research Institutes", "Hospitals", "Diagnostic Labs", "Pharmaceutical Companies", "Biotechnology", "Government Labs"],
    path: "Class 12 Science (PCB) → B.Sc. Genetics/Life Sciences → M.Sc. Genetics → Ph.D. → Research/Clinical Practice",
    courses: ["B.Sc. Genetics", "M.Sc. Human Genetics", "Ph.D. Genetics", "Genetic Counseling", "Molecular Biology"],
    colleges: [
      { name: "Indian Institute of Science", cutoff: "KVPY/GATE", fees: "₹25K/year", location: "Bangalore" },
      { name: "Jawaharlal Nehru University", cutoff: "JNU Entrance", fees: "₹5K/year", location: "Delhi" },
      { name: "University of Delhi", cutoff: "DU Entrance", fees: "₹15K/year", location: "Delhi" },
      { name: "Banaras Hindu University", cutoff: "BHU PET", fees: "₹20K/year", location: "Varanasi" }
    ],
    careers: ["Clinical Geneticist", "Genetic Counselor", "Research Scientist", "Molecular Biologist", "Bioinformatician", "Lab Director"],
    salaryRange: "₹4-30 LPA",
    skills: ["Molecular Biology", "Genetic Analysis", "Bioinformatics", "Laboratory Techniques", "Data Analysis", "Patient Counseling"],
    workEnvironments: ["Research Labs", "Genetic Testing Labs", "Hospitals", "Universities", "Biotechnology Companies"],
    futureScope: "Gene therapy advancement, CRISPR technology, personalized medicine, genetic testing expansion, rare disease research"
  },

  // RESEARCH SCIENCES
  {
    id: "research-scientist",
    title: "Research Scientist",
    cluster: "Science - Research",
    description: "Research Scientists conduct scientific research to advance knowledge in their field, develop new technologies, and solve complex problems through systematic investigation and experimentation.",
    opportunities: ["Research Institutes", "Universities", "Government Labs", "Private R&D", "International Organizations", "Think Tanks"],
    path: "Class 12 Science → B.Sc./B.Tech → M.Sc./M.Tech → Ph.D. → Postdoc → Research Scientist",
    courses: ["B.Sc. (Physics/Chemistry/Biology)", "M.Sc.", "Ph.D.", "Research Methodology", "Specialized Certifications"],
    colleges: [
      { name: "Indian Institute of Science", cutoff: "KVPY/GATE", fees: "₹25K/year", location: "Bangalore" },
      { name: "Tata Institute of Fundamental Research", cutoff: "TIFR Entrance", fees: "Stipend Provided", location: "Mumbai" },
      { name: "Indian Institute of Science Education", cutoff: "KVPY/JEE Advanced", fees: "₹50K/year", location: "Multiple" },
      { name: "Jawaharlal Nehru University", cutoff: "JNU Entrance", fees: "₹5K/year", location: "Delhi" }
    ],
    careers: ["Principal Scientist", "Research Director", "Laboratory Head", "Scientific Advisor", "Innovation Manager", "Patent Researcher"],
    salaryRange: "₹4-25 LPA",
    skills: ["Research Methodology", "Data Analysis", "Scientific Writing", "Grant Writing", "Laboratory Management", "Critical Thinking"],
    workEnvironments: ["Research Labs", "Universities", "Government Institutes", "R&D Centers", "Field Research Sites"],
    futureScope: "Interdisciplinary research growth, AI-assisted research, global collaboration, innovation-driven economy, emerging technologies"
  },

  {
    id: "biotechnologist",
    title: "Biotechnologist",
    cluster: "Science - Research",
    description: "Biotechnologists use biological systems, living organisms, or derivatives to develop products and technologies that improve lives and the health of our planet.",
    opportunities: ["Biotechnology Companies", "Pharmaceutical Industry", "Research Institutes", "Food Industry", "Environmental Companies", "Agriculture"],
    path: "Class 12 Science (PCB) → B.Tech Biotechnology → M.Tech/M.Sc. → Ph.D. (optional) → Industry/Research",
    courses: ["B.Tech Biotechnology", "M.Sc. Biotechnology", "M.Tech Bioprocess Engineering", "Ph.D. Biotechnology"],
    colleges: [
      { name: "IIT Roorkee", cutoff: "JEE Advanced Rank < 1500", fees: "₹2.5L/year", location: "Roorkee" },
      { name: "Anna University", cutoff: "TNEA Rank < 2000", fees: "₹80K/year", location: "Chennai" },
      { name: "Amity University", cutoff: "JEE Main + Amity Test", fees: "₹3L/year", location: "Noida" },
      { name: "VIT University", cutoff: "VITEEE Rank < 10000", fees: "₹2.5L/year", location: "Vellore" }
    ],
    careers: ["Bioprocess Engineer", "Quality Control Analyst", "Product Development Scientist", "Research Associate", "Regulatory Affairs"],
    salaryRange: "₹3-25 LPA",
    skills: ["Molecular Biology", "Bioprocess Engineering", "Quality Control", "Product Development", "Regulatory Affairs", "Data Analysis"],
    workEnvironments: ["Biotechnology Companies", "Research Labs", "Manufacturing Plants", "Quality Control Labs", "Field Sites"],
    futureScope: "Biopharmaceuticals growth, sustainable biotechnology, personalized medicine, agricultural biotechnology, environmental solutions"
  },

  {
    id: "laboratory-technician",
    title: "Laboratory Technician",
    cluster: "Science - Research",
    description: "Laboratory Technicians perform routine laboratory tests and procedures, maintain equipment, and support scientific research and diagnostic activities in various laboratory settings.",
    opportunities: ["Medical Labs", "Research Institutes", "Pharmaceutical Companies", "Food Testing", "Environmental Labs", "Quality Control"],
    path: "Class 12 Science → B.Sc./Diploma Lab Technology → Certification → Junior Technician → Senior Technician",
    courses: ["B.Sc. Medical Laboratory Technology", "Diploma in Medical Lab Technology", "B.Sc. Life Sciences", "Specialized Certifications"],
    colleges: [
      { name: "All India Institute of Medical Sciences", cutoff: "AIIMS BSc Nursing", fees: "₹5,500/year", location: "Delhi" },
      { name: "Christian Medical College", cutoff: "CMC Entrance", fees: "₹80K/year", location: "Vellore" },
      { name: "Manipal Academy of Higher Education", cutoff: "MET", fees: "₹2.5L/year", location: "Manipal" },
      { name: "Jamia Hamdard", cutoff: "University Entrance", fees: "₹1L/year", location: "Delhi" }
    ],
    careers: ["Medical Lab Technician", "Research Technician", "Quality Control Technician", "Pathology Technician", "Clinical Lab Scientist"],
    salaryRange: "₹2-12 LPA",
    skills: ["Laboratory Techniques", "Equipment Operation", "Quality Control", "Data Recording", "Safety Protocols", "Analytical Skills"],
    workEnvironments: ["Medical Labs", "Research Labs", "Hospitals", "Pharmaceutical Companies", "Quality Control Labs"],
    futureScope: "Automated laboratory systems, molecular diagnostics, point-of-care testing, digital lab management, specialized testing"
  },

  {
    id: "marine-biologist",
    title: "Marine Biologist",
    cluster: "Science - Research",
    description: "Marine Biologists study life in oceans and other saltwater environments. They research marine organisms, ecosystems, and the impact of human activities on marine life.",
    opportunities: ["Research Institutes", "Marine Parks", "Government Agencies", "Environmental Consulting", "Aquaculture", "Conservation Organizations"],
    path: "Class 12 Science (PCB) → B.Sc. Marine Biology → M.Sc. Marine Biology → Ph.D. → Research/Conservation Work",
    courses: ["B.Sc. Marine Biology", "M.Sc. Marine Sciences", "Ph.D. Marine Biology", "Oceanography", "Aquaculture"],
    colleges: [
      { name: "Cochin University of Science and Technology", cutoff: "Kerala CEE", fees: "₹15K/year", location: "Kochi" },
      { name: "Annamalai University", cutoff: "University Entrance", fees: "₹25K/year", location: "Chidambaram" },
      { name: "Goa University", cutoff: "Goa CET", fees: "₹20K/year", location: "Goa" },
      { name: "Pondicherry University", cutoff: "PU CET", fees: "₹15K/year", location: "Puducherry" }
    ],
    careers: ["Marine Research Scientist", "Aquaculture Specialist", "Marine Conservation Officer", "Oceanographer", "Environmental Consultant"],
    salaryRange: "₹3-18 LPA",
    skills: ["Marine Biology", "Diving", "Data Collection", "Environmental Assessment", "GIS", "Scientific Writing"],
    workEnvironments: ["Research Vessels", "Marine Labs", "Coastal Areas", "Aquariums", "Field Research Sites", "Government Offices"],
    futureScope: "Marine conservation urgency, blue economy development, sustainable fisheries, marine biotechnology, climate change research"
  },

  {
    id: "environmental-scientist",
    title: "Environmental Scientist",
    cluster: "Science - Research",
    description: "Environmental Scientists study the environment and solve problems related to pollution, climate change, and natural resource conservation to protect human health and the environment.",
    opportunities: ["Environmental Consulting", "Government Agencies", "Research Institutes", "NGOs", "Corporate Sustainability", "International Organizations"],
    path: "Class 12 Science → B.Sc. Environmental Science → M.Sc. Environmental Science → Ph.D. → Research/Consulting",
    courses: ["B.Sc. Environmental Science", "M.Sc. Environmental Science", "Environmental Engineering", "Climate Change Studies"],
    colleges: [
      { name: "The Energy and Resources Institute", cutoff: "TERI Entrance", fees: "₹3L/year", location: "Delhi" },
      { name: "Jawaharlal Nehru University", cutoff: "JNU Entrance", fees: "₹5K/year", location: "Delhi" },
      { name: "University of Delhi", cutoff: "DU Entrance", fees: "₹15K/year", location: "Delhi" },
      { name: "Banaras Hindu University", cutoff: "BHU PET", fees: "₹20K/year", location: "Varanasi" }
    ],
    careers: ["Environmental Consultant", "Pollution Control Officer", "Sustainability Manager", "Climate Change Analyst", "Environmental Auditor"],
    salaryRange: "₹3-20 LPA",
    skills: ["Environmental Assessment", "Data Analysis", "GIS", "Environmental Law", "Project Management", "Scientific Writing"],
    workEnvironments: ["Field Sites", "Consulting Firms", "Government Offices", "Research Labs", "Corporate Offices", "International Organizations"],
    futureScope: "Climate change mitigation, renewable energy projects, sustainable development goals, environmental regulations, green technologies"
  },

  // TECHNOLOGY SPECIALIZATION
  {
    id: "ai-specialist",
    title: "AI Specialist",
    cluster: "Science - Technology",
    description: "AI Specialists design and develop artificial intelligence systems, machine learning algorithms, and intelligent applications that can perform tasks typically requiring human intelligence.",
    opportunities: ["Tech Companies", "Research Labs", "Startups", "Consulting", "Healthcare", "Finance", "Automotive"],
    path: "Class 12 Science (PCM) → B.Tech CS/IT → AI/ML Specialization → Internships → AI Engineer → AI Specialist",
    courses: ["B.Tech Computer Science", "M.Tech AI", "AI/ML Certification", "Deep Learning", "Natural Language Processing"],
    colleges: [
      { name: "IIT Delhi", cutoff: "JEE Advanced Rank < 100", fees: "₹2.5L/year", location: "Delhi" },
      { name: "IIT Bombay", cutoff: "JEE Advanced Rank < 150", fees: "₹2.5L/year", location: "Mumbai" },
      { name: "IISc Bangalore", cutoff: "KVPY/JEE Advanced", fees: "₹25K/year", location: "Bangalore" },
      { name: "IIIT Hyderabad", cutoff: "JEE Main Rank < 500", fees: "₹3L/year", location: "Hyderabad" }
    ],
    careers: ["Machine Learning Engineer", "Deep Learning Engineer", "NLP Engineer", "Computer Vision Engineer", "AI Research Scientist"],
    salaryRange: "₹10-60 LPA",
    skills: ["Machine Learning", "Deep Learning", "Python/R", "TensorFlow/PyTorch", "Data Science", "Mathematics"],
    workEnvironments: ["Tech Companies", "Research Labs", "Startups", "Remote Work", "AI Labs", "Corporate R&D"],
    futureScope: "AI revolution across industries, generative AI, autonomous systems, AI ethics, quantum machine learning"
  },

  {
    id: "cybersecurity-expert",
    title: "Cybersecurity Expert",
    cluster: "Science - Technology",
    description: "Cybersecurity Experts protect organizations from digital threats by implementing security measures, monitoring for breaches, and responding to cyber attacks.",
    opportunities: ["IT Companies", "Banks", "Government", "Consulting", "Healthcare", "Defense", "Startups"],
    path: "Class 12 Science (PCM) → B.Tech CS/IT → Cybersecurity Certification → Security Analyst → Cybersecurity Expert",
    courses: ["B.Tech Computer Science", "M.Tech Cybersecurity", "CISSP", "CEH", "CISM", "Information Security"],
    colleges: [
      { name: "IIT Kanpur", cutoff: "JEE Advanced Rank < 300", fees: "₹2.5L/year", location: "Kanpur" },
      { name: "NIT Surathkal", cutoff: "JEE Main Rank < 2000", fees: "₹1.5L/year", location: "Mangalore" },
      { name: "IIIT Hyderabad", cutoff: "JEE Main Rank < 1000", fees: "₹3L/year", location: "Hyderabad" },
      { name: "Amity University", cutoff: "JEE Main + Amity Test", fees: "₹3L/year", location: "Noida" }
    ],
    careers: ["Security Analyst", "Penetration Tester", "Security Architect", "CISO", "Incident Response Specialist", "Security Consultant"],
    salaryRange: "₹6-40 LPA",
    skills: ["Network Security", "Ethical Hacking", "Risk Assessment", "Incident Response", "Security Tools", "Compliance"],
    workEnvironments: ["Corporate IT Departments", "Security Consulting Firms", "Government Agencies", "SOC Centers", "Remote Work"],
    futureScope: "Increasing cyber threats, cloud security, IoT security, AI-driven security, zero-trust architecture"
  },

  {
    id: "computer-scientist",
    title: "Computer Scientist",
    cluster: "Science - Technology",
    description: "Computer Scientists research and develop new computing technologies, algorithms, and systems. They work on fundamental problems in computation and create innovative solutions.",
    opportunities: ["Research Institutes", "Tech Companies", "Universities", "Government Labs", "R&D Centers", "Startups"],
    path: "Class 12 Science (PCM) → B.Tech CS → M.Tech/M.S. → Ph.D. → Research/Industry → Computer Scientist",
    courses: ["B.Tech Computer Science", "M.Tech Computer Science", "Ph.D. Computer Science", "Algorithms", "Theory of Computation"],
    colleges: [
      { name: "IIT Bombay", cutoff: "JEE Advanced Rank < 50", fees: "₹2.5L/year", location: "Mumbai" },
      { name: "IISc Bangalore", cutoff: "KVPY/JEE Advanced", fees: "₹25K/year", location: "Bangalore" },
      { name: "IIT Delhi", cutoff: "JEE Advanced Rank < 100", fees: "₹2.5L/year", location: "Delhi" },
      { name: "Chennai Mathematical Institute", cutoff: "CMI Entrance", fees: "₹4L/year", location: "Chennai" }
    ],
    careers: ["Research Scientist", "Algorithm Designer", "System Architect", "Technology Consultant", "Academic Researcher", "CTO"],
    salaryRange: "₹8-50 LPA",
    skills: ["Algorithms", "Data Structures", "Mathematical Analysis", "Programming", "Research Methodology", "System Design"],
    workEnvironments: ["Research Labs", "Universities", "Tech Companies", "R&D Centers", "Innovation Labs", "Think Tanks"],
    futureScope: "Quantum computing, AI advancement, distributed systems, computational theory, emerging technologies"
  },

  {
    id: "space-scientist",
    title: "Space Scientist",
    cluster: "Science - Technology",
    description: "Space Scientists study celestial bodies, space phenomena, and develop technologies for space exploration. They work on missions, satellites, and space research.",
    opportunities: ["ISRO", "DRDO", "Research Institutes", "Space Agencies", "Aerospace Companies", "Universities"],
    path: "Class 12 Science (PCM) → B.Tech/B.Sc. Physics → M.Tech/M.Sc. → Ph.D. → ISRO/Research → Space Scientist",
    courses: ["B.Tech Aerospace", "B.Sc. Physics", "M.Tech Space Technology", "Ph.D. Space Sciences", "Astrophysics"],
    colleges: [
      { name: "Indian Institute of Space Science", cutoff: "IIST Entrance", fees: "Free", location: "Thiruvananthapuram" },
      { name: "IIT Bombay", cutoff: "JEE Advanced Rank < 200", fees: "₹2.5L/year", location: "Mumbai" },
      { name: "IISc Bangalore", cutoff: "KVPY/JAM", fees: "₹25K/year", location: "Bangalore" },
      { name: "Physical Research Laboratory", cutoff: "JEST/NET", fees: "Stipend Provided", location: "Ahmedabad" }
    ],
    careers: ["Mission Scientist", "Satellite Engineer", "Astrophysicist", "Mission Planning Engineer", "Space Applications Scientist"],
    salaryRange: "₹6-30 LPA",
    skills: ["Space Sciences", "Satellite Technology", "Mission Planning", "Data Analysis", "Programming", "Physics"],
    workEnvironments: ["ISRO Centers", "Space Research Labs", "Mission Control Centers", "Universities", "Observatories"],
    futureScope: "Mars missions, lunar exploration, commercial space industry, satellite constellations, space tourism"
  },

  // SPECIALIZED SCIENCES
  {
    id: "merchant-navy-officer",
    title: "Merchant Navy Officer",
    cluster: "Science - Specialized",
    description: "Merchant Navy Officers operate commercial ships, manage cargo transportation, and ensure safe navigation across international waters for global trade and commerce.",
    opportunities: ["Shipping Companies", "Cargo Vessels", "Cruise Lines", "Oil Tankers", "Container Ships", "Port Operations"],
    path: "Class 12 Science (PCM) → IMU CET → B.Tech Marine Engineering/Nautical Science → Sea Training → Officer License",
    courses: ["B.Tech Marine Engineering", "B.Sc. Nautical Science", "Maritime Studies", "Ship Management"],
    colleges: [
      { name: "Indian Maritime University", cutoff: "IMU CET", fees: "₹1.5L/year", location: "Chennai" },
      { name: "TOLANI Maritime Institute", cutoff: "IMU CET", fees: "₹3L/year", location: "Pune" },
      { name: "Samundra Institute of Maritime Studies", cutoff: "IMU CET", fees: "₹4L/year", location: "Mumbai" },
      { name: "Marine Engineering & Research Institute", cutoff: "IMU CET", fees: "₹2L/year", location: "Kolkata" }
    ],
    careers: ["Ship Captain", "Marine Engineer", "Port Officer", "Ship Surveyor", "Marine Superintendent", "Fleet Manager"],
    salaryRange: "₹8-50 LPA",
    skills: ["Navigation", "Marine Engineering", "Ship Operations", "Safety Management", "Leadership", "Communication"],
    workEnvironments: ["Ships", "Ports", "Maritime Offices", "International Waters", "Shipping Companies", "Coast Guard"],
    futureScope: "Global trade growth, sustainable shipping, automation in maritime, offshore energy, maritime security"
  },

  {
    id: "astronaut",
    title: "Astronaut",
    cluster: "Science - Specialized",
    description: "Astronauts travel to space to conduct scientific experiments, maintain spacecraft, and advance human space exploration through missions to space stations and celestial bodies.",
    opportunities: ["ISRO", "International Space Agencies", "Private Space Companies", "Space Research", "Mission Control", "Space Training"],
    path: "Class 12 Science (PCM) → B.Tech/B.Sc. → M.Tech/Ph.D. → Test Pilot/Research → ISRO Selection → Astronaut Training",
    courses: ["B.Tech Aerospace", "B.Sc. Physics", "Test Pilot Training", "Space Sciences", "Life Sciences"],
    colleges: [
      { name: "Indian Institute of Space Science", cutoff: "IIST Entrance", fees: "Free", location: "Thiruvananthapuram" },
      { name: "Indian Air Force Academy", cutoff: "NDA/CDS", fees: "Sponsored", location: "Hyderabad" },
      { name: "IIT Bombay", cutoff: "JEE Advanced Rank < 100", fees: "₹2.5L/year", location: "Mumbai" },
      { name: "IISc Bangalore", cutoff: "KVPY/JEE Advanced", fees: "₹25K/year", location: "Bangalore" }
    ],
    careers: ["Mission Specialist", "Pilot Astronaut", "Flight Engineer", "Space Station Commander", "Mission Commander"],
    salaryRange: "₹15-50 LPA",
    skills: ["Space Sciences", "Physical Fitness", "Problem Solving", "Teamwork", "Technical Skills", "Emergency Response"],
    workEnvironments: ["Space Stations", "Spacecraft", "Training Centers", "Mission Control", "Research Facilities"],
    futureScope: "Human Mars missions, lunar base development, commercial space travel, international space cooperation"
  },

  {
    id: "nuclear-engineer",
    title: "Nuclear Engineer",
    cluster: "Science - Specialized",
    description: "Nuclear Engineers design and operate nuclear power plants, develop nuclear technologies, and work on applications of nuclear energy for power generation and medical uses.",
    opportunities: ["Nuclear Power Plants", "BARC", "NPCIL", "Research Institutes", "Medical Applications", "Defense"],
    path: "Class 12 Science (PCM) → B.Tech Nuclear Engineering → Training → M.Tech → BARC/NPCIL → Nuclear Engineer",
    courses: ["B.Tech Nuclear Engineering", "M.Tech Nuclear Engineering", "Nuclear Science", "Radiation Safety"],
    colleges: [
      { name: "IIT Kanpur", cutoff: "JEE Advanced Rank < 500", fees: "₹2.5L/year", location: "Kanpur" },
      { name: "Homi Bhabha National Institute", cutoff: "HBNI Entrance", fees: "₹50K/year", location: "Mumbai" },
      { name: "Amity University", cutoff: "JEE Main + Amity", fees: "₹3L/year", location: "Noida" },
      { name: "University of Delhi", cutoff: "DU Entrance", fees: "₹15K/year", location: "Delhi" }
    ],
    careers: ["Nuclear Plant Engineer", "Radiation Safety Officer", "Nuclear Research Scientist", "Reactor Operator", "Nuclear Consultant"],
    salaryRange: "₹6-35 LPA",
    skills: ["Nuclear Physics", "Radiation Safety", "Plant Operations", "Safety Protocols", "Problem Solving", "Technical Analysis"],
    workEnvironments: ["Nuclear Power Plants", "Research Labs", "BARC Centers", "Medical Facilities", "Government Agencies"],
    futureScope: "Clean energy focus, advanced reactor designs, nuclear medicine growth, waste management, international cooperation"
  },

  {
    id: "meteorologist",
    title: "Meteorologist",
    cluster: "Science - Specialized",
    description: "Meteorologists study weather patterns, climate change, and atmospheric phenomena to forecast weather conditions and understand climate systems for various applications.",
    opportunities: ["India Meteorological Department", "Research Institutes", "Media", "Aviation", "Agriculture", "Disaster Management"],
    path: "Class 12 Science (PCM) → B.Sc. Physics/Mathematics → M.Sc. Meteorology → IMD Exam → Meteorologist",
    courses: ["B.Sc. Physics", "M.Sc. Meteorology", "Atmospheric Sciences", "Climate Studies", "Environmental Science"],
    colleges: [
      { name: "Pune University", cutoff: "Maharashtra CET", fees: "₹25K/year", location: "Pune" },
      { name: "Andhra University", cutoff: "APECET", fees: "₹20K/year", location: "Visakhapatnam" },
      { name: "Cochin University of Science Technology", cutoff: "Kerala CEE", fees: "₹15K/year", location: "Kochi" },
      { name: "IIT Delhi", cutoff: "JEE Advanced", fees: "₹2.5L/year", location: "Delhi" }
    ],
    careers: ["Weather Forecaster", "Climate Researcher", "Atmospheric Scientist", "Environmental Consultant", "TV Weather Presenter"],
    salaryRange: "₹4-20 LPA",
    skills: ["Atmospheric Physics", "Data Analysis", "Weather Modeling", "Computer Programming", "Communication", "Research"],
    workEnvironments: ["Weather Stations", "Research Centers", "Media Houses", "Government Offices", "Field Locations"],
    futureScope: "Climate change research, extreme weather prediction, agricultural meteorology, renewable energy forecasting, disaster preparedness"
  },

  {
    id: "chemist",
    title: "Chemist",
    cluster: "Science - Specialized",
    description: "Chemists study the composition, structure, properties, and reactions of matter. They develop new materials, medicines, and chemical processes for various industries.",
    opportunities: ["Pharmaceutical Companies", "Chemical Industries", "Research Labs", "Quality Control", "Government Labs", "Academia"],
    path: "Class 12 Science (PCM/PCB) → B.Sc. Chemistry → M.Sc. Chemistry → Ph.D. → Research/Industry → Chemist",
    courses: ["B.Sc. Chemistry", "M.Sc. Chemistry", "Ph.D. Chemistry", "Industrial Chemistry", "Analytical Chemistry"],
    colleges: [
      { name: "Indian Institute of Science", cutoff: "KVPY/JAM", fees: "₹25K/year", location: "Bangalore" },
      { name: "University of Delhi", cutoff: "DU Entrance", fees: "₹15K/year", location: "Delhi" },
      { name: "Jadavpur University", cutoff: "WBJEE", fees: "₹5K/year", location: "Kolkata" },
      { name: "Banaras Hindu University", cutoff: "BHU PET", fees: "₹20K/year", location: "Varanasi" }
    ],
    careers: ["Research Chemist", "Analytical Chemist", "Quality Control Chemist", "Process Chemist", "Materials Scientist", "Chemical Engineer"],
    salaryRange: "₹3-25 LPA",
    skills: ["Chemical Analysis", "Laboratory Techniques", "Research Methods", "Data Analysis", "Safety Protocols", "Scientific Writing"],
    workEnvironments: ["Research Labs", "Chemical Plants", "Quality Control Labs", "Universities", "Pharmaceutical Companies"],
    futureScope: "Green chemistry, nanotechnology, pharmaceutical development, materials science, sustainable chemistry, drug discovery"
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