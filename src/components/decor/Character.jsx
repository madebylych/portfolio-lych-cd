const HAIR_EXTRAS = {
  bob: () => null,
  long: (hair) => (
    <>
      <path
        d="M18 100C14 140 16 178 26 206H42C34 172 34 132 40 100Z"
        fill={hair}
      />
      <path
        d="M132 100C136 140 134 178 124 206H108C116 172 116 132 110 100Z"
        fill={hair}
      />
    </>
  ),
  bun: (hair) => <circle cx="75" cy="34" r="16" fill={hair} />,
  pony: (hair) => (
    <path
      d="M126 78C150 84 158 116 146 150C140 166 132 178 126 184L112 176C122 158 128 132 118 108C113 96 116 84 126 78Z"
      fill={hair}
    />
  ),
};

export default function Character({
  skin = "#f2c9a0",
  hair = "#2a2a2a",
  outfit = "#0e0e0e",
  hairStyle = "bob",
  glasses = false,
  flip = false,
  className,
}) {
  const extra = HAIR_EXTRAS[hairStyle];
  return (
    <svg
      className={className}
      viewBox="0 0 150 210"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      {extra && extra(hair)}
      <path
        d="M20 210C20 160 40 150 75 150C110 150 130 160 130 210Z"
        fill={outfit}
      />
      <circle cx="75" cy="92" r="54" fill={hair} />
      <ellipse cx="75" cy="100" rx="36" ry="40" fill={skin} />
      <path
        d="M32 88C30 60 48 40 75 40C102 40 120 60 118 88C112 72 96 62 75 62C54 62 38 72 32 88Z"
        fill={hair}
      />
      {glasses && (
        <g stroke="#151515" strokeWidth="3" fill="none">
          <rect x="50" y="96" width="24" height="18" rx="8" />
          <rect x="76" y="96" width="24" height="18" rx="8" />
          <path d="M74 103H76" />
        </g>
      )}
      <path
        d="M56 104C60 100 66 100 70 104"
        stroke="#1c1c1c"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M80 104C84 100 90 100 94 104"
        stroke="#1c1c1c"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="56" cy="122" r="7" fill="#e6432a" opacity="0.28" />
      <circle cx="94" cy="122" r="7" fill="#e6432a" opacity="0.28" />
      <path
        d="M68 128C71 131 79 131 82 128"
        stroke="#1c1c1c"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
