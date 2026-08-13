import Character from "./decor/Character";
import Star from "./decor/Star";
import "./About.css";

const TOOLS = ["Blender", "ZBrush", "Photoshop", "Procreate", "Substance Painter", "Illustrator"];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container about__inner">
        <div className="about__art">
          <Star className="about__star" color="var(--lime)" />
          <div className="about__portrait">
            <Character hairStyle="bun" hair="#7a3b2e" skin="#d9a577" outfit="#d9ff3d" />
          </div>
        </div>

        <div className="about__content">
          <p className="eyebrow">About Me</p>
          <h2 className="section-title">A little about my journey</h2>

          <p>
            I&apos;m Nova, a 3D artist and illustrator who has been drawing for
            as long as I can remember. These days I split my time between
            character design work for clients and personal paintings and
            sculpts made purely for the love of it.
          </p>
          <p>
            I started out in traditional sketchbooks before discovering
            digital painting in art school, where a stray elective in 3D
            sculpting turned into a full-blown obsession. I ended up chasing
            both — spending my mornings blocking out forms in Blender and my
            evenings painting light and color in Photoshop. That mix is still
            the core of how I work today.
          </p>
          <p>
            After graduating, I freelanced across games, publishing, and
            animation, slowly narrowing my focus to character design and
            illustration. I&apos;ve since worked with indie studios and
            brands who wanted their characters to feel like <em>someone</em>,
            not just a design. Alongside client work, I keep a running list
            of personal series — Wildbloom, Nocturne, Aftertaste — where I
            get to experiment freely.
          </p>
          <p>
            When I&apos;m not at my desk, I&apos;m usually collecting
            reference photos of light through leaves, or re-watching the same
            three animated films for the hundredth time. Got questions about
            process or commissions? Check the FAQ below.
          </p>

          <div className="about__tools">
            {TOOLS.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
