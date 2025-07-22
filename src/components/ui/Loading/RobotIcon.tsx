import React from "react";

export const RobotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="12"
        y="20"
        width="40"
        height="30"
        rx="4"
        ry="4"
        fill="#ccc"
        stroke="#333"
        strokeWidth="2"
      />
      <circle cx="22" cy="32" r="4" fill="#333" />
      <circle cx="42" cy="32" r="4" fill="#333" />
      <path
        d="M26,42 Q32,48 38,42"
        stroke="#333"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <line x1="32" y1="10" x2="32" y2="20" stroke="#333" strokeWidth="2" />
      <circle cx="32" cy="8" r="2" fill="#333" />
      <line x1="12" y1="35" x2="4" y2="35" stroke="#333" strokeWidth="2" />
      <line x1="52" y1="35" x2="60" y2="35" stroke="#333" strokeWidth="2" />
    </svg>
  );
};
