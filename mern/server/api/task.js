import express from "express";
import cors from "cors";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const app = express();
app.use(cors());
app.use(express.json());

// GET semua tugas
app.get("/api/tasks", async (req, res) => {
  try {
    const collection = await db.collection("tasks");
    const results = await collection.find({}).toArray();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: "Error mengambil tugas" });
  }
});

// GET tugas by ID
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const collection = await db.collection("tasks");
    const result = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!result) return res.status(404).json({ message: "Tugas tidak ditemukan" });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error mengambil tugas" });
  }
});

// POST tambah tugas baru
app.post("/api/tasks", async (req, res) => {
  try {
    const newDocument = {
      title: req.body.title,
      description: req.body.description,
      subject: req.body.subject || "",
      status: "pending",
      createdAt: new Date(),
      dueDate: req.body.dueDate ? new Date(req.body.dueDate) : null,
    };
    const collection = await db.collection("tasks");
    const result = await collection.insertOne(newDocument);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error menambahkan tugas" });
  }
});

// PATCH update tugas
app.patch("/api/tasks/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        updatedAt: new Date(),
      },
    };
    const collection = await db.collection("tasks");
    const result = await collection.updateOne(query, updates);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error mengupdate tugas" });
  }
});

// DELETE tugas
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("tasks");
    const result = await collection.deleteOne(query);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error menghapus tugas" });
  }
});

export default app;