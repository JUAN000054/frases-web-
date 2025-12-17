export const album = [
  {
    id: "1",
    foto: { src: "/images/foto1.jpg", alt: "Recuerdo 1" },
    musica: { src: "/music/foto1_miamor.mp3", title: "miamor" }
  },
  {
    id: "2",
    foto: { src: "/images/foto2.jpg", alt: "Recuerdo 2" },
    musica: { src: "/music/foto2_micorazon.mp3", title: "micorazon" }
  },
  {
    id: "3",
    foto: { src: "/images/foto3.jpg", alt: "Recuerdo 3" },
    musica: { src: "/music/foto3_mifuturo.mp3", title: "mifuturo" }
  },
  {
    id: "4",
    foto: { src: "/images/foto4.jpg", alt: "Recuerdo 4" },
    musica: { src: "/music/foto4_miluz.mp3", title: "miluz" }
  },
  {
    id: "5",
    foto: { src: "/images/foto5.jpg", alt: "Recuerdo 5" },
    musica: { src: "/music/foto5_mimundo.mp3", title: "mimundo" }
  },
  {
    id: "6",
    foto: { src: "/images/foto6.jpg", alt: "Recuerdo 6" },
    musica: { src: "/music/foto6_minina.mp3", title: "minina" }
  },
  {
    id: "7",
    foto: { src: "/images/foto7.jpg", alt: "Recuerdo 7" },
    musica: { src: "/music/foto7_minovia.mp3", title: "minovia" }
  },
  {
    id: "8",
    foto: { src: "/images/foto8.jpg", alt: "Recuerdo 8" },
    musica: { src: "/music/foto8_mireina.mp3", title: "mireina" }
  },
  {
    id: "9",
    foto: { src: "/images/foto9.jpg", alt: "Recuerdo 9" },
    musica: { src: "/music/foto9_misueno.mp3", title: "misueno" }
  },
  {
    id: "10",
    foto: { src: "/images/foto10.jpg", alt: "Recuerdo 10" },
    musica: { src: "/music/foto10_miuniverso.mp3", title: "miuniverso" }
  },
  {
    id: "11",
    foto: { src: "/images/foto11.jpg", alt: "Recuerdo 11" },
    musica: { src: "/music/foto11_mivida.mp3", title: "mivida" }
  },
  {
    id: "12",
    foto: { src: "/images/foto12.jpg", alt: "Recuerdo 12" },
    musica: { src: "/music/foto12_pidemelaluna.mp3", title: "pidemelaluna" }
  },
  {
    id: "13",
    foto: { src: "/images/foto13.jpg", alt: "Recuerdo 13" },
    musica: { src: "/music/foto13_amorensilencio.mp3", title: "Amor en Silencio" }
  },
  {
    id: "14",
    foto: { src: "/images/foto14.jpg", alt: "Recuerdo 14" },
    musica: { src: "/music/foto14_eselocosoyyo.mp3", title: "eselocosoyyo" }
  },
  {
    id: "15",
    foto: { src: "/images/foto15.jpg", alt: "Recuerdo 15" },
    musica: { src: "/music/foto15_siempreatulado.mp3", title: "siempreatulado" }
  },
  {
    id: "16",
    foto: { src: "/images/foto16.jpg", alt: "Recuerdo 16" },
    musica: { src: "/music/foto16_amorsiempre.mp3", title: "amorsiempre" }
  },
  {
    id: "17",
    foto: { src: "/images/foto17.jpg", alt: "Recuerdo 17" },
    musica: { src: "/music/foto17_angel.mp3", title: "angel" }
  },
  {
    id: "18",
    foto: { src: "/images/foto18.jpg", alt: "Recuerdo 18" },
    musica: { src: "/music/foto18_aliadodeltiempo.mp3", title: "aliadodeltiempo" }
  },
  {
    id: "19",
    foto: { src: "/images/foto19.jpg", alt: "Recuerdo 19" },
    musica: { src: "/music/foto19_laslocurasmias.mp3", title: "laslocurasmias" }
  }
];

// ✅ Exportaciones derivadas
export const albumFotos = album.map(item => ({
  id: item.id,
  src: item.foto.src,
  alt: item.foto.alt
}));

export const albumMusicas = album.map(item => ({
  id: item.id,
  src: item.musica.src,
  title: item.musica.title
}));