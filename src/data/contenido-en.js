/*
 * Contenido en inglés. Toma las imágenes y la estructura de contenido.js y
 * solo reemplaza los textos. Los títulos propios de las obras (Medea Kismet,
 * Proyecto Sentir, Fantasma, Refresca tu mundo...) no se traducen.
 */
import * as ES from "./contenido";

export const CONTACTO = ES.CONTACTO;
export const GRUPOS_LAB = ES.GRUPOS_LAB; // claves de filtro; las etiquetas se traducen en textos.js

export const SOBRE = {
  ...ES.SOBRE,
  saludo: "Hi, I'm Emily",
  texto: [
    "I'm Emily Vanesa Chisaba Rivera, and I study Digital Creation at Universidad El Bosque in Bogotá.",
    "I work across illustration, 3D, animation, design and web development. LYCH is my artist name and personal brand: this is where I gather what I make.",
  ],
  habilidades: [
    "Storytelling",
    "Digital illustration",
    "Vector illustration",
    "Character design",
    "Animation",
    "Photography",
    "3D modeling",
    "Retopology",
    "Game design",
    "Web design",
    "Front-end development",
    "UX research",
    "Content production",
    "Creative team management",
  ],
  herramientas: ES.SOBRE.herramientas.map((h, i) => ({ ...h, grupo: ["2D", "3D and games", "Design and web", "Video and AI"][i] })),
};

export const NOMBRE = {
  origen: "LYCH comes from emiLY CHisaba: the end of my first name and the start of my last name.",
  curiosos: [
    "It's pronounced like lich, the sorcerer from role-playing games and fantasy.",
    "Lich is also the official name of a real pulsar, PSR B1257+12, in the constellation Virgo. The International Astronomical Union named it in 2015.",
  ],
  porque: [
    "I was hooked by the phrase “a dead star that keeps beating”, used to describe a pulsar, and by the figure of the lich: the fantasy sorcerer who keeps existing after death and is tied to knowledge, power, obsession and immortality.",
    "To me they work as a creative metaphor for resilience, not as a literal scientific definition.",
  ],
};

export const MEDEA = {
  ...ES.MEDEA,
  bajada: "Original character. From sketch to a model ready to animate.",
  pasos: [
    { nombre: "Concept", texto: "2D character sheet: face, silhouette, outfit and her owl creature." },
    { nombre: "Sculpt", texto: "High-resolution body, around 488 thousand polygons, sculpted in Blender. The base outfit was generated with Tencent's Hunyuan3D." },
    { nombre: "Retopology", texto: "Body and outfit rebuilt by hand at about 26 and 25 thousand polygons, with loops planned for deformation." },
    { nombre: "Bakes", texto: "4K normal maps that transfer the sculpt's detail to the light mesh." },
    { nombre: "Rig", texto: "Skeleton with controls and test animations." },
  ],
};

// textos de cada proyecto, por id
const OBRAS_EN = {
  medea: {
    tipo: "Original 3D character",
    corto: "Original 3D character",
    rol: "Concept, sculpt, retopology, bakes and render",
    texto: "Original character. From sketch to a model ready to animate: concept sheet, sculpt, retopology planned for deformation, 4K normal maps, rig and final render.",
  },
  zenka: {
    tipo: "Pixel art platformer and puzzle game, group university project",
    corto: "Pixel art video game",
    rol: "Dilan's sprites, drawn by hand",
    texto:
      "Zenka is a platformer and puzzle game we're making as a group for university, still in development. Here are the sprites for Dilan, one of its characters: his idle animation facing front and in three-quarter view, at 128 pixels. Every frame is drawn by hand, pixel by pixel, in Pixelorama.",
    sprites: ["Idle, front", "Idle, three-quarter"],
    secciones: [{ titulo: "Animations" }],
  },
  sentir: {
    tipo: "Illustrated science fiction book, A6 format",
    corto: "Illustrated sci-fi book",
    etiqueta: "Book",
    rol: "Cover and chapter illustration",
    texto: "Three chapters, three characters: Cami and the last day of noise, Em and the perfect error, and a rebirth. Each illustration went from sketch to final color.",
    secciones: [
      {
        titulo: "From sketch to color",
        ayuda: "Drag over each illustration to see the sketch underneath.",
        pares: ["Chapter 1: Cami, the last day of noise", "Chapter 2: Em, the perfect error", "Chapter 3: Rebirth"],
      },
      { titulo: "The cover", ayuda: "Drag to see the cover sketch.", pies: [null, "First attempt at character design"] },
    ],
  },
  fantasma: {
    tipo: "Illustration for Noxtober",
    corto: "Illustration for Noxtober",
    etiqueta: "Illustration",
    rol: "Digital illustration",
    texto:
      "An illustration on the theme of ghosts. It shows a father grieving his recently deceased son: there are words for widowhood and for being orphaned, but none for losing a child.",
    secciones: [{ titulo: "The illustration", ayuda: "Drag to see the sketch." }],
  },
  cocacola: {
    tipo: "Academic vector illustration exercise: a Coca-Cola campaign",
    corto: "Vector illustration",
    etiqueta: "Vector",
    rol: "Concept, vector illustration and pieces",
    texto: "From the paper sketch to the illustration and its rollout in pieces for social media and email. Not a commission from the brand.",
    secciones: [{ titulo: "From sketch to pieces", ayuda: "Drag to see the paper sketch." }],
  },
  lobbyboy: {
    tipo: "Academic vector illustration exercise on The Grand Budapest Hotel",
    corto: "Vector illustration",
    etiqueta: "Vector",
    rol: "Three remakes in vector illustration",
    texto:
      "Three remakes of an existing The Grand Budapest Hotel poster, made for academic and practice purposes. Each version changes the palette based on the film's scenes and symbolism: the same character and the same hotel tell something different depending on the color.",
    secciones: [{ titulo: "Three versions" }, { titulo: "Reference", referencias: ["Original reference poster. Not my work."] }],
  },
  mambo: {
    titulo: "MAMBO Posters",
    tipo: "Academic vector illustration exercise: posters for three exhibitions at MAMBO",
    corto: "Vector posters",
    etiqueta: "Poster",
    rol: "Vector illustration and poster design",
    texto:
      "Three exhibitions, three languages: the cinematic sequence, the dissolving portrait and the hypnotic line. Each poster starts from the work of the exhibiting artist.",
    secciones: [
      { titulo: "The posters" },
      {
        titulo: "Original works",
        referencias: [
          "Work by Saír García, basis for the Secuencias poster.",
          "Work by Óscar Muñoz, basis for the Infraleve poster.",
          "Work by María Isabel Rueda, basis for the El oráculo de la noche poster.",
        ],
      },
    ],
  },
  global: {
    tipo: "Global Seguros Hackathon 2026: 3D characters and a web experience with Three.js",
    corto: "3D and web, hackathon",
    rol: "3D modeling and web development",
    texto: "A mother and her son as the image of an insurer: protection that stays with you.",
    secciones: [{ titulo: "Gallery" }],
  },
  chrysos: {
    tipo: "Personal academic exercise: website and data manager about Honkai: Star Rail",
    corto: "Website and data manager",
    rol: "Front-end design and development",
    texto:
      "A collection of the heirs of Amphoreus with profiles, videos and dark mode, powered by my own manager to create, edit and delete characters, plus a memory game with a Node server. The character art belongs to HoYoverse.",
    enlace: "View the live site",
    secciones: [{ titulo: "The site" }],
  },
};

