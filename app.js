import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

// Load environment variables
dotenv.config({ path: "./config/.env" });

const app = express();

// ✅ Improved CORS setup
const allowedOrigins = [
  "https://job-seeking-application-git-master-rohans-projects-8a22cb86.vercel.app",
  "https://job-seeking-application-6973vbv4f-rohans-projects-8a22cb86.vercel.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight requests manually
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigins[0]);
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // ✅ Respond immediately to preflight requests
  }
  next();
});

// ✅ Debugging middleware (logs requests in Railway)
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  if (req.body) console.log("Body:", req.body);
  next();
});

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Database Connection
dbConnection();

// Error Handling Middleware
app.use(errorMiddleware);

export default app;
