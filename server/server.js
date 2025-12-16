import express from "express";
import cors from "cors";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuración de Multer con Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "para-ti-mi-reina",
    allowed_formats: ["jpg", "png", "jpeg"]
  }
});

const upload = multer({ storage });

// 🔒 Variables en memoria
let currentBackground = null;
let gallery = [];

// 🔎 Subir fondo
app.post("/background", upload.single("file"), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: "No se recibió imagen válida" });
  }
  currentBackground = req.file.path;
  res.json({ url: currentBackground });
});

// 🔎 Obtener fondo
app.get("/background", (req, res) => {
  res.json({ url: currentBackground });
});

// 🔎 Subir imagen a galería
app.post("/gallery", upload.single("file"), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: "No se recibió imagen válida" });
  }
  const imageUrl = req.file.path;
  gallery.push(imageUrl);
  res.json({ url: imageUrl });
});

// 🔎 Obtener galería
app.get("/gallery", (req, res) => {
  res.json({ images: gallery });
});

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});