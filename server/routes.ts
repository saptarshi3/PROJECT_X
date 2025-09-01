import type { Express } from "express";
import { storage } from "./storage";
import { insertQuizResultSchema, insertChatLogSchema, insertUserSchema, loginUserSchema, insertCareerSchema, insertSavedCareerSchema } from "@shared/schema";
import { getChatResponse, getCareerRecommendation } from "./lib/gemini";

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
  app.post("/api/quiz/submit", async (req, res) => {
    try {
      const data = insertQuizResultSchema.parse(req.body);
      
      // Get AI recommendation for the quiz results
      const aiRecommendation = await getCareerRecommendation(data.answers as any[]);
      
      const quizResult = await storage.createQuizResult({
        ...data,
        result: data.result + " | AI Analysis: " + aiRecommendation,
      });
      
      res.json({ success: true, result: quizResult });
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

}
