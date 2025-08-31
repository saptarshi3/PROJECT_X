# CareerGuide - AI-Powered Career Assessment Platform

## Overview

CareerGuide is a modern React-based web application that helps users discover their ideal career paths through an intelligent assessment system and AI-powered chat assistance. The platform combines a 10-question career quiz with Google's Gemini AI to provide personalized career recommendations and real-time guidance. Built with a focus on user experience, it features glassmorphism design elements, smooth animations, and responsive layouts across all devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The application uses a **React + TypeScript + Vite** stack with a component-based architecture. The frontend is organized into distinct pages (home, quiz, chat) with a flat file structure for simplicity. Key architectural decisions include:

- **Routing**: Uses Wouter for lightweight client-side routing instead of React Router
- **State Management**: Combines React hooks with TanStack Query for server state management
- **UI Framework**: Implements shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Uses Tailwind CSS with custom design tokens supporting dark/light themes
- **Animations**: Framer Motion for smooth transitions and glassmorphism effects

### Backend Architecture

The backend follows an **Express.js REST API** pattern with the following design choices:

- **Server Structure**: Single entry point with modular route registration
- **Data Storage**: Implements an abstraction layer (IStorage interface) with in-memory storage for development
- **Schema Management**: Uses Drizzle ORM with PostgreSQL schema definitions in a shared folder
- **API Design**: RESTful endpoints for quiz submissions and chat interactions

### Authentication & Authorization

Currently implements a simplified system without complex authentication:
- Uses anonymous user IDs for data association
- Session-based tracking for quiz results and chat history
- Designed for easy extension to full authentication system

### Data Architecture

**Database Schema** (PostgreSQL with Drizzle ORM):
- `users` table: Basic user information with username/password
- `quiz_results` table: Stores quiz answers, results, and AI analysis
- `chat_logs` table: Maintains chat history with AI responses

**Data Flow**:
1. Quiz responses are processed and analyzed by Gemini AI
2. Chat messages trigger real-time AI responses
3. All interactions are logged for personalization

### AI Integration Strategy

**Google Gemini Integration**:
- **Career Assessment**: Uses Gemini Pro for detailed career analysis based on quiz responses
- **Chat Assistant**: Implements Gemini Flash for real-time conversational career guidance
- **Prompt Engineering**: Specialized system prompts for career-focused responses
- **Error Handling**: Graceful fallbacks when AI services are unavailable

### Development & Deployment

**Build System**:
- Vite for fast development and optimized production builds
- TypeScript compilation with strict type checking
- ESBuild for server-side bundling

**Development Workflow**:
- Hot module replacement for frontend development
- Automatic TypeScript compilation
- Integrated development server with API proxy

## External Dependencies

### Core Technologies
- **React 18**: Frontend framework with modern hooks and concurrent features
- **TypeScript**: Static typing for improved developer experience
- **Vite**: Build tool and development server
- **Express.js**: Node.js web framework for API server

### Database & ORM
- **PostgreSQL**: Primary database (configured for Neon serverless)
- **Drizzle ORM**: Type-safe database toolkit with schema management
- **@neondatabase/serverless**: Serverless PostgreSQL adapter

### AI Services
- **Google Gemini AI**: Integrated via @google/genai package for career analysis and chat responses

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework with custom theme
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Animation library for smooth interactions
- **Lucide React**: Icon library

### State Management & Data Fetching
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation for type safety

### Development Tools
- **Wouter**: Lightweight routing library
- **date-fns**: Date manipulation utilities
- **clsx**: Conditional className utility
- **class-variance-authority**: Component variant management

### Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions