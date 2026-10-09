import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Notice } from "./models/Notice";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is not set. Add it to server/.env.");
}

app.use(cors());
app.use(express.json());

app.get("/", (_request: Request, response: Response) => {
  response.send("Welcome to the Department Notice Board");
});

app.get("/faculty", (_request: Request, response: Response) => {
  response.json([
    "Dr. Rajesh Kumar",
    "Dr. Priya Sharma",
    "Dr. Arun Kumar",
    "Dr. Sneha Reddy",
    "Dr. Karthik Rao"
  ]);
});

app.get("/api/notices", async (_request: Request, response: Response) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    response.json(notices);
  } catch (error) {
    console.error("Failed to retrieve notices.");
    response.status(500).json({ error: "Unable to retrieve notices." });
  }
});

app.post("/api/notices", async (request: Request, response: Response) => {
  try {
    const { title, message } = request.body as {
      title?: unknown;
      message?: unknown;
    };

    if (typeof title !== "string" || title.trim() === "") {
      response.status(400).json({ error: "Title is required." });
      return;
    }

    if (typeof message !== "string" || message.trim() === "") {
      response.status(400).json({ error: "Message is required." });
      return;
    }

    const notice = await Notice.create({
      title: title.trim(),
      message: message.trim()
    });

    response.status(201).json(notice);
  } catch (error) {
    console.error("Failed to create notice.");
    response.status(500).json({ error: "Unable to create notice." });
  }
});

app.use(
  (
    error: SyntaxError & { status?: number },
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (error instanceof SyntaxError && error.status === 400) {
      response.status(400).json({ error: "Request body must contain valid JSON." });
      return;
    }
    next(error);
  }
);

const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    app.listen(port, () => {
      console.log(`Department Notice Board server running on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

startServer();
