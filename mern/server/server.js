import express from "express";
import cors from "cors";
import "dotenv/config";
import auth from "./api/auth.js";
import tasks from "./api/tasks.js";
import records from "./api/records.js";
import healthHandler from "./api/health.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Mount semua routes
app.use(auth);
app.use(tasks);
app.use(records);

// Health check (gunakan handler yang sama dengan serverless)
app.get("/api/health", healthHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});