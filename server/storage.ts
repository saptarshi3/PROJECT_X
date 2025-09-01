import { type User, type InsertUser, type LoginUser, type QuizResult, type InsertQuizResult, type ChatLog, type InsertChatLog, type Career, type InsertCareer, type SavedCareer, type InsertSavedCareer } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
  validateUser(credentials: LoginUser): Promise<User | null>;
  createQuizResult(quizResult: InsertQuizResult): Promise<QuizResult>;
  getQuizResults(userId?: string): Promise<QuizResult[]>;
  createChatLog(chatLog: InsertChatLog): Promise<ChatLog>;
  getChatLogs(userId?: string): Promise<ChatLog[]>;
  // Career operations
  createCareer(career: InsertCareer): Promise<Career>;
  getCareers(industry?: string, skills?: string[]): Promise<Career[]>;
  getCareerById(id: string): Promise<Career | undefined>;
  searchCareers(query: string): Promise<Career[]>;
  // Saved career operations
  createSavedCareer(savedCareer: InsertSavedCareer): Promise<SavedCareer>;
  getSavedCareers(userId: string): Promise<SavedCareer[]>;
  deleteSavedCareer(id: string, userId: string): Promise<boolean>;
  isCareerSaved(careerId: string, userId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quizResults: Map<string, QuizResult>;
  private chatLogs: Map<string, ChatLog>;
  private careers: Map<string, Career>;
  private savedCareers: Map<string, SavedCareer>;

  constructor() {
    this.users = new Map();
    this.quizResults = new Map();
    this.chatLogs = new Map();
    this.careers = new Map();
    this.savedCareers = new Map();
    this.initializeCareers();
  }

  private initializeCareers() {
    // Initialize with sample careers for development
    this.populateInitialCareers();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async validateUser(credentials: LoginUser): Promise<User | null> {
    const user = await this.getUserByUsername(credentials.username);
    if (user && user.password === credentials.password) {
      return user;
    }
    return null;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error('User not found');
    }
    
    const updatedUser = { ...user, ...data };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      fullName: insertUser.fullName || null,
      googleId: insertUser.googleId || null,
      profilePicture: insertUser.profilePicture || null,
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async createQuizResult(insertQuizResult: InsertQuizResult): Promise<QuizResult> {
    const id = randomUUID();
    const quizResult: QuizResult = {
      ...insertQuizResult,
      userId: insertQuizResult.userId || null,
      id,
      createdAt: new Date(),
    };
    this.quizResults.set(id, quizResult);
    return quizResult;
  }

  async getQuizResults(userId?: string): Promise<QuizResult[]> {
    const results = Array.from(this.quizResults.values());
    if (userId) {
      return results.filter(result => result.userId === userId);
    }
    return results;
  }

  async createChatLog(insertChatLog: InsertChatLog): Promise<ChatLog> {
    const id = randomUUID();
    const chatLog: ChatLog = {
      ...insertChatLog,
      userId: insertChatLog.userId || null,
      id,
      createdAt: new Date(),
    };
    this.chatLogs.set(id, chatLog);
    return chatLog;
  }

  async getChatLogs(userId?: string): Promise<ChatLog[]> {
    const logs = Array.from(this.chatLogs.values());
    if (userId) {
      return logs.filter(log => log.userId === userId);
    }
    return logs.sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0));
  }

  // Career operations
  async createCareer(insertCareer: InsertCareer): Promise<Career> {
    const id = randomUUID();
    const career: Career = {
      ...insertCareer,
      resources: insertCareer.resources || null,
      roadmap: insertCareer.roadmap || null,
      tags: insertCareer.tags || null,
      featured: insertCareer.featured || "false",
      id,
      createdAt: new Date(),
    };
    this.careers.set(id, career);
    return career;
  }

  async getCareers(industry?: string, skills?: string[]): Promise<Career[]> {
    let result = Array.from(this.careers.values());
    
    if (industry) {
      result = result.filter(career => 
        career.industry.toLowerCase().includes(industry.toLowerCase())
      );
    }
    
    if (skills && skills.length > 0) {
      result = result.filter(career => {
        const careerSkills = career.skills as string[];
        return skills.some(skill => 
          careerSkills.some(careerSkill => 
            careerSkill.toLowerCase().includes(skill.toLowerCase())
          )
        );
      });
    }
    
    return result.sort((a, b) => (a.featured === "true" ? -1 : 1));
  }

  async getCareerById(id: string): Promise<Career | undefined> {
    return this.careers.get(id);
  }

  async searchCareers(query: string): Promise<Career[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.careers.values()).filter(career => 
      career.title.toLowerCase().includes(lowercaseQuery) ||
      career.description.toLowerCase().includes(lowercaseQuery) ||
      career.industry.toLowerCase().includes(lowercaseQuery) ||
      (career.skills as string[]).some(skill => 
        skill.toLowerCase().includes(lowercaseQuery)
      )
    );
  }

  async createSavedCareer(insertSavedCareer: InsertSavedCareer): Promise<SavedCareer> {
    const id = randomUUID();
    const savedCareer: SavedCareer = {
      ...insertSavedCareer,
      notes: insertSavedCareer.notes || null,
      id,
      createdAt: new Date(),
    };
    this.savedCareers.set(id, savedCareer);
    return savedCareer;
  }

  async getSavedCareers(userId: string): Promise<SavedCareer[]> {
    return Array.from(this.savedCareers.values()).filter(
      career => career.userId === userId
    );
  }

  async deleteSavedCareer(id: string, userId: string): Promise<boolean> {
    const career = this.savedCareers.get(id);
    if (career && career.userId === userId) {
      this.savedCareers.delete(id);
      return true;
    }
    return false;
  }

  async isCareerSaved(careerId: string, userId: string): Promise<boolean> {
    return Array.from(this.savedCareers.values()).some(
      saved => saved.careerId === careerId && saved.userId === userId
    );
  }

  private populateInitialCareers() {
    const sampleCareers: InsertCareer[] = [
      {
        title: "Software Engineer",
        description: "Design, develop, and maintain software applications and systems using various programming languages and frameworks.",
        industry: "Technology",
        skills: ["JavaScript", "Python", "React", "Node.js", "Databases", "Git"],
        salaryRange: "$80,000 - $150,000",
        education: "Bachelor's in Computer Science or related field",
        experience: "0-2 years",
        growth: "High demand with excellent career progression",
        featured: "true",
        tags: ["Remote Work", "High Salary", "Innovation"],
        resources: {
          certifications: ["AWS Certified Developer", "Google Cloud Professional"],
          courses: ["Full Stack Development", "System Design"],
          platforms: ["GitHub", "LeetCode", "Stack Overflow"]
        },
        roadmap: {
          junior: "Learn programming fundamentals, build projects",
          mid: "Master frameworks, contribute to open source",
          senior: "Lead teams, architect systems, mentor others"
        }
      },
      {
        title: "Digital Marketing Specialist",
        description: "Create and execute digital marketing campaigns across various platforms to drive brand awareness and customer engagement.",
        industry: "Marketing",
        skills: ["SEO", "Social Media", "Google Analytics", "Content Marketing", "PPC Advertising"],
        salaryRange: "$45,000 - $85,000",
        education: "Bachelor's in Marketing, Communications, or related field",
        experience: "1-3 years",
        growth: "Growing field with diverse opportunities",
        featured: "true",
        tags: ["Creative", "Data-Driven", "Remote Work"],
        resources: {
          certifications: ["Google Ads", "HubSpot Content Marketing", "Facebook Blueprint"],
          courses: ["Digital Marketing Fundamentals", "Analytics and Data"],
          platforms: ["LinkedIn Learning", "Coursera", "Google Skillshop"]
        }
      },
      {
        title: "Data Scientist",
        description: "Analyze complex datasets to extract insights and build predictive models that drive business decisions.",
        industry: "Technology",
        skills: ["Python", "R", "Machine Learning", "SQL", "Statistics", "Data Visualization"],
        salaryRange: "$95,000 - $180,000",
        education: "Master's in Data Science, Statistics, or related field",
        experience: "2-4 years",
        growth: "Extremely high demand across all industries",
        featured: "true",
        tags: ["High Salary", "Analytics", "AI/ML"],
        resources: {
          certifications: ["Google Data Analytics", "IBM Data Science"],
          courses: ["Machine Learning", "Statistical Analysis"],
          platforms: ["Kaggle", "DataCamp", "Coursera"]
        }
      }
    ];

    sampleCareers.forEach(career => {
      this.createCareer(career);
    });
  }
}

export const storage = new MemStorage();
