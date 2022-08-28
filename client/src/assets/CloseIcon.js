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
        stroke="#656C78"
        strokeWidth="3.5"
        d="M8.222 8.22L23.78 23.778M8.222 23.777L23.778 8.221"
      ></path>
    </svg>
  );
}

export default React.memo(Icon);
