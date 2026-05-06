import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env.ATLAS_URI || "";

// Cached connection — penting untuk serverless agar tidak reconnect tiap request
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    appName: "EduCareCluster",
  });

  await client.connect();
  cachedClient = client;
  cachedDb = client.db("educare");

  console.log("MongoDB connected (cached)");
  return cachedDb;
}

// Export sebagai getter agar kompatibel dengan kode lama
const db = new Proxy(
  {},
  {
    get(_, prop) {
      return async (...args) => {
        const database = await connectToDatabase();
        return database[prop](...args);
      };
    },
  }
);

export default db;