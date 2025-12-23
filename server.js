import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import Image from "./models/Image.js";
import Background from "./models/Background.js";

dotenv.config();

const app = express();

// ✅ CORS configurado para Vercel + local
app.use(cors({
  origin: [
    "https://frases-web-chi.vercel.app", // tu frontend en Vercel
    "http://localhost:5173",             // por si probás en local
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

// ✅ Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));


// ===============================
// 📌 RUTAS DE IMÁGENES
// ===============================

// Obtener todas las imágenes
app.get("/api/imagenes", async (req, res) => {
  try {
    const imagenes = await Image.find().sort({ createdAt: -1 });
    res.json(imagenes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener imágenes" });
  }
});

// Guardar una nueva imagen
app.post("/api/imagenes", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "Falta la URL" });

    const nueva = await Image.create({ url });
    res.json(nueva);
  } catch (err) {
    res.status(500).json({ error: "Error al guardar imagen" });
  }
});


// ===============================
// 📌 RUTAS DE FONDO (CORREGIDAS)
// ===============================

// Obtener fondo actual (crea uno vacío si no existe)
app.get("/api/fondo", async (req, res) => {
  try {
    let fondo = await Background.findOne().sort({ updatedAt: -1 });

    // Si no existe, lo creamos vacío
    if (!fondo) {
      fondo = await Background.create({ url: "" });
    }

    res.json(fondo);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener fondo" });
  }
});

// Actualizar fondo
app.put("/api/fondo", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "Falta la URL" });

    let fondo = await Background.findOne();

    if (fondo) {
      fondo.url = url;
      fondo.updatedAt = new Date();
      await fondo.save();
    } else {
      fondo = await Background.create({ url });
    }

    res.json(fondo);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar fondo" });
  }
});


// ===============================
// 🚀 Servidor
// ===============================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));