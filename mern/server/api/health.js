import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env.ATLAS_URI || "";

export default async function handler(req, res) {
  // Allow UptimeRobot dan semua origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const startTime = Date.now();
  let dbStatus = "disconnected";
  let dbLatency = null;

  // Cek koneksi MongoDB
  if (URI) {
    const client = new MongoClient(URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      serverSelectionTimeoutMS: 3000,
    });

    try {
      const dbStart = Date.now();
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      dbLatency = Date.now() - dbStart;
      dbStatus = "connected";
      await client.close();
    } catch (err) {
      dbStatus = "error";
      console.error("DB health check error:", err.message);
    }
  }

  const uptime = process.uptime ? Math.floor(process.uptime()) : null;
  const responseTime = Date.now() - startTime;
  const isHealthy = dbStatus === "connected";

  return res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? "UP" : "DEGRADED",
    message: "EduCare Backend is running",
    timestamp: new Date().toISOString(),
    uptime_seconds: uptime,
    response_time_ms: responseTime,
    services: {
      database: {
        status: dbStatus,
        latency_ms: dbLatency,
      },
      api: {
        status: "UP",
      },
    },
    version: "1.0.0",
  });
}