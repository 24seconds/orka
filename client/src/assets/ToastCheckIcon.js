import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="15"
      fill="none"
      viewBox="0 0 20 15"
    >
      <path stroke="#06F" strokeWidth="3" d="M18.439 2L8 12 2 6"></path>
    </svg>
  );
}

export default React.memo(Icon);
