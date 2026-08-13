import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import ArtPlaceholder from "./decor/ArtPlaceholder";
import "./ProjectModal.css";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal__panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <FiX />
        </button>
        <ArtPlaceholder palette={project.palette} className="modal__art" />
        <div className="modal__info">
          <span className="chip">{project.collection}</span>
          <h3>
            {project.title} <span className="modal__year">| {project.year}</span>
          </h3>
          <p className="modal__label">
            Category: <span>{project.category}</span>
          </p>
          <p className="modal__blurb">{project.blurb}</p>
        </div>
      </div>
    </div>
  );
}
