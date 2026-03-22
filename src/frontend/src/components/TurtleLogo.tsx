interface TurtleLogoProps {
  className?: string;
  size?: number;
}

export function TurtleLogo({ className = "", size = 28 }: TurtleLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Shell body */}
      <ellipse
        cx="16"
        cy="17"
        rx="9"
        ry="7"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Shell pattern lines */}
      <ellipse
        cx="16"
        cy="17"
        rx="5.5"
        ry="4.5"
        fill="none"
        stroke="oklch(95% 0.015 90)"
        strokeWidth="0.8"
        opacity="0.6"
      />
      <line
        x1="16"
        y1="10"
        x2="16"
        y2="24"
        stroke="oklch(95% 0.015 90)"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <line
        x1="7"
        y1="17"
        x2="25"
        y2="17"
        stroke="oklch(95% 0.015 90)"
        strokeWidth="0.8"
        opacity="0.5"
      />
      {/* Head */}
      <circle cx="16" cy="9.5" r="2.5" fill="currentColor" />
      {/* Tail */}
      <path
        d="M22 19 Q26 21 25 23"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Legs */}
      <path
        d="M9 13 Q6 11 7 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M9 21 Q6 23 7 25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M23 13 Q26 11 25 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M23 21 Q26 23 25 25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
