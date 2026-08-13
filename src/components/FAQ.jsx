import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import "./FAQ.css";

const ITEMS = [
  {
    q: "Do you take commissions?",
    a: "Yes! I open commission slots throughout the year for both illustration and 3D character work. Use the contact form below to send details about your project.",
  },
  {
    q: "What's your typical turnaround time?",
    a: "Illustrations usually take 1–2 weeks and 3D pieces 2–4 weeks, depending on complexity and my current queue. I'll give you a specific estimate after reviewing your brief.",
  },
  {
    q: "What software do you work in?",
    a: "Mainly Blender and ZBrush for 3D, and Photoshop or Procreate for illustration, with Substance Painter for texturing.",
  },
  {
    q: "Can I use your art commercially?",
    a: "Personal and client pieces are not free to reuse without permission. For licensing or usage rights, reach out and we can work out terms.",
  },
  {
    q: "How do I request a quote?",
    a: "Send a message through the contact section with your project scope, references, and deadline, and I'll follow up with pricing and availability.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq" id="faq">
      <div className="container faq__inner">
        <div className="faq__head">
          <p className="eyebrow">Good to Know</p>
          <h2 className="section-title">Frequently Asked</h2>
        </div>

        <div className="faq__list">
          {ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div className={`faq__item${isOpen ? " faq__item--open" : ""}`} key={item.q}>
                <button
                  className="faq__question"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  {item.q}
                  <FiPlus className="faq__icon" />
                </button>
                {isOpen && <p className="faq__answer">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
