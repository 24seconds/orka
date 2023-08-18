import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 40 40"
    >
      <path
        stroke="#656C78"
        strokeWidth="2.5"
        d="M22.94 26.667L16.666 20l6.274-6.666"
      ></path>
    </svg>
  );
}

export default React.memo(Icon);