// mezcla los textos en inglés sobre la estructura en español (imágenes, orden, tipos de sección)
export const OBRAS = ES.OBRAS.map((o) => {
  const t = OBRAS_EN[o.id] ?? {};
  return {
    ...o,
    titulo: t.titulo ?? o.titulo,
    tipo: t.tipo ?? o.tipo,
    corto: t.corto ?? o.corto,
    etiqueta: t.etiqueta ?? o.etiqueta,
    rol: t.rol ?? o.rol,
    texto: t.texto ?? o.texto,
    enlace: o.enlace && { ...o.enlace, texto: t.enlace ?? o.enlace.texto },
    sprites: o.sprites?.map((sp, i) => ({ ...sp, titulo: t.sprites?.[i] ?? sp.titulo })),
    secciones: o.secciones.map((s, i) => {
      const ts = t.secciones?.[i] ?? {};
      return {
        ...s,
        titulo: ts.titulo ?? s.titulo,
        ayuda: ts.ayuda ?? s.ayuda,
        pares: s.pares?.map((p, k) => ({ ...p, titulo: ts.pares?.[k] ?? p.titulo })),
        luego: s.luego?.map((img, k) => (ts.pies?.[k] && typeof img === "object" ? { ...img, pie: ts.pies[k] } : img)),
        referencias: s.referencias?.map((r, k) => ({ ...r, texto: ts.referencias?.[k] ?? r.texto })),
      };
    }),
  };
});

export const EN_PROCESO = [
  { titulo: "NEXO", etapa: "In development", texto: "A series of characters for animation and video games, within the Gráfica Dinámica research group." },
  { titulo: "Cut!", etapa: "Pre-production", texto: "A short film where a fight on set goes wrong and the word cut means two things." },
  {
    titulo: "Usaquén Creative District Tour",
    etapa: "In development",
    texto: "A mobile app to explore Usaquén through a geolocated, audio-guided route that works offline. With Architecture and Music.",
  },
  { titulo: "Álgora", etapa: "In development", texto: "A video game about digital creation, within Universidad El Bosque's AI research group." },
  { titulo: "Laika", etapa: "Research", texto: "UX research around an ecosystem of pet services." },
];

const LAB_EN = {
  Mere: { nota: "Original character" },
  Layne: { nota: "Original character" },
  "Fantasía y realidad": { titulo: "Fantasy and reality", nota: "Vector illustration" },
  Wanderer: { nota: "Genshin Impact fan art" },
  "Gato Furina": { titulo: "Furina Cat", nota: "Genshin Impact fan art" },
  Hámster: { titulo: "Hamster", nota: "Genshin Impact fan art" },
  Guacamaya: { titulo: "Macaw", nota: "Bauhaus study" },
  "Rosa de vidrio": { titulo: "Glass Rose", nota: "Photography" },
  "Perro con gafas": { titulo: "Dog with glasses", nota: "Backlighting study" },
  "Dos gatos": { titulo: "Two cats", nota: "Backlighting study" },
};

export const LABORATORIO = ES.LABORATORIO.map((p) => ({ ...p, ...(LAB_EN[p.titulo] ?? {}) }));
