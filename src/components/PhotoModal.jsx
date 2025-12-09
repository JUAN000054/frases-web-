import React, { useRef } from 'react';

const PhotoModal = ({ photo, onClose }) => {
  const audioRef = useRef(null);

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

        {/* 🎵 Audio sin controles visibles */}
        <audio ref={audioRef} src={photo.musica} loop />

        {/* Botón directo para reproducir */}
        <button className="play-btn" onClick={() => audioRef.current?.play()}>
          💖 Mi cora
        </button>

        <button className="close-btn" onClick={handleClose}>Cerrar ✖</button>
      </div>
    </div>
  );
};

export default PhotoModal;