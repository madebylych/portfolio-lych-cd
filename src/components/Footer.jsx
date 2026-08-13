import { FiInstagram, FiTwitter } from "react-icons/fi";
import { SiArtstation, SiBehance } from "react-icons/si";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <a href="#top" className="footer__logo">
            Nova Reyes<span>.</span>
          </a>
          <p className="footer__tag">3D Artist &amp; Illustrator, based in Portland, OR.</p>
        </div>

        <nav className="footer__links">
          <a href="#work">Portfolio</a>
          <a href="#about">About</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="footer__socials">
          <a href="#" aria-label="Instagram"><FiInstagram /></a>
          <a href="#" aria-label="ArtStation"><SiArtstation /></a>
          <a href="#" aria-label="Behance"><SiBehance /></a>
          <a href="#" aria-label="Twitter"><FiTwitter /></a>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} Nova Reyes. All artwork rights reserved.</p>
      </div>
    </footer>
  );
}
