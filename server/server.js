import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "para-ti-mi-reina",
    allowed_formats: ["jpg", "png", "jpeg"]
  }
});

const upload = multer({ storage });

let currentBackground = null;
let gallery = [];

app.post("/background", upload.single("file"), (req, res) => {
  currentBackground = req.file.path;
  res.json({ url: currentBackground });
});

app.get("/background", (req, res) => {
  res.json({ url: currentBackground });
});

app.post("/gallery", upload.single("file"), (req, res) => {
  const imageUrl = req.file.path;
  gallery.push(imageUrl);
  res.json({ url: imageUrl });
});

app.get("/gallery", (req, res) => {
  res.json({ images: gallery });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});