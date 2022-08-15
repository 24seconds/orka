import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="11"
      fill="none"
      viewBox="0 0 16 11"
    >
      <path
        stroke="#5B5D61"
        strokeWidth="2.476"
        d="M15 1L6.88 8.82 1 3.25"
      ></path>
    </svg>
  );
}

export default React.memo(Icon);
