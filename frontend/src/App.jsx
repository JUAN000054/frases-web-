import { album } from "./data/album";
import { useRef, useState, useEffect } from "react";
import "./App.css";
import { API_BASE } from "./config";
import UploadImage from './components/UploadImage';

function ColorPicker() {
  const handleColorChange = (e) => {
    document.documentElement.style.setProperty("--accent-color", e.target.value);
  };

  return (
    <div className="color-picker">
      <label htmlFor="accentColor">Elegí un color 💖: </label>
      <input
        type="color"
        id="accentColor"
        name="accentColor"
        defaultValue="#f8c8dc"
        onChange={handleColorChange}
      />
    </div>
  );
}

function App() {
  const [extraFotos, setExtraFotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [indiceFrase, setIndiceFrase] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [currentSrc, setCurrentSrc] = useState("/foto17_angel.mp3");
  const [fullscreenImg, setFullscreenImg] = useState(null);

  // Ajustes
  const [showSettings, setShowSettings] = useState(false);
  const [showExtraGallery, setShowExtraGallery] = useState(false);

  const frases = [
    "HAGAMOS QUE ESTO FUNCIONE Y NO POR QUE SEA FACIL EHH, SINO POR QUE VALE LA PENA 💘",
    "Tu sonrisa es la calma para mis tormentas ✨",
    "la bendicion mas hermosa que dios me brindo fue la de haberte conocido 💕",
    "Cada momento contigo es algo unico e inolvidable 🎁",
    "Te amo más de lo que las palabras puedan expresar 💖",
    "Eres mi sueño hecho realidad 🌙",
    "Contigo todo es magia ✨",
    "Eres esa persona con la cual quiero sentarme un domingo a la mañana a tomar mate viendo la lluvia caer  🌹",
    "Cada latido me recuerda que te amo 💘"
  ];

  // Cargar fondo y galería desde backend
  useEffect(() => {
    async function loadData() {
      try {
        const [bgRes, galRes] = await Promise.all([
          fetch(`${API_BASE}/api/fondo`).then((r) => r.json()),
          fetch(`${API_BASE}/api/imagenes`).then((r) => r.json()),
        ]);

        // Fondo
        if (bgRes?.url) {
          document.querySelector(".app").style.backgroundImage = `url(${bgRes.url})`;
        }

        // Galería
        if (Array.isArray(galRes)) {
          setExtraFotos(galRes.map((img) => img.url));
        }

      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const mostrarFraseAleatoria = () => {
    const indice = Math.floor(Math.random() * frases.length);
    setIndiceFrase(indice);
  };

  const mostrarSiguienteFrase = () => {
    setIndiceFrase((prev) => (prev === null ? 0 : (prev + 1) % frases.length));
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="app">
      {/* Botón de ajustes */}
      <button
        className="btn-ajustes"
        onClick={() => setShowSettings(!showSettings)}
        aria-label="Abrir ajustes"
      >
        ⚙️
      </button>

      {/* Panel de ajustes */}
      {showSettings && (
        <div className="ajustes-panel">
          <button className="ajustes-close" onClick={() => setShowSettings(false)}>❌</button>
          <h3>⚙️ Ajustes</h3>

          <strong>🖼️ Fondo de pantalla:</strong>
          <UploadImage type="fondo" backendUrl={API_BASE} />

          <div style={{ marginTop: "15px" }}>
            <strong>📷 Agregar foto a galería:</strong>
            <UploadImage type="galeria" backendUrl={API_BASE} />
          </div>

          <div style={{ marginTop: "15px" }}>
            <button onClick={() => setShowExtraGallery(!showExtraGallery)}>
              <strong>{showExtraGallery ? "📷 Cerrar galería extra" : "📷 Abrir galería extra"}</strong>
            </button>
          </div>
        </div>
      )}

      {/* Galería extra */}
      {showExtraGallery && (
        <div className="extra-gallery">
          <h2>Galería de recuerdos 🌟</h2>
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <div className="gallery-grid">
              {extraFotos.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Recuerdo ${index + 1}`}
                  onClick={() => setFullscreenImg(src)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <h1>Para vos, mi amor 💕</h1>

      <button className="btn" onClick={mostrarFraseAleatoria}>
        Frase aleatoria 🧞‍♂️
      </button>
      <button className="btn" onClick={mostrarSiguienteFrase}>
        Siguiente frase ⏭️
      </button>

      {indiceFrase !== null && (
        <div className="frase-actual">{frases[indiceFrase]}</div>
      )}

      <button className="btn" onClick={togglePlay}>
        {isPlaying ? "⏸️ Pausar música" : "🎵 Escuchar Tu Poeta"}
      </button>

      <button className="btn" onClick={() => setShowLetter(!showLetter)}>
        {showLetter ? "Cerrar carta 💌" : "Ver carta 💌"}
      </button>

      {showLetter && (
  <div className="carta-container">
    <div className="carta">
      <h2>Para vos, mi amor 💖</h2>

      <p>Mi amor,</p>

      <p>
        No sé en qué lugar del mundo estás ahora ni qué estás sintiendo, pero aun así quiero dejarte estas palabras con la calma y el respeto que vos merecés.
      </p>

      <p>
        No escribo para presionarte, ni para pedirte nada, ni para que tomes una decisión. Escribo porque lo que siento por vos es real, y lo real no desaparece solo porque haya silencio.
      </p>

      <p>
        Quiero que sepas que te pienso con cariño, con admiración y con una gratitud enorme por todo lo que despertaste en mí. Vos fuiste luz en días donde yo ni sabía que necesitaba una. Y aunque hoy no estemos hablando, nada de lo que viví con vos pierde valor.
      </p>

      <p>
        No te escribo desde la necesidad, sino desde la verdad: te quiero de una manera tranquila, de una manera que no exige, de una manera que solo desea tu bienestar, incluso si ese bienestar no me incluye por ahora.
      </p>

      <p>
        Si algún día volvemos a encontrarnos, quiero que sea desde la libertad, desde la paz, desde la versión más linda de vos y de mí. Y si no, igual me quedo con lo hermoso que dejaste en mi vida.
      </p>

      <p>
        No sé qué va a pasar mañana, pero sí sé que lo que siento por vos es limpio, sincero y profundo. Y eso, pase lo que pase, siempre va a ser algo bueno.
      </p>

      <p>Con todo mi cariño,<br/>Juan</p>

      <p className="firma">Con todo el amor del mundo, Juan ✨</p>
    </div>
  </div>
)}

      <button className="btn" onClick={() => setShowGallery(!showGallery)}>
        {showGallery ? "Cerrar álbum secreto 📁" : "Abrir álbum secreto 📁"}
      </button>

      {showGallery && (
        <div className="album">
          <h2>La Reina y el Poeta</h2>
          <div className="album-grid">
            {album.map((item) => (
              <div key={item.id} className="album-item">
                <img
                  src={item.foto.src}
                  alt={item.foto.alt}
                  onClick={() => setFullscreenImg(item.foto.src)}
                />
                <button
                  className="btn-cora"
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.pause();
                      setCurrentSrc(item.musica.src);
                      audioRef.current.src = item.musica.src;
                      audioRef.current.load();
                      audioRef.current.oncanplaythrough = () => {
                        audioRef.current.play().catch(() => {});
                      };
                    }
                  }}
                >
                  MI CORA ❤️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reproductor oculto */}
      <audio
        ref={audioRef}
        src={currentSrc}
        preload="auto"
        style={{ display: "none" }}
      />

      {/* Selector de colores */}
      <ColorPicker />

      {/* Fullscreen de imágenes */}
      {fullscreenImg && (
        <div className="fullscreen" onClick={() => setFullscreenImg(null)}>
          <img src={fullscreenImg} alt="fullscreen" />
        </div>
      )}

      <footer>
        <p>HECHO CON TODO EL AMOR DEL UNIVERSO POR TU POETA✨</p>
      </footer>
    </div>
  );
}

export default App;