import './Gallery.css';
import React, { useState } from 'react';
import PhotoModal from './PhotoModal';

// Array con todas las fotos, cartas y músicas
const photos = [
  {
    id: 1,
    src: '/images/foto1.jpg',
    carta: 'Descubri un amor que no supe que tenia dentro hasta que te conoci que exploto y me lleno de los sentimientos mas lindos 💖',
    musica: '/music/song1.mp3'
  },
  {
    id: 2,
    src: '/images/foto2.jpg',
    carta: 'Cada día te amo más 🌹',
    musica: '/music/song2.mp3'
  },
  {
    id: 3,
    src: '/images/foto3.jpg',
    carta: 'Siempre serás mi inspiración ✨',
    musica: '/music/song3.mp3'
  },
  {
    id: 4,
    src: '/images/foto4.jpg',
    carta: 'Tu sonrisa ilumina mi mundo 🌞',
    musica: '/music/song4.mp3'
  },
  {
    id: 5,
    src: '/images/foto5.jpg',
    carta: 'Eres lo que nunca busque tampoco espere pero lo que siempre soñe tener 💕',
    musica: '/music/song5.mp3'
  },
  {
    id: 6,
    src: '/images/foto6.jpg',
    carta: 'Cada momento contigo es una bendicion de Dios ✨',
    musica: '/music/song6.mp3'
  },
  {
    id: 7,
    src: '/images/foto7.jpg',
    carta: 'Te pienso en cada instante 🌹',
    musica: '/music/song7.mp3'
  },
  {
    id: 8,
    src: '/images/foto8.jpg',
    carta: 'Eres mi sueño hecho realidad 💌',
    musica: '/music/song8.mp3'
  },
  {
    id: 9,
    src: '/images/foto9.jpg',
    carta: 'Mi corazón late por ti ❤️',
    musica: '/music/song9.mp3'
  },
  {
    id: 10,
    src: '/images/foto10.jpg',
    carta: 'Siempre juntos, siempre felices, siempre con amor 🌈',
    musica: '/music/song10.mp3'
  },
  {
    id: 11,
    src: '/images/foto11.jpg',
    carta: 'Nuestro amor es infinito 🌌',
    musica: '/music/song11.mp3'
  }
];

function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);

    // 🔑 Reproduce la música directamente en el click
    const audio = new Audio(photo.musica);
    audio.volume = 0;
    audio.play().then(() => {
      // Fade-in manual
      let vol = 0;
      const fadeInterval = setInterval(() => {
        if (vol < 1) {
          vol += 0.05;
          audio.volume = Math.min(vol, 1);
        } else {
          clearInterval(fadeInterval);
        }
      }, 200);
    }).catch(err => {
      console.log("Bloqueo de autoplay:", err);
    });
  };

  return (
    <div className="gallery">
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.src}
          alt="foto secreta"
          className="gallery-photo"
          onClick={() => handlePhotoClick(photo)}
        />
      ))}

      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
}

export default Gallery;