import express from "express";
import cors from "cors";
import db from "../db/connection.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/auth/login", async (req, res) => {
  try {
    const collection = await db.collection("users");
    const user = await collection.findOne({ email: req.body.email });

    if (user && user.password === req.body.password) {
      res.status(200).json({
        message: "Login Berhasil",
        user: { name: user.name, email: user.email },
      });
    } else {
      res.status(401).json({ message: "Email atau Password salah" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error pada server" });
  }
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const collection = await db.collection("users");
    const existing = await collection.findOne({ email: req.body.email });

    if (existing) {
      return res.status(409).json({ message: "Email sudah terdaftar" });
    }

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, // di produksi: hash dengan bcrypt
      role: req.body.role || "student",
      createdAt: new Date(),
    };

    await collection.insertOne(newUser);
    res.status(201).json({ message: "Registrasi berhasil" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error pada server" });
  }
});

export default app;