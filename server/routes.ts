import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizResultSchema, insertChatLogSchema } from "@shared/schema";
import { getChatResponse, getCareerRecommendation } from "./lib/gemini";

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);
  return httpServer;
}
