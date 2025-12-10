import Gallery from './components/Gallery';
import { useRef, useState } from "react";
import "./App.css";

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [indiceFrase, setIndiceFrase] = useState(null);
  const [showGallery, setShowGallery] = useState(false); // ✅ nuevo estado

  const frases = [
    "HAGAMOS QUE ESTO FUNCIONE Y NO POR QUE SEA FACIL EHH, SINO POR QUE VALE LA PENA 💘",
    "Tu sonrisa ilumina mis días ✨",
    "Eres mi razón de ser 💕",
    "Cada momento contigo es un regalo 🎁",
    "Te amo más de lo que las palabras puedan expresar 💖",
    "Eres mi sueño hecho realidad 🌙",
    "Contigo todo es magia ✨",
    "Eres mi refugio y mi alegría 🌹",
    "Cada latido me recuerda que te amo 💘"
  ];

  const mostrarFraseAleatoria = () => {
    const indice = Math.floor(Math.random() * frases.length);
    setIndiceFrase(indice);
  };

  const mostrarSiguienteFrase = () => {
    setIndiceFrase((prev) =>
      prev === null ? 0 : (prev + 1) % frases.length
    );
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="app"
      style={{ backgroundImage: "url('/fondo.jpg')" }} // ✅ fondo intacto
    >
      <h1>Para vos, mi amor 💕</h1>
      <div className="ultima-carta-fija">
  <h2>🌹 Mi Última Carta 🌹</h2>
  <p>
    Aunque nuestros caminos se separen, siempre te recordaré con amor y gratitud.  
    Que tus sueños se cumplan y tu luz nunca se apague.
  </p>
  <audio src="/music/paginasdeamigos.mp3" autoPlay loop />
</div>


      {/* Botones de frases */}
      <button className="btn" onClick={mostrarFraseAleatoria}>
        Frase aleatoria 🧞‍♂️
      </button>
      <button className="btn" onClick={mostrarSiguienteFrase}>
        Siguiente frase ⏭️
      </button>

      {/* Frase actual */}
      {indiceFrase !== null && (
        <div className="frase-actual">{frases[indiceFrase]}</div>
      )}

      {/* Botón de música */}
      <button className="btn" onClick={togglePlay}>
        {isPlaying ? "⏸️ Pausar música" : "🎵 Escuchar Tu Poeta"}
      </button>

      {/* Botón para mostrar/ocultar la carta */}
      <button className="btn" onClick={() => setShowLetter(!showLetter)}>
        {showLetter ? "Cerrar carta 💌" : "Ver carta 💌"}
      </button>

      {/* Carta romántica */}
      {showLetter && (
        <div className="carta-container">
          <div className="carta">
            <h2>Para vos, mi amor 💖</h2>
            <p>
              En cada palabra que escribo, hay un pedacito de mi alma que te busca.
              Sos mi inspiración, mi calma, mi alegría. Esta página es solo un reflejo
              de todo lo que siento por vos.
            </p>
            <p>
              Mi intencion es hacerte saber que no tengo ojos para otra persona, que eres unica,
              que me importas y no para un momento sino para una relacion sana y estable.
              Que eres la unica persona que me alegra con un bonito con un bonito mensaje, que admiro
              verte todo el tiempo , que me siento en otro mundo cuando me abrazas y para mi eres perfecta 
              en todos los sentidos y te quiero asi y no me importa los problemas por superar porque siempre ,
              siempre estare ahi apoyandote y ayudandote porque quiero , nunca lo olvides mi amor , quiero 
              verte triunfar en todo lo que te propongas mi vida, pero sobre todo mi amor, en verte feliz.
              TE AMO SEÑORITA 
            </p>
            <p className="firma">Con todo el amor del mundo , Juan ✨</p>
          </div>
        </div>
      )}

      {/* 📁 Botón para mostrar/ocultar la galería secreta */}
      <button className="btn" onClick={() => setShowGallery(!showGallery)}>
        {showGallery ? "Cerrar archivo secreto 📁" : "Abrir archivo secreto 📁"}
      </button>

      {/* Galería secreta */}
      {showGallery && <Gallery />}

      {/* Reproductor de audio oculto */}
      <audio ref={audioRef} src="/tu-poeta.mp3" loop />

      <footer>
        <p>HECHO CON TODO EL AMOR DEL UNIVERSO POR TU POETA✨</p>
      </footer>
    </div>
  );
}

export default App;