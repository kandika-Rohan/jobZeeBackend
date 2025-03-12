import express from "express";
import dotenv from 'dotenv'
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();

app.use(cookieParser());

config({ path: "./config/.env" });

app.use(
  cors({
    origin: "https://job-seeking-application-git-master-rohans-projects-8a22cb86.vercel.app",
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRouter);

app.use("/api/v1/job", jobRouter);

app.use("/api/v1/application", applicationRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
