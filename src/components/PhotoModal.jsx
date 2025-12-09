import React, { useEffect, useRef } from 'react';

const PhotoModal = ({ photo, onClose }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.volume = 0; // empieza en silencio
      audio.play().catch((err) => {
        console.log("El navegador bloqueó la reproducción automática:", err);
      });

      // 🎶 Fade-in: sube el volumen poco a poco
      let vol = 0;
      const fadeInterval = setInterval(() => {
        if (vol < 1) {
          vol += 0.05; // sube de a poco
          audio.volume = Math.min(vol, 1);
        } else {
          clearInterval(fadeInterval);
        }
      }, 200); // cada 200ms sube un poco
    }

    // Al cerrar el modal: pausa y reinicia
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

        {/* 🎵 Reproductor de música con fade-in */}
        <audio 
          ref={audioRef} 
          src={photo.musica} 
          autoPlay 
          loop 
        />

        <button className="close-btn" onClick={onClose}>Cerrar ✖</button>
      </div>
    </div>
  );
};

export default PhotoModal;