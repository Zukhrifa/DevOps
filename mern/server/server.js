import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs"; // Pastikan env terload
import auth from "./routes/auth.js";
import tasks from "./routes/task.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Jalur Route
app.use("/api/auth", auth);
app.use("/api/tasks", tasks);

// Health Check untuk UptimeRobot (Poin 25%)
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "UP", 
    environment: process.env.NODE_ENV || "production",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});