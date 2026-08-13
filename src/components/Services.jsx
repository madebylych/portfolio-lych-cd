import Character from "./decor/Character";
import "./Services.css";

const SERVICES = [
  {
    title: "Character Illustration",
    desc: "Expressive 2D character art with mood, color, and personality baked into every line.",
    tools: ["Procreate", "Ps"],
    char: { hair: "#1c1c1c", skin: "#f2c9a0", outfit: "#e6432a", hairStyle: "bun" },
  },
  {
    title: "3D Character & Prop Art",
    desc: "Stylized sculpts, models, and renders built for games, film, and collectibles.",
    tools: ["Blender", "ZBrush"],
    char: { hair: "#4a4a4a", skin: "#d9a577", outfit: "#14140f", hairStyle: "bob", glasses: true },
  },
  {
    title: "Concept Art & World-building",
    desc: "Visual development, moodboards, and environment studies for original stories.",
    tools: ["Ps", "Ai"],
    char: { hair: "#8a1f3c", skin: "#e8b48a", outfit: "#1c1c1c", hairStyle: "pony" },
  },
  {
    title: "Client & Brand Commissions",
    desc: "Custom illustrations and 3D assets tailored to your brand, game, or story.",
    tools: ["Ps", "Blender"],
    char: { hair: "#d9ff3d", skin: "#c98a5a", outfit: "#e6432a", hairStyle: "long" },
  },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services__head">
          <h2 className="section-title">
            What I Create <span className="services__spark">✦</span>
          </h2>
        </div>

        <div className="services__grid">
          {SERVICES.map((s) => (
            <article className="service-card" key={s.title}>
              <div className="service-card__art">
                <Character {...s.char} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="service-card__tools">
                {s.tools.map((t) => (
                  <span className="chip chip--dark" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
