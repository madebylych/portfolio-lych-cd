import Star from "./decor/Star";
import "./Style.css";

const STATEMENTS = [
  "Bold color. Dramatic lighting. Tactile, hand-finished texture.",
  "I believe great character design starts with emotion, not anatomy.",
  "Every piece blends storytelling with craft — from first sketch to final render.",
];

export default function Style() {
  return (
    <section className="style-section">
      <div className="container style-section__inner">
        <div className="style-section__head">
          <h2 className="section-title">
            My Style <Star className="style-section__star" color="var(--lime)" />
          </h2>
          <p>
            And, above all, characters that feel like they could step off the
            page.
          </p>
        </div>

        <div className="style-section__list">
          {STATEMENTS.map((s, i) => (
            <p className={`style-card style-card--${i}`} key={s}>
              {s}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
