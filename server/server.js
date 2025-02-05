import "./configs/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { clerkMiddleware } from "@clerk/express";

// Initialize Express

const app = express();

// connect to database
//await connectDB();
//await connectCloudinary();
(async () => {
  try {
    await connectDB();
    await connectCloudinary();
    console.log("Database & Cloudinary connected!");
  } catch (error) {
    console.error("Error in DB or Cloudinary connection:", error);
    process.exit(1); // Exit if connection fails
  }
})();


// Middlewares

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Routes

app.get("/", async (req, res) => {
  res.send("Api working!");
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebhooks);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

// Port

const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
