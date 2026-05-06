import express from "express";
import cors from "cors";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/records", async (req, res) => {
  try {
    const collection = await db.collection("records");
    const results = await collection.find({}).toArray();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: "Error mengambil records" });
  }
});

app.get("/api/records/:id", async (req, res) => {
  try {
    const collection = await db.collection("records");
    const result = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!result) return res.status(404).json({ message: "Not found" });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

app.post("/api/records", async (req, res) => {
  try {
    const newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    const collection = await db.collection("records");
    const result = await collection.insertOne(newDocument);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error adding record" });
  }
});

app.patch("/api/records/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = { $set: { name: req.body.name, position: req.body.position, level: req.body.level } };
    const collection = await db.collection("records");
    const result = await collection.updateOne(query, updates);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error updating record" });
  }
});

app.delete("/api/records/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const result = await db.collection("records").deleteOne(query);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error deleting record" });
  }
});

export default app;