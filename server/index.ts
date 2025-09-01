import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Create and configure the Express app
async function createApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Logging middleware for API requests
  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }

        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }

        // Use console.log for serverless compatibility
        const logFn = typeof log !== 'undefined' ? log : console.log;
        logFn(logLine);
      }
    });

    next();
  });

  // Register all API routes
  await registerRoutes(app);

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    console.error(err);
  });

  return app;
}

// Main initialization function
async function init() {
  const app = await createApp();

  // Only setup Vite/static serving in development or when running locally
  if (process.env.NODE_ENV === "development") {
    const { createServer } = await import("http");
    const server = createServer(app);
    await setupVite(app, server);
    
    const port = parseInt(process.env.PORT || '5000', 10);
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      const logFn = typeof log !== 'undefined' ? log : console.log;
      logFn(`serving on port ${port}`);
    });
  } else if (process.env.NODE_ENV === "production" && !process.env.VERCEL) {
    // Production but not on Vercel (e.g., other hosting)
    serveStatic(app);
    
    const { createServer } = await import("http");
    const server = createServer(app);
    const port = parseInt(process.env.PORT || '5000', 10);
    server.listen(port, "0.0.0.0", () => {
      console.log(`serving on port ${port}`);
    });
  }

  return app;
}

// Create a promise that resolves to the app for Vercel
const appPromise = createApp();

// For development and local usage - start server
if (process.env.NODE_ENV === "development" || (process.env.NODE_ENV === "production" && !process.env.VERCEL)) {
  init().catch(console.error);
}

// Export the Express app for Vercel serverless functions
export default appPromise;
