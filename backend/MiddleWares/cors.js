import express from "express"
import cors from "cors"

const corsMiddleware = (app) => {
  app.use(express.json());

  const allowedOrigins = [
    process.env.FRONTEND_URL,
    "https://full-stack-mern-restaurant-website-jet.vercel.app/",
    /\.vercel\.app$/,
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.some(pattern => 
          typeof pattern === 'string' ? origin === pattern : pattern.test(origin))
        ) {
          callback(null, true);
        } else {
          console.error(`Blocked by CORS: ${origin}`);
          callback(new Error("Not allowed"));
        }
      },
      credentials: true,
    })
  );
};

export default corsMiddleware