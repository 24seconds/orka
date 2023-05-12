import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        fill="#656C78"
        fillRule="evenodd"
        d="M25 3.5H7A3.5 3.5 0 003.5 7v18A3.5 3.5 0 007 28.5h18a3.5 3.5 0 003.5-3.5V7A3.5 3.5 0 0025 3.5zM7 0a7 7 0 00-7 7v18a7 7 0 007 7h18a7 7 0 007-7V7a7 7 0 00-7-7H7z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#656C78"
        d="M21 13.768c1.333.77 1.333 2.694 0 3.464l-6.75 3.897c-1.333.77-3-.192-3-1.732v-7.794c0-1.54 1.667-2.502 3-1.732L21 13.768z"
      ></path>
    </svg>
  );
}

export default React.memo(Icon);
