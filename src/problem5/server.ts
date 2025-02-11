import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./routes/user.route"; // Import user routes

dotenv.config(); // Load environment variables from .env file

const app: Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3101; // Set port from environment variable or default to 3101

// Middleware
app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded data
app.use(express.json()); // Middleware for parsing JSON data
app.use(cors()); // Middleware for handling CORS (Cross-Origin Resource Sharing)

// MongoDB connection function
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(
      process.env.DB_URI as string,
    ); // Connect to MongoDB with environment credentials
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit process if connection fails
  }
};
connectDB(); // Call the connection function

// Use user routes
app.use("/api/user", UserRoute); // Set up user-related routes

// Define a sample route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript with Express!"); // Respond with a basic message
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error stack
  res.status(500).json({ success: false, message: "Internal Server Error" }); // Respond with error message
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`); // Log server start message
});
