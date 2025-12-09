import React, { useEffect, useRef } from 'react';

const PhotoModal = ({ photo, onClose }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.volume = 0;

      // Reproduce al abrir el modal (ya hubo un click en la foto)
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("El navegador bloqueó la reproducción automática:", err);
        });
      }

      // 🎶 Fade-in
      let vol = 0;
      const fadeInterval = setInterval(() => {
        if (vol < 1) {
          vol += 0.05;
          audio.volume = Math.min(vol, 1);
        } else {
          clearInterval(fadeInterval);
        }
      }, 200);
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

        {/* 🎵 Reproductor de música */}
        <audio 
          ref={audioRef} 
          src={photo.musica} 
          loop 
          controls 
        />

        <button className="close-btn" onClick={onClose}>Cerrar ✖</button>
      </div>
    </div>
  );
};

export default PhotoModal;