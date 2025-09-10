import type { Express } from "express";
import { storage } from "./storage";
import { insertQuizResultSchema, insertChatLogSchema, insertUserSchema, loginUserSchema, insertCareerSchema, insertSavedCareerSchema } from "@shared/schema";
import { getChatResponse, getCareerRecommendation } from "./lib/gemini";
import { OAuth2Client } from 'google-auth-library';
import { getCareerSuggestions, type SubjectMarks } from "../client/src/lib/career-logic.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function registerRoutes(app: Express): Promise<void> {
  // Auth Routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUserByUsername = await storage.getUserByUsername(data.username);
      const existingUserByEmail = await storage.getUserByEmail(data.email);
      
      if (existingUserByUsername) {
        return res.status(400).json({ error: "Username already exists" });
      }
      
      if (existingUserByEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }
      
      const user = await storage.createUser(data);
      res.json({ success: true, user: { ...user, password: undefined } });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(400).json({ error: "Failed to create user" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const data = loginUserSchema.parse(req.body);
      const user = await storage.validateUser(data);
      
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      
      res.json({ success: true, user: { ...user, password: undefined } });
    } catch (error) {
      console.error('Login error:', error);
      res.status(400).json({ error: "Failed to login" });
    }
  });

  // Google OAuth Route
  app.post("/api/auth/google", async (req, res) => {
    try {
      const { credential } = req.body;
      
      if (!credential) {
        return res.status(400).json({ error: "No credential provided" });
      }

      // Verify the Google token
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        return res.status(400).json({ error: "Invalid Google token" });
      }

      const { sub: googleId, email, name, picture } = payload;

      if (!email || !name) {
        return res.status(400).json({ error: "Missing required user information" });
      }

      // Check if user exists by email
      let user = await storage.getUserByEmail(email);
      
      if (!user) {
        // Create new user
        const userData = {
          username: email.split('@')[0] + '_' + Date.now(), // Generate unique username
          email,
          password: '', // No password needed for Google auth
          fullName: name,
          googleId,
          profilePicture: picture,
        };
        
        user = await storage.createUser(userData);
      } else if (!user.googleId) {
        // Link existing account with Google
        user = await storage.updateUser(user.id, { googleId, profilePicture: picture });
      }
      
      res.json({ success: true, user: { ...user, password: undefined } });
    } catch (error) {
      console.error('Google auth error:', error);
      res.status(400).json({ error: "Failed to authenticate with Google" });
    }
  });

  // Careers Routes
  app.get("/api/careers", async (req, res) => {
    try {
      const { industry, skills, search } = req.query;
      
      let careers;
      if (search) {
        careers = await storage.searchCareers(search as string);
      } else {
        const skillsArray = skills ? (skills as string).split(',').map(s => s.trim()) : undefined;
        careers = await storage.getCareers(industry as string, skillsArray);
      }
      
      res.json({ success: true, careers });
    } catch (error) {
      console.error('Error fetching careers:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch careers' });
    }
  });

  app.get("/api/careers/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const career = await storage.getCareerById(id);
      
      if (!career) {
        return res.status(404).json({ success: false, message: 'Career not found' });
      }
      
      res.json({ success: true, career });
    } catch (error) {
      console.error('Error fetching career:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch career' });
    }
  });

  app.post("/api/careers", async (req, res) => {
    try {
      const result = insertCareerSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ success: false, errors: result.error.issues });
      }
      
      const career = await storage.createCareer(result.data);
      res.json({ success: true, career });
    } catch (error) {
      console.error('Error creating career:', error);
      res.status(500).json({ success: false, message: 'Failed to create career' });
    }
  });

  // Check if career is saved by user
  app.get("/api/careers/:careerId/saved/:userId", async (req, res) => {
    try {
      const { careerId, userId } = req.params;
      const isSaved = await storage.isCareerSaved(careerId, userId);
      res.json({ success: true, isSaved });
    } catch (error) {
      console.error('Error checking saved career:', error);
      res.status(500).json({ success: false, message: 'Failed to check saved career' });
    }
  });

  // Saved Careers Routes
  app.post("/api/careers/save", async (req, res) => {
    try {
      const data = insertSavedCareerSchema.parse(req.body);
      const savedCareer = await storage.createSavedCareer(data);
      res.json({ success: true, career: savedCareer });
    } catch (error) {
      console.error('Save career error:', error);
      res.status(400).json({ error: "Failed to save career" });
    }
  });

  app.get("/api/careers/saved", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
      const savedCareers = await storage.getSavedCareers(userId);
      res.json(savedCareers);
    } catch (error) {
      console.error('Get saved careers error:', error);
      res.status(500).json({ error: "Failed to fetch saved careers" });
    }
  });

  app.delete("/api/careers/saved/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.query.userId as string;
      
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
      
      const deleted = await storage.deleteSavedCareer(id, userId);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Career not found or unauthorized" });
      }
    } catch (error) {
      console.error('Delete saved career error:', error);
      res.status(500).json({ error: "Failed to delete saved career" });
    }
  });

  // Quiz Routes
  // Career Clusters
  const careers = {
    Science: ["Engineer","Doctor","Scientist","Data Scientist","Biotech","IT Developer"],
    Commerce: ["Accountant","Entrepreneur","Banker","CA/CS","Economist","Marketing Manager"],
    Arts: ["Lawyer","Journalist","Historian","Teacher","Psychologist","Politician"],
    Creative: ["Designer","Musician","Writer","Actor","Filmmaker","Architect"],
    Social: ["NGO Worker","Social Worker","Counselor","Public Servant","Environmentalist"]
  };

  // Marks Penalty Map
  const penalties = {
    Science: ["science","math"],
    Commerce: ["math","accounts","economics"],
    Arts: ["history","english","political_science"],
    Creative: ["art","english","music"],
    Social: ["social_science","english","history"]
  };

  // Calculate Marks Score
  function calcMarksScore(marks: Record<string, number>) {
    const total = Object.values(marks).reduce((a,b)=>a+Number(b),0);
    const avg = total / Object.keys(marks).length;
    return (avg/100)*10; // scaled to 0–10
  }

  // Apply Penalty
  function applyPenalty(cluster: string, marks: Record<string, number>) {
    let penalty = 0;
    const lowSubjects = penalties[cluster as keyof typeof penalties] || [];
    lowSubjects.forEach(sub => {
      const subjectKey = Object.keys(marks).find(key => key.toLowerCase().includes(sub.toLowerCase()));
      if(subjectKey && marks[subjectKey] && marks[subjectKey]<40) penalty += 2; // -2 points for each weak subject
    });
    return penalty;
  }

  // Quiz Cluster
  function getQuizCluster(answers: string[]) {
    let scores = {Science:0,Commerce:0,Arts:0,Creative:0,Social:0};
    answers.forEach(ans=>{
      const a = ans.toLowerCase();
      if(a.includes("puzzle")||a.includes("lab")||a.includes("science")||a.includes("math")||a.includes("logical")||a.includes("technology")) scores.Science++;
      if(a.includes("business")||a.includes("money")||a.includes("commerce")||a.includes("entrepreneur")||a.includes("management")) scores.Commerce++;
      if(a.includes("history")||a.includes("politics")||a.includes("research")||a.includes("humanities")||a.includes("teacher")) scores.Arts++;
      if(a.includes("art")||a.includes("creative")||a.includes("design")||a.includes("music")||a.includes("film")||a.includes("writer")) scores.Creative++;
      if(a.includes("help")||a.includes("social")||a.includes("ngo")||a.includes("service")||a.includes("empathy")) scores.Social++;
    });
    const cluster = Object.entries(scores).sort((a,b)=>b[1]-a[1])[0];
    return {cluster: cluster[0], score: cluster[1]};
  }

  // Stream Weight
  function getStreamWeight(stream: string) {
    if(stream==="Science") return 8;
    if(stream==="Commerce") return 7;
    if(stream==="Arts") return 6;
    if(stream==="Creative") return 5;
    return 5;
  }

  app.post("/api/quiz/submit", async (req, res) => {
    try {
      const { classLevel, stream, marks, answers, userId } = req.body;
      
      // Handle both old and new quiz formats
      if (marks && classLevel) {
        let resultData;
        
        if (classLevel === "11-12") {
          // Use new comprehensive career logic for class 11-12
          const answerTexts = Array.isArray(answers) ? answers.map((a: any) => a.text || a) : [];
          const streamMapping: { [key: string]: "science" | "commerce" | "arts" | "creative" | "social" } = {
            "Science": "science",
            "Commerce": "commerce", 
            "Arts": "arts",
            "Creative": "creative",
            "Social": "social"
          };
          
          // Convert marks object to match career logic interface
          const subjectMarks: SubjectMarks = {};
          Object.entries(marks).forEach(([subject, mark]) => {
            const normalizedSubject = subject.toLowerCase()
              .replace(/\s+/g, '')
              .replace('mathematics', 'math')
              .replace('accountancy', 'accounts')
              .replace('businessstudies', 'economics')
              .replace('politicalscience', 'psychology');
            subjectMarks[normalizedSubject] = Number(mark);
          });
          
          const chosenStream = streamMapping[stream] || "science";
          const careerAnalysis = getCareerSuggestions(subjectMarks, answerTexts, chosenStream);
          
          // Get AI recommendation
          const aiRecommendation = await getCareerRecommendation(answers);
          
          resultData = {
            finalScore: careerAnalysis.finalScore,
            cluster: careerAnalysis.primaryCluster,
            penalty: Math.max(0, careerAnalysis.aptitudeScore - Math.round((Object.values(subjectMarks).reduce((a, b) => a + (b || 0), 0) / Object.keys(subjectMarks).length))),
            suggestions: careerAnalysis.top3Careers,
            breakdown: {
              marks: careerAnalysis.aptitudeScore,
              quiz: careerAnalysis.interestScore,
              stream: careerAnalysis.streamWeight,
              penalty: careerAnalysis.mismatchFlag ? 5 : 0
            },
            aiAnalysis: careerAnalysis.advice + (aiRecommendation ? ` | AI Insights: ${aiRecommendation}` : ''),
            confidenceLevel: careerAnalysis.confidenceLevel,
            mismatchFlag: careerAnalysis.mismatchFlag
          };
        } else {
          // Use existing logic for class 10
          const marksScore = calcMarksScore(marks);
          const answerTexts = Array.isArray(answers) ? answers.map((a: any) => a.text || a) : [];
          const quizData = getQuizCluster(answerTexts);
          const streamWeight = getStreamWeight(stream || quizData.cluster);

          // Apply penalty
          const penalty = applyPenalty(quizData.cluster, marks);

          // Weighted Final Score
          let finalScore = (marksScore*0.4)+(quizData.score*0.4)+(streamWeight*0.2);
          finalScore -= penalty;
          finalScore = Math.max(0, Math.round(finalScore*10)); // never below 0

          // Get top career suggestions
          const suggestions = careers[quizData.cluster as keyof typeof careers]?.slice(0,3) || [];
          
          // Get AI recommendation
          const aiRecommendation = await getCareerRecommendation(answers);
          
          resultData = {
            finalScore,
            cluster: quizData.cluster,
            penalty,
            suggestions,
            breakdown: {
              marks: Math.round(marksScore*10),
              quiz: quizData.score*10,
              stream: streamWeight,
              penalty
            },
            aiAnalysis: aiRecommendation
          };
        }
        
        // Store in database
        const quizResult = await storage.createQuizResult({
          userId: userId || "anonymous",
          answers,
          result: `${resultData.cluster} (Score: ${resultData.finalScore}) | AI Analysis: ${resultData.aiAnalysis}`,
        });
        
        res.json({ success: true, result: resultData, dbResult: quizResult });
      } else {
        // Legacy quiz format
        const data = insertQuizResultSchema.parse(req.body);
        
        // Get AI recommendation for the quiz results
        const aiRecommendation = await getCareerRecommendation(data.answers as any[]);
        
        const quizResult = await storage.createQuizResult({
          ...data,
          result: data.result + " | AI Analysis: " + aiRecommendation,
        });
        
        res.json({ success: true, result: quizResult });
      }
    } catch (error) {
      console.error('Quiz submission error:', error);
      res.status(400).json({ error: "Failed to submit quiz results" });
    }
  });

  app.get("/api/quiz/results", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const results = await storage.getQuizResults(userId);
      res.json(results);
    } catch (error) {
      console.error('Quiz results fetch error:', error);
      res.status(500).json({ error: "Failed to fetch quiz results" });
    }
  });

  // Chat Routes
  app.post("/api/chat/send", async (req, res) => {
    try {
      const { message, userId } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }

      // Get AI response from Gemini
      const aiResponse = await getChatResponse(message);
      
      // Store chat log
      const chatLogData = insertChatLogSchema.parse({
        userId: userId || 'anonymous',
        message,
        response: aiResponse,
      });
      
      const chatLog = await storage.createChatLog(chatLogData);
      
      res.json({ 
        success: true, 
        response: aiResponse,
        chatLog 
      });
    } catch (error) {
      console.error('Chat send error:', error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  app.get("/api/chat/history", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const chatLogs = await storage.getChatLogs(userId);
      res.json(chatLogs);
    } catch (error) {
      console.error('Chat history fetch error:', error);
      res.status(500).json({ error: "Failed to fetch chat history" });
    }
  });

  // Government Colleges API
  app.get("/api/colleges", async (req, res) => {
    try {
      const { lat, lng } = req.query;
      
      if (!lat || !lng) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
      }

      const userLat = parseFloat(lat as string);
      const userLng = parseFloat(lng as string);

      // Comprehensive Kolkata and West Bengal Government Colleges Database
      const governmentColleges = [
        // Engineering Colleges
        {
          college_name: "Jadavpur University - Faculty of Engineering & Technology",
          city: "Kolkata",
          state: "West Bengal",
          latitude: 22.4991,
          longitude: 88.3709,
          courses_offered: ["B.E Computer Science", "B.E Electronics", "B.E Mechanical", "B.E Civil", "B.E Chemical", "B.E Electrical", "M.Tech", "PhD"],
          cutoff_data: { "WBJEE": 250, "JEE Main": 15000, "GATE": 600, "JAM": 450 },
          facilities: ["Central Library", "Hostels", "Computer Labs", "Research Labs", "Workshop", "Canteen", "Sports Complex", "Medical Center", "Auditorium"],
          website: "https://jadavpuruniversity.in",
          established: 1955,
          affiliation: "State University"
        },
        {
          college_name: "Government College of Engineering and Textile Technology, Serampore",
          city: "Serampore",
          state: "West Bengal", 
          latitude: 22.7520,
          longitude: 88.3420,
          courses_offered: ["B.Tech Computer Science", "B.Tech Electronics", "B.Tech Mechanical", "B.Tech Textile", "M.Tech", "Diploma"],
          cutoff_data: { "WBJEE": 8000, "JEE Main": 45000, "JEXPO": 1200 },
          facilities: ["Library", "Hostels", "Computer Labs", "Textile Lab", "Workshop", "Placement Cell", "Sports Ground"],
          website: "https://gcetts.ac.in",
          established: 1956,
          affiliation: "MAKAUT"
        },
        {
          college_name: "Government College of Engineering and Leather Technology",
          city: "Kolkata",
          state: "West Bengal",
          latitude: 22.5511,
          longitude: 88.3501,
          courses_offered: ["B.Tech Computer Science", "B.Tech Electronics", "B.Tech Mechanical", "Leather Technology", "Fashion Technology", "M.Tech"],
          cutoff_data: { "WBJEE": 12000, "JEE Main": 55000, "GATE": 650 },
          facilities: ["Library", "Hostels", "Computer Labs", "Leather Workshop", "Fashion Design Lab", "CAD Lab", "Canteen"],
          website: "https://gcelt.gov.in",
          established: 1947,
          affiliation: "MAKAUT"
        },
        {
          college_name: "Kalyani Government Engineering College",
          city: "Kalyani",
          state: "West Bengal",
          latitude: 22.9868,
          longitude: 88.4867,
          courses_offered: ["B.Tech Computer Science", "B.Tech Electronics", "B.Tech Mechanical", "B.Tech Civil", "M.Tech"],
          cutoff_data: { "WBJEE": 15000, "JEE Main": 65000, "GATE": 700 },
          facilities: ["Library", "Hostels", "Computer Labs", "Engineering Workshop", "Research Labs", "Canteen", "Sports Complex"],
          website: "https://kgec.edu.in",
          established: 1995,
          affiliation: "MAKAUT"
        },
        // Medical Colleges
        {
          college_name: "Medical College and Hospital, Kolkata",
          city: "Kolkata", 
          state: "West Bengal",
          latitude: 22.5958,
          longitude: 88.3684,
          courses_offered: ["MBBS", "MD General Medicine", "MD Pediatrics", "MS Surgery", "MS Orthopedics", "DM Cardiology", "MCh Neurosurgery", "B.Sc Nursing"],
          cutoff_data: { "NEET UG": 550, "NEET PG": 450, "NEET SS": 380 },
          facilities: ["Medical Library", "Hospital with 1200 beds", "Hostels", "Research Labs", "Anatomy Museum", "Dissection Hall", "ICU", "Emergency"],
          website: "https://mckolkata.gov.in",
          established: 1835,
          affiliation: "West Bengal University of Health Sciences"
        },
        {
          college_name: "R.G. Kar Medical College and Hospital",
          city: "Kolkata",
          state: "West Bengal", 
          latitude: 22.6078,
          longitude: 88.3953,
          courses_offered: ["MBBS", "MD General Medicine", "MD Pathology", "MS Surgery", "MS ENT", "B.Sc Nursing", "Physiotherapy"],
          cutoff_data: { "NEET UG": 520, "NEET PG": 420, "Nursing Entrance": 65 },
          facilities: ["Medical Library", "Hospital with 800 beds", "Hostels", "Research Center", "Pathology Lab", "Operation Theater", "Canteen"],
          website: "https://rgkarmedicalcollege.edu.in",
          established: 1886,
          affiliation: "West Bengal University of Health Sciences"
        },
        {
          college_name: "NRS Medical College and Hospital",
          city: "Kolkata",
          state: "West Bengal",
          latitude: 22.5726,
          longitude: 88.3639,
          courses_offered: ["MBBS", "MD General Medicine", "MD Psychiatry", "MS Surgery", "MS Ophthalmology", "DM Nephrology", "MCh Plastic Surgery"],
          cutoff_data: { "NEET UG": 530, "NEET PG": 440, "NEET SS": 370 },
          facilities: ["Medical Library", "Hospital with 1000 beds", "Hostels", "Research Labs", "Blood Bank", "Dialysis Unit", "Auditorium"],
          website: "https://nrsmedicalcollege.in",
          established: 1874,
          affiliation: "West Bengal University of Health Sciences"
        },
        {
          college_name: "Institute of Post Graduate Medical Education and Research (IPGMER)",
          city: "Kolkata",
          state: "West Bengal",
          latitude: 22.5311,
          longitude: 88.3508,
          courses_offered: ["MD General Medicine", "MD Cardiology", "MS Surgery", "DM Gastroenterology", "MCh Neurosurgery", "Fellowship Programs"],
          cutoff_data: { "NEET PG": 380, "NEET SS": 350, "Fellowship Exam": 320 },
          facilities: ["Medical Library", "SSKM Hospital", "Research Labs", "Conference Halls", "ICU", "Cardiac Cath Lab", "Transplant Unit"],
          website: "https://ipgmer.gov.in",
          established: 1962,
          affiliation: "West Bengal University of Health Sciences"
        },
        {
          college_name: "Calcutta Medical College and Hospital",
          city: "Kolkata",
          state: "West Bengal",
          latitude: 22.5838,
          longitude: 88.3421,
          courses_offered: ["MBBS", "MD Forensic Medicine", "MD Community Medicine", "MS Surgery", "MS Gynecology", "B.Sc Nursing"],
          cutoff_data: { "NEET UG": 540, "NEET PG": 430, "Nursing": 70 },
          facilities: ["Medical Library", "Hospital", "Forensic Lab", "Mortuary", "Hostels", "Research Center", "Canteen"],
          website: "https://calcuttamedicalcollege.edu.in",
          established: 1914,
          affiliation: "West Bengal University of Health Sciences"
        },
        // Arts & Science Colleges
        {
          college_name: "Presidency University",
          city: "Kolkata",
          state: "West Bengal",
          latitude: 22.5726,
          longitude: 88.3639,
          courses_offered: ["BA English", "BA History", "BA Philosophy", "BSc Physics", "BSc Chemistry", "BSc Mathematics", "BSc Economics", "MA", "MSc", "PhD"],
          cutoff_data: { "Class 12": 85, "Entrance Test": 180, "UG Merit": 90 },
          facilities: ["Historic Baker Library", "Hostels", "Physics Labs", "Chemistry Labs", "Computer Center", "Auditorium", "Sports Ground", "Canteen"],
          website: "https://presidency.ac.in",
          established: 1817,
          affiliation: "State University"
        },
        {
          college_name: "Scottish Church College",
          city: "Kolkata",
          state: "West Bengal",
          latitude: 22.5626,
          longitude: 88.3515,
          courses_offered: ["BA English", "BA History", "BA Philosophy", "BSc Physics", "BSc Chemistry", "BSc Mathematics", "BCom", "MA", "MSc", "MCom"],
          cutoff_data: { "Class 12": 75, "Merit List": 160, "Honours": 80 },
          facilities: ["Library", "Computer Labs", "Science Labs", "Hostel", "Chapel", "Sports Ground", "Canteen", "Auditorium"],
          website: "https://scottishchurch.ac.in",
          established: 1830,
          affiliation: "University of Calcutta"
        },
        {
          college_name: "St. Xavier's College, Kolkata",
          city: "Kolkata",
          state: "West Bengal",
          latitude: 22.5512,
          longitude: 88.3501,
          courses_offered: ["BA English", "BA History", "BA Political Science", "BSc Physics", "BSc Chemistry", "BSc Mathematics", "BCom", "BBA", "MA", "MSc", "MBA"],
          cutoff_data: { "Class 12": 80, "Entrance": 170, "Honours": 85 },
          facilities: ["Library", "Computer Labs", "Science Labs", "Business Lab", "Sports Complex", "Auditorium", "Chapel", "Canteen", "Hostels"],
          website: "https://sxccal.edu",
          established: 1860,
          affiliation: "University of Calcutta"
        },
        {
          college_name: "University of Calcutta",
          city: "Kolkata",
          state: "West Bengal",
          latitude: 22.5726,
          longitude: 88.3639,
          courses_offered: ["BA", "BSc", "BCom", "MA", "MSc", "MCom", "PhD", "LLB", "LLM", "B.Ed", "M.Ed"],
          cutoff_data: { "Class 12": 70, "Entrance": 150, "PG Entrance": 120 },
          facilities: ["Senate House", "Central Library", "Computer Centers", "Research Institutes", "Museum", "Auditorium", "Guest House"],
          website: "https://caluniv.ac.in",
          established: 1857,
          affiliation: "State University"
        },
        // Commerce & Management Colleges  
        {
          college_name: "A.K. Chaudhuri School of Information Technology",
          city: "Kolkata",
          state: "West Bengal",
          latitude: 22.4991,
          longitude: 88.3709,
          courses_offered: ["BCA", "MCA", "B.Tech Information Technology", "M.Tech IT", "Certificate Courses"],
          cutoff_data: { "Class 12": 65, "JEE": 140, "JECA": 150 },
          facilities: ["Computer Labs", "Software Development Lab", "Internet Lab", "Library", "Placement Cell", "Project Lab"],
          website: "https://jadavpuruniversity.in/schools/akcsit",
          established: 1994,
          affiliation: "Jadavpur University"
        },
        {
          college_name: "Syamaprasad College",
          city: "Kolkata",
          state: "West Bengal",
          latitude: 22.5186,
          longitude: 88.3439,
          courses_offered: ["BCom", "BCom Honours", "BA Economics", "BSc Mathematics", "MCom", "MA Economics"],
          cutoff_data: { "Class 12": 72, "Commerce Merit": 155, "Honours": 78 },
          facilities: ["Commerce Library", "Computer Lab", "Economics Lab", "Seminar Hall", "Canteen", "Sports Room"],
          website: "https://syamaprasadcollege.ac.in",
          established: 1945,
          affiliation: "University of Calcutta"
        },
        {
          college_name: "Shri Shikshayatan College",
          city: "Kolkata",
          state: "West Bengal",
          latitude: 22.5244,
          longitude: 88.3389,
          courses_offered: ["BCom", "BBA", "BCom Honours", "BA English", "BSc Computer Science", "MCom", "MBA"],
          cutoff_data: { "Class 12": 68, "Merit": 150, "Management Quota": 60 },
          facilities: ["Modern Library", "Computer Labs", "Management Lab", "Conference Hall", "Canteen", "Placement Cell"],
          website: "https://shrishikshayatancollege.ac.in",
          established: 1961,
          affiliation: "University of Calcutta"
        },
        // Specialized Colleges
        {
          college_name: "West Bengal National University of Juridical Sciences",
          city: "Kolkata",
          state: "West Bengal",
          latitude: 22.4991,
          longitude: 88.3709,
          courses_offered: ["BA LLB (Hons)", "BBA LLB (Hons)", "LLM", "PhD Law", "Certificate in Alternative Dispute Resolution"],
          cutoff_data: { "CLAT": 1800, "Class 12": 85, "LSAT": 160 },
          facilities: ["Law Library", "Moot Court Hall", "Computer Lab", "Hostels", "Cafeteria", "Sports Complex", "Auditorium"],
          website: "https://wbnujs.ac.in",
          established: 1999,
          affiliation: "State University"
        },
        {
          college_name: "Government Art College, Kolkata",
          city: "Kolkata",
          state: "West Bengal",
          latitude: 22.5511,
          longitude: 88.3501,
          courses_offered: ["BFA Painting", "BFA Sculpture", "BFA Applied Arts", "BFA Printmaking", "MFA", "Diploma in Fine Arts"],
          cutoff_data: { "Portfolio Assessment": 75, "Entrance Test": 130, "Interview": 80 },
          facilities: ["Art Studios", "Sculpture Workshop", "Printmaking Lab", "Gallery", "Library", "Model Room", "Kiln Room"],
          website: "https://govtartcollege.in",
          established: 1933,
          affiliation: "University of Calcutta"
        },
        {
          college_name: "Rabindra Bharati University",
          city: "Kolkata",
          state: "West Bengal",
          latitude: 22.6078,
          longitude: 88.3953,
          courses_offered: ["BA Music", "BA Dance", "BFA", "MA Music", "MA Dance", "MFA", "PhD in Fine Arts", "Diploma Programs"],
          cutoff_data: { "Class 12": 70, "Talent Test": 140, "Performance": 150 },
          facilities: ["Music Studios", "Dance Halls", "Theatre", "Art Gallery", "Library", "Practice Rooms", "Recording Studio"],
          website: "https://rbu.ac.in",
          established: 1962,
          affiliation: "State University"
        },
        {
          college_name: "Indian Statistical Institute",
          city: "Kolkata",
          state: "West Bengal",
          latitude: 22.5186,
          longitude: 88.3439,
          courses_offered: ["B.Stat", "B.Math", "M.Stat", "M.Math", "M.Tech Computer Science", "MS Quantitative Economics", "PhD"],
          cutoff_data: { "ISI Entrance": 180, "JEE Advanced": 5000, "GATE": 550 },
          facilities: ["Library", "Computer Labs", "Research Labs", "Hostels", "Guest House", "Sports Ground", "Canteen"],
          website: "https://isical.ac.in",
          established: 1931,
          affiliation: "Institute of National Importance"
        },
        {
          college_name: "West Bengal State University",
          city: "Barasat",
          state: "West Bengal",
          latitude: 22.7209,
          longitude: 88.4911,
          courses_offered: ["BA", "BSc", "BCom", "BBA", "BCA", "MA", "MSc", "MCom", "MBA", "MCA", "PhD"],
          cutoff_data: { "Class 12": 65, "Merit Rank": 135, "Entrance": 120 },
          facilities: ["Central Library", "Computer Labs", "Science Labs", "Hostels", "Auditorium", "Sports Ground", "Canteen"],
          website: "https://wbsu.ac.in",
          established: 2008,
          affiliation: "State University"
        },
        // Teacher Training Colleges
        {
          college_name: "West Bengal Board of Primary Education",
          city: "Kolkata",
          state: "West Bengal",
          latitude: 22.5744,
          longitude: 88.3656,
          courses_offered: ["D.El.Ed", "Certificate in Elementary Education", "B.Ed", "Diploma in Physical Education"],
          cutoff_data: { "Class 12": 60, "TET": 60, "D.El.Ed Entrance": 120 },
          facilities: ["Education Library", "Teaching Practice Schools", "Computer Lab", "Psychology Lab", "Sports Ground"],
          website: "https://wbbpe.org",
          established: 1973,
          affiliation: "Government Body"
        },
        {
          college_name: "Government Engineering College",
          city: "Chennai",
          state: "Tamil Nadu",
          latitude: 13.0827,
          longitude: 80.2707,
          courses_offered: ["B.Tech Computer Science", "B.Tech Mechanical", "B.Tech Civil", "B.Tech Electrical"],
          cutoff_data: { "JEE Main": 85, "TNEA": 180, "JEE Advanced": 220 },
          facilities: ["Central Library", "Boys Hostel", "Girls Hostel", "Workshop", "CAD Lab", "Sports Complex"],
          website: "https://govengcollege.ac.in",
          established: 1956,
          affiliation: "Anna University"
        },
        {
          college_name: "Government Medical College",
          city: "Mumbai",
          state: "Maharashtra",
          latitude: 19.0760,
          longitude: 72.8777,
          courses_offered: ["MBBS", "BDS", "B.Sc Nursing", "B.Pharm", "BAMS"],
          cutoff_data: { "NEET UG": 580, "NEET PG": 450, "State CET": 170 },
          facilities: ["Medical Library", "Hospital", "Hostel", "Anatomy Lab", "Pathology Lab", "Research Center"],
          website: "https://govmedcollege.org",
          established: 1845,
          affiliation: "Mumbai University"
        },
        {
          college_name: "Government Arts & Commerce College",
          city: "Jaipur",
          state: "Rajasthan",
          latitude: 26.9124,
          longitude: 75.7873,
          courses_offered: ["B.A English", "B.A Hindi", "B.Com", "B.A History", "B.A Political Science"],
          cutoff_data: { "Merit List": 65, "State Board": 70, "CBSE": 75 },
          facilities: ["Library", "Computer Lab", "Auditorium", "Canteen", "Sports Ground"],
          website: "https://govartscommerce.edu.in",
          established: 1962,
          affiliation: "University of Rajasthan"
        },
        {
          college_name: "Government Polytechnic College",
          city: "Hyderabad",
          state: "Telangana",
          latitude: 17.3850,
          longitude: 78.4867,
          courses_offered: ["Diploma Mechanical", "Diploma Civil", "Diploma Electrical", "Diploma Computer"],
          cutoff_data: { "TS POLYCET": 120, "Merit Rank": 2500 },
          facilities: ["Workshop", "Library", "Hostel", "CAD Lab", "Electronics Lab", "Placement Cell"],
          website: "https://govpolytechnic.ac.in",
          established: 1975,
          affiliation: "State Board of Technical Education"
        },
        {
          college_name: "Government Degree College",
          city: "Pune",
          state: "Maharashtra",
          latitude: 18.5204,
          longitude: 73.8567,
          courses_offered: ["B.Sc IT", "BCA", "B.Com", "B.A Psychology", "B.Sc Biotechnology"],
          cutoff_data: { "Merit List": 68, "MHT-CET": 85, "JEE Main": 70 },
          facilities: ["IT Lab", "Library", "Canteen", "Seminar Hall", "Sports Facilities"],
          website: "https://govdegreecollege.edu.in",
          established: 1978,
          affiliation: "Pune University"
        },
        {
          college_name: "Government Teacher Training College",
          city: "Bhopal",
          state: "Madhya Pradesh",
          latitude: 23.2599,
          longitude: 77.4126,
          courses_offered: ["B.Ed", "M.Ed", "D.El.Ed", "B.A B.Ed", "B.Sc B.Ed"],
          cutoff_data: { "MP B.Ed Entrance": 75, "Merit Rank": 1200 },
          facilities: ["Education Library", "Psychology Lab", "Teaching Practice School", "Hostel", "Computer Lab"],
          website: "https://govteachertraining.mp.gov.in",
          established: 1965,
          affiliation: "Barkatullah University"
        },
        {
          college_name: "Government Agriculture College",
          city: "Coimbatore",
          state: "Tamil Nadu",
          latitude: 11.0168,
          longitude: 76.9558,
          courses_offered: ["B.Sc Agriculture", "B.Tech Agricultural Engineering", "B.Sc Horticulture", "B.Sc Forestry"],
          cutoff_data: { "TNAU Entrance": 140, "ICAR AIEEA": 65 },
          facilities: ["Research Farm", "Agricultural Lab", "Library", "Hostel", "Livestock Unit", "Processing Unit"],
          website: "https://govagricollege.tnau.ac.in",
          established: 1955,
          affiliation: "Tamil Nadu Agricultural University"
        }
      ];

      // Calculate distance using Haversine formula
      const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const R = 6371; // Radius of Earth in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
      };

      // Add distance to each college and sort by distance
      const collegesWithDistance = governmentColleges
        .map(college => ({
          ...college,
          distance: Math.round(calculateDistance(userLat, userLng, college.latitude, college.longitude) * 10) / 10
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 12); // Limit to 12 nearest colleges

      res.json({
        success: true,
        colleges: collegesWithDistance,
        total: collegesWithDistance.length
      });

    } catch (error) {
      console.error('Error fetching colleges:', error);
      res.status(500).json({ error: "Failed to fetch nearby colleges" });
    }
  });

}
