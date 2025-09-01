import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const quizResults = pgTable("quiz_results", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id"),
  answers: jsonb("answers").notNull(),
  result: text("result").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const chatLogs = pgTable("chat_logs", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id"),
  message: text("message").notNull(),
  response: text("response").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const careers = pgTable("careers", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  industry: text("industry").notNull(),
  skills: jsonb("skills").notNull(), // Array of required skills
  salaryRange: text("salary_range").notNull(),
  education: text("education").notNull(),
  experience: text("experience").notNull(),
  growth: text("growth").notNull(),
  resources: jsonb("resources"), // Learning resources, certifications, etc.
  roadmap: jsonb("roadmap"), // Career progression steps
  tags: jsonb("tags"), // For better filtering
  featured: text("featured").default("false"), // For highlighting top careers
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const savedCareers = pgTable("saved_careers", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  careerId: text("career_id").notNull(), // Reference to careers table
  notes: text("notes"), // User's personal notes
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const loginUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertQuizResultSchema = createInsertSchema(quizResults).omit({
  id: true,
  createdAt: true,
});

export const insertChatLogSchema = createInsertSchema(chatLogs).omit({
  id: true,
  createdAt: true,
});

export const insertCareerSchema = createInsertSchema(careers).omit({
  id: true,
  createdAt: true,
});

export const insertSavedCareerSchema = createInsertSchema(savedCareers).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type User = typeof users.$inferSelect;
export type QuizResult = typeof quizResults.$inferSelect;
export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;
export type ChatLog = typeof chatLogs.$inferSelect;
export type InsertChatLog = z.infer<typeof insertChatLogSchema>;
export type Career = typeof careers.$inferSelect;
export type InsertCareer = z.infer<typeof insertCareerSchema>;
export type SavedCareer = typeof savedCareers.$inferSelect;
export type InsertSavedCareer = z.infer<typeof insertSavedCareerSchema>;
