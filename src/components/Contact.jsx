import Character from "./decor/Character";
import Star from "./decor/Star";
import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container contact__panel">
        <div className="contact__text">
          <h2 className="section-title">
            Let&apos;s Create Something <span className="contact__title-lime">Together</span>
          </h2>
          <p>
            Have a character, world, or brand that needs art? I&apos;d love to
            hear about it. Tell me a bit about your project and I&apos;ll get
            back to you within a couple of days.
          </p>

          <form
            className="contact__form"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const subject = encodeURIComponent(`Commission inquiry from ${form.name.value}`);
              const body = encodeURIComponent(
                `${form.message.value}\n\n— ${form.name.value} (${form.email.value})`
              );
              window.location.href = `mailto:hello@novareyes.art?subject=${subject}&body=${body}`;
            }}
          >
            <div className="contact__row">
              <input name="name" type="text" placeholder="Your name" required />
              <input name="email" type="email" placeholder="Your email" required />
            </div>
            <textarea
              name="message"
              rows="4"
              placeholder="Tell me about your project..."
              required
            />
            <button type="submit" className="btn btn--lime">
              Request a Commission
            </button>
          </form>

          <p className="contact__alt">
            or email me directly at{" "}
            <a href="mailto:hello@novareyes.art">hello@novareyes.art</a>
          </p>
        </div>

        <div className="contact__art">
          <Star className="contact__star" color="var(--lime)" />
          <Character hairStyle="pony" hair="#f2f2f2" skin="#c98a5a" outfit="#0e0e0e" />
        </div>
      </div>
    </section>
  );
}
