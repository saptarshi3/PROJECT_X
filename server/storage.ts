import { type User, type InsertUser, type LoginUser, type QuizResult, type InsertQuizResult, type ChatLog, type InsertChatLog, type SavedCareer, type InsertSavedCareer } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  validateUser(credentials: LoginUser): Promise<User | null>;
  createQuizResult(quizResult: InsertQuizResult): Promise<QuizResult>;
  getQuizResults(userId?: string): Promise<QuizResult[]>;
  createChatLog(chatLog: InsertChatLog): Promise<ChatLog>;
  getChatLogs(userId?: string): Promise<ChatLog[]>;
  createSavedCareer(savedCareer: InsertSavedCareer): Promise<SavedCareer>;
  getSavedCareers(userId: string): Promise<SavedCareer[]>;
  deleteSavedCareer(id: string, userId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quizResults: Map<string, QuizResult>;
  private chatLogs: Map<string, ChatLog>;
  private savedCareers: Map<string, SavedCareer>;

  constructor() {
    this.users = new Map();
    this.quizResults = new Map();
    this.chatLogs = new Map();
    this.savedCareers = new Map();
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

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      fullName: insertUser.fullName || null,
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

  async createSavedCareer(insertSavedCareer: InsertSavedCareer): Promise<SavedCareer> {
    const id = randomUUID();
    const savedCareer: SavedCareer = {
      ...insertSavedCareer,
      salaryRange: insertSavedCareer.salaryRange || null,
      description: insertSavedCareer.description || null,
      requiredSkills: insertSavedCareer.requiredSkills || null,
      roadmap: insertSavedCareer.roadmap || null,
      exams: insertSavedCareer.exams || null,
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
}

export const storage = new MemStorage();
