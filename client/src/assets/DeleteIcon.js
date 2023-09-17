import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      fill="none"
      viewBox="0 0 26 26"
    >
      <path
        stroke="#202326"
        strokeWidth="3"
        d="M6.83 6.828L19.17 19.17M6.829 19.172L19.17 6.83"
      ></path>
    </svg>
  );
}

export default React.memo(Icon);
