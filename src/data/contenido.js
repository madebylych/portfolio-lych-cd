/* Contenido del portafolio, confirmado con Emily. */
const M = import.meta.env.BASE_URL + "media/";

/* Sobre mí. FOTO = null deja el marco vacío (solo visible mientras se desarrolla). */
export const SOBRE = {
  foto: M + "sobre/emily.webp", // retrato de estudio
  logo: M + "marca/lych-logo.webp?v=2", // ?v=2: versión recortada, evita la caché vieja
  texto: [
    "Soy Emily Vanesa Chisaba Rivera y estudio Creación Digital en la Universidad El Bosque, en Bogotá.",
    "Trabajo entre la ilustración, el 3D, la animación, el diseño y el desarrollo web. LYCH es mi nombre artístico y mi marca personal: aquí reúno lo que hago.",
  ],
  habilidades: [
    "Storytelling",
    "Game design",
    "Ilustración digital",
    "Ilustración vectorial",
    "Diseño de personajes",
    "Modelado 3D",
    "Retopología",
    "Animación",
    "Diseño web",
    "Desarrollo front-end",
    "Investigación UX",
    "Fotografía",
    "Producción de contenido",
    "Gestión de equipos creativos",
  ],
  herramientas: [
    "Photoshop",
    "Illustrator",
    "Affinity",
    "Clip Studio Paint",
    "Live2D",
    "Pixelorama",
    "Blender",
    "ZBrush",
    "Substance",
    "Unreal Engine",
    "Godot",
    "Figma",
    "Canva",
    "CapCut",
    "Webflow",
    "HTML",
    "CSS",
    "JavaScript",
    "Claude",
  ],
};

/* De dónde viene el nombre: hechos verificados y la razón de Emily, sin lore */
export const NOMBRE = {
  origen: "LYCH sale de emiLY CHisaba: el final de mi nombre y el comienzo de mi apellido.",
  curiosos: [
    "Se pronuncia igual que lich, el mago de los juegos de rol y la fantasía.",
    "Lich también es el nombre oficial de un púlsar real, PSR B1257+12, en la constelación de Virgo. La Unión Astronómica Internacional se lo puso en 2015.",
  ],
  porque: [
    "Me atrapó la expresión “estrella muerta que sigue latiendo”, que se usa para describir un púlsar, y la figura del lich: el mago de la fantasía que sigue existiendo después de la muerte y que se relaciona con el conocimiento, el poder, la obsesión y la inmortalidad.",
    "Para mí funcionan como una metáfora creativa y de resiliencia, no como una definición científica literal.",
  ],
};

export const CONTACTO = {
  correo: "contact.lych@gmail.com",
  // el mismo usuario en todas las redes
  usuario: "@madebylych",
  redes: [
    { nombre: "Instagram", url: "https://www.instagram.com/madebylych/" },
    { nombre: "TikTok", url: "https://www.tiktok.com/@madebylych" },
    { nombre: "ArtStation", url: "https://www.artstation.com/madebylych" },
    { nombre: "GitHub", url: "https://github.com/madebylych" },
  ],
};

export const MEDEA = {
  titulo: "Medea Kismet",
  bajada: "Personaje original. Del boceto a un modelo listo para animar.",
  pasos: [
    { nombre: "Concepto", texto: "Hoja de personaje en 2D: rostro, silueta, vestuario y su criatura búho." },
    {
      nombre: "Sculpt",
      texto: "Cuerpo de alta resolución, cerca de 488 mil polígonos, esculpido en Blender. El vestuario base se generó con Hunyuan3D de Tencent.",
    },
    { nombre: "Retopología", texto: "Cuerpo y vestuario rehechos a mano en unos 26 mil y 25 mil polígonos, con loops pensados para deformar." },
    { nombre: "Bakes", texto: "Normal maps 4K que pasan el detalle del sculpt a la malla ligera." },
    { nombre: "Rig", texto: "Esqueleto con controles y animaciones de prueba." },
  ],
  render: M + "medea/busto.webp",
  wire: M + "medea/wire_busto.webp",
  cuerpo: M + "medea/cuerpo.webp",
  wireCuerpo: M + "medea/wire_cuerpo.webp",
  concepto: M + "medea/concepto.webp",
  frames: 120,
  frame: (i) => `${M}medea/tt/${String(i).padStart(3, "0")}.webp`,
};

