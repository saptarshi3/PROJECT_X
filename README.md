# Career Guidance Platform

A full-stack React application with Express.js backend for career guidance and educational recommendations.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: Google Gemini API

## Deployment on Vercel

### Prerequisites

1. Fork or clone this repository
2. Install Vercel CLI: `npm i -g vercel`
3. Get a Google Gemini API key from [Google AI Studio](https://ai.google.dev/)

### Environment Variables

Set up these environment variables in your Vercel dashboard:

```bash
GOOGLE_API_KEY=your_google_gemini_api_key
NODE_ENV=production
```

### Deploy

1. Connect your repository to Vercel
2. The project will auto-deploy using the included `vercel.json` configuration
3. Set environment variables in Vercel dashboard
4. Deploy!

### Local Development

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5000`

## Features

- Career assessment quiz
- AI-powered career recommendations
- College and scholarship database
- Interactive career guidance chat
- User authentication and profiles
- Career roadmaps and resources

## Project Structure

```
├── api/           # Vercel serverless functions
├── client/        # React frontend application
├── server/        # Express.js backend
├── shared/        # Shared TypeScript types and schemas
└── dist/          # Built frontend assets
```