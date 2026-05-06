import express from "express";
import db from "../db/connection.js";

const router = express.Router();

// Mock Login - Dalam produksi, gunakan bcrypt dan JWT
router.post("/login", async (req, res) => {
  try {
    const collection = await db.collection("users");
    const user = await collection.findOne({ email: req.body.email });
    
    if (user && user.password === req.body.password) {
      res.status(200).send({ message: "Login Berhasil", user: { name: user.name, email: user.email } });
    } else {
      res.status(401).send("Email atau Password salah");
    }
  } catch (err) {
    res.status(500).send("Error pada server");
  }
});

export default router;