import React, { useState } from "react";

const UploadImage = ({
  type = "galeria",
  backendUrl = "https://frases-backend-production.up.railway.app"
}) => {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [debug, setDebug] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Selecciona una imagen primero");
    setLoading(true);
    setDebug("Iniciando subida...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      // ⭐ NUEVO PRESET QUE CREAMOS
      formData.append("upload_preset", "frases_web_public");

      setDebug("Enviando a Cloudinary...");

      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/duvquzl9n/image/upload",
        {
          method: "POST",
          body: formData
        }
      );

      setDebug(`Estado HTTP: ${cloudinaryRes.status}`);

      const text = await cloudinaryRes.text();
      setDebug(prev => prev + "\nRespuesta Cloudinary:\n" + text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        alert("Cloudinary devolvió algo que no es JSON");
        return;
      }

      if (!data.secure_url) {
        alert("Cloudinary no devolvió secure_url");
        return;
      }

      const imageUrl = data.secure_url;

      setDebug(prev => prev + "\nURL generada:\n" + imageUrl);

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
      setDebug("Error general:\n" + err.toString());
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

      {debug && (
        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "#eee",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "6px"
          }}
        >
          {debug}
        </pre>
      )}
    </div>
  );
};

export default UploadImage;