export const OBRAS = [
  {
    id: "medea",
    titulo: "Medea Kismet",
    tipo: "Personaje 3D original",
    rol: "Concepto, sculpt, retopología, bakes y render",
    año: 2026,
    texto: "Del boceto a un modelo listo para animar: hoja de concepto, sculpt, retopología pensada para deformar, normal maps 4K, rig y render final.",
    portada: M + "medea/busto.webp",
    imagenes: [M + "medea/cuerpo.webp", M + "medea/wire_busto.webp", M + "medea/concepto.webp"],
    tono: "#24103c",
    especial: "medea", // su página usa la sección con turntable y comparador
  },
  {
    id: "zenka",
    titulo: "Zenka",
    tipo: "Videojuego de plataformas y puzzles en pixel art, proyecto universitario en grupo",
    rol: "Sprites de Dilan, dibujados a mano",
    año: 2026,
    texto:
      "Zenka es un juego de plataformas y puzzles que estamos haciendo en grupo para la universidad, todavía en desarrollo. Aquí están los sprites de Dilan, uno de sus personajes: su animación de reposo de frente y en tres cuartos, a 128 píxeles. Cada frame está dibujado a mano, píxel por píxel, en Pixelorama.",
    portada: M + "zenka/portada.webp",
    imagenes: [],
    // hojas de sprites: se animan en la página con CSS (steps), a la velocidad de Pixelorama
    sprites: [
      { titulo: "Reposo de frente", src: M + "zenka/dilan_frente.png", frames: 5, lado: 128, fps: 5 },
      { titulo: "Reposo en tres cuartos", src: M + "zenka/dilan_34.png", frames: 9, lado: 128, fps: 5 },
    ],
    pixelArt: true,
    tono: "#1a1030",
  },
  {
    id: "sentir",
    titulo: "Proyecto Sentir",
    tipo: "Libro ilustrado de ciencia ficción, formato A6",
    rol: "Ilustración de portada y capítulos",
    año: 2025,
    texto:
      "Tres capítulos, tres personajes: Cami y el último día de ruido, Em y el error perfecto, y un renacimiento. Cada ilustración pasó de boceto a color final.",
    portada: M + "sentir/portada.webp",
    imagenes: [M + "sentir/portada_b.webp", M + "sentir/boceto_portada.webp", M + "sentir/proceso_portada.webp", { src: M + "sentir/rostros.webp", pie: "Primer intento de diseño de personajes" }],
    // cada capítulo: boceto y final del mismo tamaño, para compararlos con el deslizador
    pares: [
      { titulo: "Capítulo 1: Cami, el último día de ruido", boceto: M + "sentir/boceto_cap1.webp", final: M + "sentir/cap1.webp" },
      { titulo: "Capítulo 2: Em, el error perfecto", boceto: M + "sentir/boceto_cap2.webp", final: M + "sentir/cap2.webp" },
      { titulo: "Capítulo 3: Renacimiento", boceto: M + "sentir/boceto_cap3.webp", final: M + "sentir/cap3.webp" },
    ],
    tono: "#2a1350",
  },
  {
    id: "fantasma",
    titulo: "Fantasma",
    tipo: "Ilustración para Noxtober",
    rol: "Ilustración digital",
    año: 2025,
    texto:
      "Ilustración con la temática de fantasma. Muestra a un padre en duelo con su hijo recién fallecido: hay nombre para la viudez y la orfandad, pero no para cuando se pierde un hijo.",
    portada: M + "lab/fantasma.webp",
    imagenes: [],
    tono: "#1c1238",
  },
  {
    id: "cocacola",
    titulo: "Refresca tu mundo",
    tipo: "Ejercicio académico de ilustración vectorial: campaña para Coca-Cola",
    rol: "Concepto, ilustración vectorial y piezas",
    año: 2025,
    texto: "Del boceto en papel a la ilustración y su despliegue en piezas para redes y correo. No es un encargo de la marca.",
    portada: M + "cocacola/key.webp",
    imagenes: [M + "cocacola/boceto.webp", M + "cocacola/pieza1.webp", M + "cocacola/pieza3.webp"],
    tono: "#5a0f22",
  },
  {
    id: "lobbyboy",
    titulo: "Lobby Boy",
    tipo: "Ejercicio académico de ilustración vectorial sobre The Grand Budapest Hotel",
    rol: "Tres remakes en ilustración vectorial",
    año: 2025,
    texto:
      "Tres remakes de un póster existente de The Grand Budapest Hotel, hechos con fines académicos y de práctica. Cada versión cambia la paleta a partir de las escenas de la película y de su simbología: el mismo personaje y el mismo hotel cuentan algo distinto según el color.",
    portada: M + "lobbyboy/3.webp",
    imagenes: [M + "lobbyboy/1.webp", M + "lobbyboy/2.webp", M + "lobbyboy/3.webp"],
    // el póster rosado NO es de Emily: se muestra solo como referencia, con su enlace
    referencias: [
      {
        src: M + "lobbyboy/4.webp",
        texto: "Póster original de referencia. No es de mi autoría.",
        enlace: "https://co.pinterest.com/pin/212513676157558216/",
      },
    ],
    tono: "#3a1424",
  },
  {
    id: "mambo",
    titulo: "Carteles MAMBO",
    tipo: "Ejercicio académico de ilustración vectorial: carteles para tres exposiciones del MAMBO",
    rol: "Ilustración vectorial y diseño de cartel",
    año: 2025,
    texto:
      "Tres exposiciones, tres lenguajes: la secuencia cinematográfica, el retrato que se disuelve y la línea hipnótica. Cada cartel parte de la obra del artista expuesto.",
    portada: M + "mambo/oraculo.webp",
    imagenes: [M + "mambo/secuencias.webp", M + "mambo/infraleve.webp", M + "mambo/oraculo.webp"],
    // fotos de las obras de los artistas expuestos: referencia, no son de Emily
    referenciasTitulo: "Obras originales",
    referencias: [
      { src: M + "mambo/obra_garcia.webp", texto: "Obra de Saír García, base del cartel Secuencias." },
      { src: M + "mambo/obra_munoz.webp", texto: "Obra de Óscar Muñoz, base del cartel Infraleve." },
      { src: M + "mambo/obra_rueda.webp", texto: "Obra de María Isabel Rueda, base del cartel El oráculo de la noche." },
    ],
    tono: "#1c1c26",
  },
  {
    id: "global",
    titulo: "Global Seguros",
    tipo: "Hackathon Global Seguros 2026: personajes 3D y experiencia web con Three.js",
    rol: "Modelado 3D y desarrollo web",
    año: 2026, // faltan capturas del sitio web
    texto: "Una madre y su hijo como imagen de una aseguradora: protección que acompaña.",
    portada: M + "global/personajes.webp",
    imagenes: [M + "global/escena.webp", M + "global/personajes.webp"],
    tono: "#2b3550",
  },
  {
    id: "chrysos",
    titulo: "Chrysos Heirs",
    tipo: "Ejercicio académico personal: sitio web y gestor de datos sobre Honkai: Star Rail",
    rol: "Diseño y desarrollo front-end",
    año: 2026,
    texto:
      "Una colección de los herederos de Amphoreus con fichas, videos y modo oscuro, alimentada por un gestor propio para crear, editar y borrar personajes, más un juego de memoria con servidor en Node. El arte de los personajes pertenece a HoYoverse.",
    portada: M + "web/chrysos.webp",
    enlace: { texto: "Ver el sitio en vivo", url: "https://madebylych.github.io/Chrysos-Heirs/" },
    imagenes: [],
    tono: "#2b1a3d",
  },
];

