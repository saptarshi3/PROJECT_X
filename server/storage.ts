import { type User, type InsertUser, type QuizResult, type InsertQuizResult, type ChatLog, type InsertChatLog } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createQuizResult(quizResult: InsertQuizResult): Promise<QuizResult>;
  getQuizResults(userId?: string): Promise<QuizResult[]>;
  createChatLog(chatLog: InsertChatLog): Promise<ChatLog>;
  getChatLogs(userId?: string): Promise<ChatLog[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quizResults: Map<string, QuizResult>;
  private chatLogs: Map<string, ChatLog>;

  constructor() {
    this.users = new Map();
    this.quizResults = new Map();
    this.chatLogs = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
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
}

export const storage = new MemStorage();
