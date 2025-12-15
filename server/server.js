// Importamos las librerías que instalaste
import express from "express";   // servidor web
import multer from "multer";     // subir archivos
import cors from "cors";         // permitir conexión con tu React

const app = express();
app.use(cors()); // habilita que tu frontend pueda hablar con este backend

// Configuración de multer: dónde y cómo guardar las fotos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // carpeta donde se guardan
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname) // nombre único
});
const upload = multer({ storage });

// Variables para recordar fondo y galería
let background = null;
let gallery = [];

// Endpoint para subir fondo
app.post("/upload-background", upload.single("file"), (req, res) => {
  background = `/uploads/${req.file.filename}`;
  res.json({ url: background });
});

// Endpoint para subir foto a galería
app.post("/upload-gallery", upload.single("file"), (req, res) => {
  const url = `/uploads/${req.file.filename}`;
  gallery.push(url);
  res.json({ url });
});

// Endpoint para obtener fondo actual
app.get("/background", (req, res) => {
  res.json({ url: background });
});

// Endpoint para obtener galería completa
app.get("/gallery", (req, res) => {
  res.json({ photos: gallery });
});

// Servir las imágenes guardadas
app.use("/uploads", express.static("uploads"));

// Arrancar el servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});