/* Proyectos vivos: se muestran con su etapa real, sin adelantar resultados. */
export const EN_PROCESO = [
  {
    titulo: "NEXO",
    etapa: "En desarrollo",
    texto: "Una serie de personajes para animación y videojuegos, dentro del semillero Gráfica Dinámica.",
  },
  {
    titulo: "Cut!",
    etapa: "Preproducción",
    texto: "Corto donde una pelea en el set termina mal y la palabra corte significa dos cosas.",
  },
  {
    titulo: "Tour Distrito Creativo de Usaquén",
    etapa: "En desarrollo",
    texto: "App móvil para recorrer Usaquén con una ruta geolocalizada, sonora y sin conexión. Con Arquitectura y Música.",
  },
  {
    titulo: "Álgora",
    etapa: "En desarrollo",
    texto: "Un videojuego sobre la creación digital, dentro del semillero de investigación en IA de la Universidad El Bosque.",
  },
  {
    titulo: "Laika",
    etapa: "Investigación",
    texto: "Investigación UX alrededor de un ecosistema de servicios para mascotas.",
  },
];

export const LABORATORIO = [
  { src: M + "lab/patinadora.webp", titulo: "Mere", nota: "Personaje original" },
  { src: M + "lab/layne.webp", titulo: "Layne", nota: "Personaje original" },
  {
    src: M + "lab/fantasia.webp",
    titulo: "Fantasía y realidad",
    nota: "Ilustración vectorial",
    // boceto del mismo tamaño: la pieza se muestra con deslizador boceto / final
    boceto: M + "lab/fantasia_boceto.webp",
  },
  { src: M + "lab/wanderer.webp", titulo: "Wanderer", nota: "Fan art de Genshin Impact" },
  { src: M + "lab/gato_furina.webp", titulo: "Gato Furina", nota: "Fan art de Genshin Impact" },
  { src: M + "lab/hamster.webp", titulo: "Hámster", nota: "Fan art de Genshin Impact" },
  { src: M + "lab/rosa.webp", titulo: "Rosa de vidrio", nota: "Fotografía" },
  {
    src: M + "lab/brave.webp",
    titulo: "Estudio Brave",
    nota: "Composición en Photoshop",
    descripcion: "Uno de mis primeros ejercicios de composición y de Photoshop.",
  },
  { src: M + "lab/bauhaus.webp", titulo: "Guacamaya", nota: "Estudio Bauhaus" },
  { src: M + "lab/peluche.webp", titulo: "Perro con gafas", nota: "Estudio de iluminación a contraluz" },
  { src: M + "lab/gatos.webp", titulo: "Dos gatos", nota: "Estudio de iluminación a contraluz" },
];

