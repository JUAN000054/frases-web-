import './Gallery.css';
import React, { useState } from 'react';
import PhotoModal from './PhotoModal';

function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Última carta destacada
  const ultimaCarta = {
    id: 12,
    src: '/images/foto12.jpg',
    carta: 'Mi última carta: ME QUEDE SIN PALABRAS. LO ÚNICO QUE SÉ EN ESTE MOMENTO ES QUE TE AMO, QUE NO QUIERO PERDERTE, QUE SIN TI NADA TIENE SENTIDO. TAL VEZ TUS RAZONES PARA DEJARLO TODO ASÍ EN UN INSTANTE SEAN MAYORES A LO QUE EMPEZAMOS A SENTIR Y LO ENTIENDO. LO QUE SÉ CON CERTEZA ES QUE SIN ESA MIRADA, ESA SONRISA, EN FIN, SIN TI SIENTO COMO EL MUNDO SE DERRUMBA ENCIMA DE MÍ Y ESO ME ASUSTA. POR MÁS FUERTE QUE HAYA SIDO, CONTIGO ME PERDÍ COMPLETAMENTE Y ES COMO TENER UN PUÑAL INCRUSTADO EN EL PECHO Y SEGUIR QUERIENDO VIVIR. ASÍ ME SIENTO AHORA: NO ESTOY SANGRANDO, PERO ME ESTOY AHOGANDO POR DENTRO EN MIS PROPIOS SENTIMIENTOS POR TI.',
    musica: '/music/paginasdeamigos.mp3'
  };

  // Tus fotos normales
  const photos = [
    { id: 1, src: '/images/foto1.jpg', carta: 'Descubrí un amor que no supe que tenía dentro hasta que te conocí 💖', musica: '/music/miamor.mp3' },
    { id: 2, src: '/images/foto2.jpg', carta: 'Cada día te amo más 🌹', musica: '/music/micorazon.mp3' },
    { id: 3, src: '/images/foto3.jpg', carta: 'Siempre serás mi inspiración ✨', musica: '/music/mifuturo.mp3' },
    { id: 4, src: '/images/foto4.jpg', carta: 'Tu sonrisa ilumina mi mundo 🌞', musica: '/music/miluz.mp3' },
    { id: 5, src: '/images/foto5.jpg', carta: 'Eres lo que nunca busqué, tampoco esperé, pero lo que siempre soñé tener 💕', musica: '/music/mimundo.mp3' },
    { id: 6, src: '/images/foto6.jpg', carta: 'Cada momento contigo es una bendición de Dios ✨', musica: '/music/minovia.mp3' },
    { id: 7, src: '/images/foto7.jpg', carta: 'Te pienso en cada instante 🌹', musica: '/music/mireina.mp3' },
    { id: 8, src: '/images/foto8.jpg', carta: 'Eres mi sueño hecho realidad 💌', musica: '/music/misueno.mp3' },
    { id: 9, src: '/images/foto9.jpg', carta: 'Mi corazón late por ti ❤️', musica: '/music/miuniverso.mp3' },
    { id: 10, src: '/images/foto10.jpg', carta: 'Siempre juntos, siempre felices, siempre con amor 🌈', musica: '/music/mivida.mp3' },
    { id: 11, src: '/images/foto11.jpg', carta: 'Nuestro amor es infinito 🌌', musica: '/music/minina.mp3' }
  ];

  return (
    <div>
      {/* Bloque especial arriba a la izquierda */}
      <div 
        className="ultima-carta-destacada" 
        onClick={() => setSelectedPhoto(ultimaCarta)}
      >
        <h2>🌹 Mi Última Carta 🌹</h2>
        <p>Haz clic aquí para leerla</p>
      </div>

      {/* Galería normal */}
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
      </div>

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