import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Ambil semua tugas
router.get("/", async (req, res) => {
  let collection = await db.collection("tasks");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Tambah tugas baru
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      title: req.body.title,
      description: req.body.description,
      status: "pending",
    };
    let collection = await db.collection("tasks");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    res.status(500).send("Error menambahkan tugas");
  }
});

export default router;