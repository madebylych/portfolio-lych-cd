import "./Stats.css";

const STATS = [
  { value: "150+", label: "Projects Completed" },
  { value: "40+", label: "Happy Clients" },
  { value: "8", label: "Years Experience" },
  { value: "5", label: "Industry Awards" },
];

export default function Stats() {
  return (
    <div className="stats">
      <div className="container stats__inner">
        {STATS.map((s) => (
          <div className="stats__item" key={s.label}>
            <span className="stats__value">{s.value}</span>
            <span className="stats__label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
