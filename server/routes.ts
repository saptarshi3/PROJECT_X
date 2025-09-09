import type { Express } from "express";
import { storage } from "./storage";
import { insertQuizResultSchema, insertChatLogSchema, insertUserSchema, loginUserSchema, insertCareerSchema, insertSavedCareerSchema } from "@shared/schema";
import { getChatResponse, getCareerRecommendation } from "./lib/gemini";
import { OAuth2Client } from 'google-auth-library';

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
        // New adaptive scoring system
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
        
        const resultData = {
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
        
        // Store in database
        const quizResult = await storage.createQuizResult({
          userId: userId || "anonymous",
          answers,
          result: `${quizData.cluster} (Score: ${finalScore}) | AI Analysis: ${aiRecommendation}`,
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

      // Mock government colleges data with realistic information
      const governmentColleges = [
        {
          college_name: "Government Science College",
          city: "Kolkata",
          state: "West Bengal",
          latitude: 22.5726,
          longitude: 88.3639,
          courses_offered: ["B.Sc Physics", "B.Sc Chemistry", "B.Sc Mathematics", "B.Sc Biology"],
          cutoff_data: { "JEE": 75, "State Exam": 80, "NEET": 520 },
          facilities: ["Library", "Hostel", "Computer Lab", "Physics Lab", "Chemistry Lab"],
          website: "https://govsciencecollege.edu.in",
          established: 1968,
          affiliation: "University of Calcutta"
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
