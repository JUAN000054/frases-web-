import React, { useRef } from 'react';

const PhotoModal = ({ photo, onClose }) => {
  const audioRef = useRef(null);

  const handlePlayMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        // 🎶 Fade-in
        let vol = 0;
        const fadeInterval = setInterval(() => {
          if (vol < 1) {
            vol += 0.05;
            audioRef.current.volume = Math.min(vol, 1);
          } else {
            clearInterval(fadeInterval);
          }
        }, 200);
      }).catch(err => {
        console.log("Bloqueo de autoplay:", err);
      });
    }
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt="foto ampliada" className="modal-photo" />
        <p className="modal-carta">{photo.carta}</p>

        {/* 🎵 Reproductor de música */}
        <audio ref={audioRef} src={photo.musica} loop controls />

        {/* Botón para iniciar la música */}
        <button className="play-btn" onClick={handlePlayMusic}>
        💖 Mi cora
         </button>


        <button className="close-btn" onClick={handleClose}>Cerrar ✖</button>
      </div>
    </div>
  );
};

export default PhotoModal;