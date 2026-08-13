export default function Star({ className, color = "var(--lime)" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M50 0C52 24 28 52 0 50C28 52 52 76 50 100C52 76 76 52 100 50C76 52 52 24 50 0Z"
        fill={color}
      />
    </svg>
  );
}
