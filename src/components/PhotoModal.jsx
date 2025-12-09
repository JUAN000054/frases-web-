import React, { useEffect, useRef } from 'react';

const PhotoModal = ({ photo, onClose }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [photo]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt="foto ampliada" className="modal-photo" />
        <p className="modal-carta">{photo.carta}</p>
        <audio ref={audioRef} src={photo.musica} />
        <button className="close-btn" onClick={onClose}>Cerrar ✖</button>
      </div>
    </div>
  );
};

export default PhotoModal;