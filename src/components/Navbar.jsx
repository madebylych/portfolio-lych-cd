import { useEffect, useState } from "react";
import { FiInstagram, FiTwitter } from "react-icons/fi";
import { SiArtstation, SiBehance } from "react-icons/si";
import "./Navbar.css";

const LINKS = [
  { href: "#work", label: "Portfolio" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__logo">
          Nova Reyes<span>.</span>
        </a>

        <nav className={`nav__links${open ? " nav__links--open" : ""}`}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className="nav__socials nav__socials--mobile">
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="ArtStation"><SiArtstation /></a>
            <a href="#" aria-label="Behance"><SiBehance /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
          </div>
        </nav>

        <div className="nav__right">
          <div className="nav__socials">
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="ArtStation"><SiArtstation /></a>
            <a href="#" aria-label="Behance"><SiBehance /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
          </div>
          <a href="#contact" className="btn btn--pill btn--lime nav__cta">
            Commission Me
          </a>
          <button
            className={`nav__burger${open ? " nav__burger--open" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
