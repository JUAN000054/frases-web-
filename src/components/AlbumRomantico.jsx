import React, { useRef } from "react";

export default function AlbumRomantico() {
  const audioRefs = useRef({});

  const reproducir = (id) => {
    // Pausa cualquier audio que esté sonando
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio && !audio.paused) audio.pause();
    });
    // Reproduce el nuevo
    audioRefs.current[id].play();
  };

  const album = [
    { id: "1", titulo: "miamor", src: "/music/foto1_miamor.mp3" },
    { id: "2", titulo: "micorazon", src: "/music/foto2_micorazon.mp3" },
    { id: "3", titulo: "mifuturo", src: "/music/foto3_mifuturo.mp3" },
    { id: "4", titulo: "miluz", src: "/music/foto4_miluz.mp3" },
    { id: "5", titulo: "mimundo", src: "/music/foto5_mimundo.mp3" },
    { id: "6", titulo: "minina", src: "/music/foto6_minina.mp3" },
    { id: "7", titulo: "minovia", src: "/music/foto7_minovia.mp3" },
    { id: "8", titulo: "mireina", src: "/music/foto8_mireina.mp3" },
    { id: "9", titulo: "misueno", src: "/music/foto9_misueno.mp3" },
    { id: "10", titulo: "miuniverso", src: "/music/foto10_miuniverso.mp3" },
    { id: "11", titulo: "mivida", src: "/music/foto11_mivida.mp3" },
    { id: "12", titulo: "pidemelaluna", src: "/music/foto12_pidemelaluna.mp3" },
    { id: "13", titulo: "Amor en Silencio", src: "/music/foto13_amorensilencio.mp3" },
    { id: "14", titulo: "eselocosoyyo", src: "/music/foto14_eselocosoyyo.mp3" },
    { id: "15", titulo: "Cristina", src: "/music/foto15_Cristina.mp3" },
    { id: "16", titulo: "amorsiempre", src: "/music/foto16_amorsiempre.mp3" },
    { id: "17", titulo: "angel", src: "/music/foto17_angel.mp3" },
    { id: "18", titulo: "aliadodeltiempo", src: "/music/foto18_aliadodeltiempo.mp3" },
    { id: "19", titulo: "Amor sincero", src: "/music/foto19_Amorsincero.mp3" }
  ];

  return (
    <div className="album-romantico">
      <h2>🎶 Álbum Romántico</h2>
      <div className="album-grid">
        {album.map((item) => (
          <div key={item.id} className="album-item">
            <button
              className="boton-mi-cora"
              onClick={() => reproducir(item.id)}
            >
              MI CORA ❤️ {item.titulo}
            </button>
            <audio
              ref={(el) => (audioRefs.current[item.id] = el)}
              src={item.src}
            />
          </div>
        ))}
      </div>
    </div>
  );
}