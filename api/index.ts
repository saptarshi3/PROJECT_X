// Vercel serverless function entry point
import appPromise from "../server/index";

// For Vercel serverless functions, we export the app promise directly
// This handles all API routes through the Express app
export default appPromise;