import React, { useRef, useEffect } from 'react';

const PhotoModal = ({ photo, onClose }) => {
  const audioRef = useRef(null);

  // 🎶 Reproducir automáticamente si es la última carta
  useEffect(() => {
    if (photo.id === 12 && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Si el navegador bloquea autoplay, queda el botón para reproducir
        console.log("Autoplay bloqueado, usar botón 💖 Mi cora");
      });
    }
  }, [photo]);

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // 🌹 Si es la última carta, disparar lluvia de rosas
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

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt="foto ampliada" className="modal-photo" />

        {/* Carta normal o última carta */}
        <div className={`modal-carta ${photo.id === 12 ? 'ultima-carta' : ''}`}>
          {photo.carta}
        </div>

        {/* 🎵 Audio */}
        <audio ref={audioRef} src={photo.musica} loop />

        {/* Botón para reproducir manualmente */}
        <button className="play-btn" onClick={() => audioRef.current?.play()}>
          💖 Mi cora
        </button>

        <button className="close-btn" onClick={handleClose}>Cerrar ✖</button>
      </div>
    </div>
  );
};

export default PhotoModal;