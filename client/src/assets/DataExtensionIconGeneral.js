import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="33"
      fill="none"
      viewBox="0 0 28 33"
    >
      <path
        fill="#656C78"
        fillRule="evenodd"
        d="M21 3.5H7A3.5 3.5 0 003.5 7v19A3.5 3.5 0 007 29.5h14a3.5 3.5 0 003.5-3.5V7A3.5 3.5 0 0021 3.5zM7 0a7 7 0 00-7 7v19a7 7 0 007 7h14a7 7 0 007-7V7a7 7 0 00-7-7H7z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#656C78"
        fillRule="evenodd"
        d="M7.19 7.5h13.62v3H7.19v-3zM7.19 14.5h13.62v3H7.19v-3zM7.19 21.5h8.793v3H7.19v-3z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default React.memo(Icon);
