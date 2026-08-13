const GRADIENTS = [
  "linear-gradient(135deg, #d9ff3d 0%, #14140f 100%)",
  "linear-gradient(135deg, #14140f 0%, #4a5210 100%)",
  "linear-gradient(135deg, #e6432a 0%, #14140f 100%)",
  "linear-gradient(135deg, #f7f5ef 0%, #b9c62b 100%)",
  "linear-gradient(135deg, #14140f 0%, #3a1512 100%)",
  "linear-gradient(135deg, #c7f01f 0%, #1c1c1c 100%)",
  "linear-gradient(135deg, #1c1c1c 0%, #f7f5ef 120%)",
  "linear-gradient(135deg, #b9c62b 0%, #0e0e0e 100%)",
];

const Shape = ({ index }) => {
  const stroke = index % 2 === 0 ? "rgba(14,14,14,0.35)" : "rgba(247,245,239,0.4)";
  switch (index % 4) {
    case 0:
      return <circle cx="70" cy="70" r="46" fill="none" stroke={stroke} strokeWidth="10" />;
    case 1:
      return (
        <path
          d="M20 100 Q45 20 70 60 T120 30"
          fill="none"
          stroke={stroke}
          strokeWidth="8"
          strokeLinecap="round"
        />
      );
    case 2:
      return <rect x="30" y="30" width="80" height="80" rx="20" fill="none" stroke={stroke} strokeWidth="8" />;
    default:
      return (
        <path d="M70 10 L120 70 L70 130 L20 70 Z" fill="none" stroke={stroke} strokeWidth="8" />
      );
  }
};

export default function ArtPlaceholder({ palette = 0, className }) {
  return (
    <div className={className} style={{ background: GRADIENTS[palette % GRADIENTS.length] }}>
      <svg viewBox="0 0 140 140" className="art-placeholder__shape">
        <Shape index={palette} />
      </svg>
    </div>
  );
}
