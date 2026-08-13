import { useMemo, useState } from "react";
import ArtPlaceholder from "./decor/ArtPlaceholder";
import { CATEGORIES, PROJECTS } from "../data/projects";
import ProjectModal from "./ProjectModal";
import "./Gallery.css";

export default function Gallery() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);

  const items = useMemo(
    () => (active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section className="gallery" id="work">
      <div className="container">
        <p className="eyebrow">Selected Work</p>
        <h2 className="section-title gallery__title">Portfolio</h2>

        <div className="gallery__filters">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`gallery__filter${active === c ? " gallery__filter--active" : ""}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="gallery__grid">
          {items.map((p) => (
            <button
              className="gallery__card"
              key={p.id}
              onClick={() => setSelected(p)}
              aria-label={`Open ${p.title}`}
            >
              <ArtPlaceholder palette={p.palette} className="gallery__art" />
              <div className="gallery__meta">
                <span className="gallery__meta-title">{p.title}</span>
                <span className="gallery__meta-tag">{p.category}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
