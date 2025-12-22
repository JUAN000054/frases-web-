import React, { useState } from "react";
import axios from "axios";

const UploadImage = ({
  type = "galeria",
  backendUrl = "https://frases-backend-production.up.railway.app"
}) => {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Selecciona una imagen primero");
    setLoading(true);

    try {
      console.log("📤 Subiendo a Cloudinary...");

      // 1. Subir a Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "frases_wed_belen");

      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/duvquzl9n/image/upload",
        formData
      );

      console.log("✅ Cloudinary respondió:", cloudinaryRes.data);

      const imageUrl = cloudinaryRes.data.secure_url;

      // 2. Guardar en tu backend
      if (type === "galeria") {
        console.log("📨 Enviando a backend /api/imagenes...");
        await axios.post(`${backendUrl}/api/imagenes`, { url: imageUrl });
      } else if (type === "fondo") {
        console.log("📨 Enviando a backend /api/fondo...");
        await axios.put(`${backendUrl}/api/fondo`, { url: imageUrl });
      }

      alert("Imagen subida y guardada correctamente 🚀");
      setFile(null);

    } catch (err) {
      console.error("❌ Error en subida:", err);
      alert("Error al subir la imagen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "grid", gap: "10px", marginTop: "20px" }}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Subiendo..." : "Subir imagen"}
      </button>
    </div>
  );
};

export default UploadImage;