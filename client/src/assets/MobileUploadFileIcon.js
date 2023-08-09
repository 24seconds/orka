import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      fill="none"
      viewBox="0 0 36 36"
    >
      <path
        fill="#31353B"
        d="M9 12a4.5 4.5 0 014.5-4.5H18l3.51 3.51L25.5 15v9a4.5 4.5 0 01-4.5 4.5h-7.5A4.5 4.5 0 019 24V12z"
      ></path>
      <path
        fill="#656C78"
        d="M18 13.5v-6l7.5 7.5h-6a1.5 1.5 0 01-1.5-1.5z"
      ></path>
    </svg>
  );
}

export default React.memo(Icon);
