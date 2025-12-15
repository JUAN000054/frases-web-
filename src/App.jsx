import { album } from "./data/album";
import { useRef, useState } from "react";
import "./App.css";

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [indiceFrase, setIndiceFrase] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);

  const frases = [
    "HAGAMOS QUE ESTO FUNCIONE Y NO POR QUE SEA FACIL EHH, SINO POR QUE VALE LA PENA 💘",
    "Tu sonrisa es la calma para mis tormentas ✨",
    "Eres mi razón de ser 💕",
    "Cada momento contigo es algo unico e inolvidable 🎁",
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
    <div className="app" style={{ backgroundImage: "url('/fondo.jpg')" }}>
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
            <p>
              Hay momentos de la vida que llega como un rayo y lo cambia todo en un instante ,  
              la forma de pensar , de vivir la vida, la forma de ver las cosas, de un segundo a otro  
              le encuentras sentido a todos los sin sentido de la vida.
              Es como si depertaras de un sueño profundo y la realidad era distinta en el sueño.
              Algunas veces inventamos ese mundo de fantasias para escapar de la realidad ,
              pero muchas veces despertar de ese mundo irreal se vuelve una tarea imposible , la  
              mayoria de las veces construimos ese mundo para olvidarnos de la realidad para poderlo  
              moldear y cambiarlo todo a nuestro gusto, ilvidar problemas, sufrimientos , cosas del pasado  
              que nos afectan , en fin es un mundo para olvidar y protegernos de todas las cosas que mas tememos.
              No lo niego fue el mundo que siempre soñe vivir , sin temor a nada, pero no me daba cuenta que me estaba  
              olvidando de vivir la vida, estaba en una burbuja de sueños de la cual no queria despertar.
              PERO LLEGASTE TU A DESPERTARME: Me despertaste como si fuese que me hayan derramado un valdazo de agua  
              fria, me devolviste a la realidad, me despertaste para darme cuenta de que aun que este vivo  
              no estaba viviendo la vida, me di cuenta que nunca ame , nunca quise de verdad , que nunca estuve  
              enamorado realmente, que nunca me importo tanto nadie.
              Cuando te conoci me reproche todo lo que habia sentido antes, cuando empece a conocerte supe lo que  
              era querer a alguien de verdad, pase de todo en esta vida pero nunca habia amado de verdad hasta que te conoci.
              ME DI CUENTA QUE NUNCA ANTES PREFERIA IR A VER ZOOTOPIA2 CON LA PERSONA QUE QUIERO QUE IR A JUGAR FUTBOL  
              UN VUERNES POR LA TARDE , NUNCA SENTI LO HERMOSO QUE SE SIENTE VER MIS REFLEJOS EN LOS OJOS DE LA PERSONA QUE  
              QUIERO, QUE SE DISFRUTABA TANTO TOMAR UN MATE SENTADOS JUNTITOS Y QUE SE TOMEN FOTITOS.
              Contigo supe que nunca antes me importo nadie mas que yo y mi familia , contigo experimente por primera vez  
              lo que es el miedo a perder a una persona que se quiere, en pocas palabras;TU ME HICISTE SENTIR LO QUE  
              NUNCA ANTES SENTI Y A AMAR DE VERDAD, SIN MENTIRAS, SIN FILTROS, SIN FINGIR ABSOLUTAMENTE NADA.
              Despues de tanto tiempo encerrado en mi mundo ahora despertar y sentir todos estos sentimientos tan unicos y  
              hermosos, sentimientos maravillosos me que hizo despertar y volver a enfocarme, a no desperdiciar mas el tiempo  
              empezar a vivir de verdad no a sobrevivir nada mas, que puedo ser mejor , en enfocarme mas en mi vida , en ti ,
              en mi familia , en mis proyectos en la vida, en disfrutar mas , querer mas amar mas.
              GRACIAS AMOR POR TODO LO QUE HAZ HECHO POR MI Y HAZ CAMBIADO EN MI...  
              TE AMO... ATT: JUAN
            </p>
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
                <img src={item.foto.src} alt={item.foto.alt} />
                <button
                  className="btn-cora"
                  onClick={() => {
                    if (audioRef.current) {
                      setCurrentSrc(item.musica.src);
                      audioRef.current.src = item.musica.src;
                      audioRef.current.play().catch(() => {
                        alert("El navegador bloqueó la reproducción. Tocá el botón otra vez.");
                      });
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

      {/* Reproductor oculto para las canciones del álbum secreto */}
      <audio ref={audioRef} src={currentSrc} controls style={{ display: "none" }} />

      <footer>
        <p>HECHO CON TODO EL AMOR DEL UNIVERSO POR TU POETA✨</p>
      </footer>
    </div>
  );
}

export default App;