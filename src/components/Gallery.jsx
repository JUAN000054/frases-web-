import './Gallery.css';
import React, { useState } from 'react';
import PhotoModal from './PhotoModal';

// Array con todas las fotos, cartas y músicas
const photos = [
  {
    id: 1,
    src: '/images/foto1.jpg',
    carta: 'Descubrí un amor que no supe que tenía dentro hasta que te conocí 💖',
    musica: '/music/miamor.mp3'
  },
  {
    id: 2,
    src: '/images/foto2.jpg',
    carta: 'Cada día te amo más 🌹',
    musica: '/music/micorazon.mp3'
  },
  {
    id: 3,
    src: '/images/foto3.jpg',
    carta: 'Siempre serás mi inspiración ✨',
    musica: '/music/mifuturo.mp3'
  },
  {
    id: 4,
    src: '/images/foto4.jpg',
    carta: 'Tu sonrisa ilumina mi mundo 🌞',
    musica: '/music/miluz.mp3'
  },
  {
    id: 5,
    src: '/images/foto5.jpg',
    carta: 'Eres lo que nunca busqué, tampoco esperé, pero lo que siempre soñé tener 💕',
    musica: '/music/mimundo.mp3'
  },
  {
    id: 6,
    src: '/images/foto6.jpg',
    carta: 'Cada momento contigo es una bendición de Dios ✨',
    musica: '/music/minovia.mp3'
  },
  {
    id: 7,
    src: '/images/foto7.jpg',
    carta: 'Te pienso en cada instante 🌹',
    musica: '/music/mireina.mp3'
  },
  {
    id: 8,
    src: '/images/foto8.jpg',
    carta: 'Eres mi sueño hecho realidad 💌',
    musica: '/music/misueno.mp3'
  },
  {
    id: 9,
    src: '/images/foto9.jpg',
    carta: 'Mi corazón late por ti ❤️',
    musica: '/music/miuniverso.mp3'
  },
  {
    id: 10,
    src: '/images/foto10.jpg',
    carta: 'Siempre juntos, siempre felices, siempre con amor 🌈',
    musica: '/music/mivida.mp3'
  },
  {
    id: 11,
    src: '/images/foto11.jpg',
    carta: 'Nuestro amor es infinito 🌌',
    musica: '/music/minina.mp3'
  }
];

function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="gallery">
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.src}
          alt="foto secreta"
          className="gallery-photo"
          onClick={() => setSelectedPhoto(photo)}
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