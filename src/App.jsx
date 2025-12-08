import { useRef, useState } from "react";
import "./App.css";

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [indiceFrase, setIndiceFrase] = useState(null);

  const frases = [
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
              Gracias por existir, por sonreír, por hacer que cada día valga la pena.
              Te amo con cada latido y cada sueño que tengo.
              TE AMO...Porque eres esa persona que siempre soñe tener a mi lado , 
              esa persona con la cual me veo toda la vida.
              Amo cada parte de ti, amo tu forma de ser, tu forma de pensar, amo la forma 
              en la que me miras, pero sobre todo amo la forma en la que encajamos tan bien.
              JAMAS ME CANSARE DE DECIRTE LO MUCHO QUE TE AMO Y LO ESPECIAL QUE ERES PARA MI...
            </p>
            <p className="firma">Con todo mi amor, Juan ✨</p>
          </div>
        </div>
      )}

      {/* Reproductor de audio oculto */}
      <audio ref={audioRef} src="/tu-poeta.mp3" loop />

      <footer>
        <p>Hecho con mucho amor por Juan ✨</p>
      </footer>
    </div>
  );
}

export default App;