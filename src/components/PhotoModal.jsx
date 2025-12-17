import React, { useRef, useEffect, useState } from 'react';

// Configuración de Cloudinary
const CLOUD_NAME = "duvquzl9n"; // tu cloud_name
const UPLOAD_PRESET = "frases_wed_belen"; // tu preset

const PhotoModal = ({ photo, onClose }) => {
  const audioRef = useRef(null);

  // Estados para subida de imagen y frase
  const [frase, setFrase] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🎶 Reproducir automáticamente si es la última carta
  useEffect(() => {
    if (photo.id === 12 && audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Autoplay bloqueado, usar botón 💖 Mi cora");
      });
    }
  }, [photo]);

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (photo.id === 12) {
      crearLluviaDeRosas();
    }

    onClose();
  };

  const crearLluviaDeRosas = () => {
    const colores = ['red', 'pink', 'black'];
    for (let i = 0; i < 30; i++) {
      const rosa = document.createElement('div');
      rosa.className = 'rosa';
      rosa.style.left = Math.random() * 100 + 'vw';
      rosa.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
      document.body.appendChild(rosa);

      setTimeout(() => {
        rosa.remove();
      }, 5000);
    }
  };

  // 📤 Subir imagen a Cloudinary
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    setLoading(true);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url);
      } else {
        alert("No se pudo subir la imagen.");
        console.error("Respuesta Cloudinary:", data);
      }
    } catch (err) {
      alert("Error al subir la imagen.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 💾 Guardar frase + URL
  const handleSave = async () => {
    if (!frase.trim()) return alert("Escribí la frase.");
    if (!imageUrl) return alert("Subí una imagen primero.");

    try {
      // Si tenés backend:
      const res = await fetch("/api/frases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: frase.trim(), imagenUrl: imageUrl })
      });
      const saved = await res.json();
      console.log("Guardado en backend:", saved);

      // Reset
      setFrase("");
      setImageUrl(null);
    } catch (err) {
      console.error("Error al guardar:", err);
      alert("Error al guardar la frase.");
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt="foto ampliada" className="modal-photo" />

        {/* Carta normal o última carta */}
        <div className={`modal-carta ${photo.id === 12 ? 'ultima-carta' : ''}`}>
          {photo.carta}
        </div>

        <audio ref={audioRef} src={photo.musica} loop />

        <button className="play-btn" onClick={() => audioRef.current?.play()}>
          💖 Mi cora
        </button>

        <button className="close-btn" onClick={handleClose}>Cerrar ✖</button>

        {/* Nueva sección para subir imagen y frase */}
        <div style={{ marginTop: "20px" }}>
          <h3>Subir nueva frase con imagen</h3>
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={loading} />
          {loading && <p>Subiendo imagen...</p>}
          {imageUrl && <img src={imageUrl} alt="preview" style={{ maxWidth: 200, marginTop: 10 }} />}

          <input
            type="text"
            value={frase}
            onChange={(e) => setFrase(e.target.value)}
            placeholder="Escribí tu frase..."
            style={{ display: "block", marginTop: 10, width: "100%" }}
          />

          <button onClick={handleSave} style={{ marginTop: 10 }}>
            Guardar frase + imagen
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;