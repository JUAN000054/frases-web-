import React, { useState } from "react";

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

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "frases_wed_belen");

      // Subida a Cloudinary usando fetch
      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/duvquzl9n/image/upload",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await cloudinaryRes.json();
      console.log("Cloudinary respondió:", data);

      if (!data.secure_url) {
        throw new Error("Cloudinary no devolvió secure_url");
      }

      const imageUrl = data.secure_url;

      // Guardar en tu backend
      if (type === "galeria") {
        await fetch(`${backendUrl}/api/imagenes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: imageUrl })
        });
      } else if (type === "fondo") {
        await fetch(`${backendUrl}/api/fondo`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: imageUrl })
        });
      }

      alert("Imagen subida correctamente 🚀");
      setFile(null);

    } catch (err) {
      console.error("❌ Error:", err);
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