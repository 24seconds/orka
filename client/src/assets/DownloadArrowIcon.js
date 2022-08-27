import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      fill="none"
      viewBox="0 0 20 21"
    >
      <path
        stroke="#fff"
        strokeWidth="3"
        d="M18 9.53L10 18 2 9.53M10 18V0"
      ></path>
    </svg>
  );
}

export default React.memo(Icon);
