import Character from "./decor/Character";
import Star from "./decor/Star";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="eyebrow">3D Artist &amp; Illustrator</p>
          <h1 className="hero__title">
            Hi, I&apos;m <span className="hero__title--lime">Nova Reyes.</span>
          </h1>
          <p className="hero__lead">
            I build characters and worlds that feel like they could breathe —
            somewhere between a painting and a sculpt. If you love art with
            emotion, color, and a little bit of texture, you&apos;re in the right
            place.
          </p>
          <div className="hero__actions">
            <a href="#work" className="btn btn--lime">
              View Portfolio
            </a>
            <a href="#contact" className="btn btn--outline">
              Get in Touch
            </a>
          </div>
        </div>

        <div className="hero__art">
          <Star className="hero__star hero__star--1" color="var(--lime)" />
          <Star className="hero__star hero__star--2" color="var(--white)" />
          <div className="hero__portrait">
            <Character
              hairStyle="long"
              hair="#8a1f3c"
              skin="#e8b48a"
              outfit="#14140f"
              className="hero__character"
            />
          </div>
          <span className="chip hero__chip hero__chip--1">Character Design</span>
          <span className="chip hero__chip hero__chip--2">3D Sculpting</span>
        </div>
      </div>
    </section>
  );
}
