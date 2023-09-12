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
      <g>
        <g stroke="#656C78" strokeWidth="2.59" opacity="0.8">
          <path d="M12 13h16"></path>
          <path d="M12 20h16"></path>
          <path d="M12 27h16"></path>
        </g>
      </g>
    </svg>
  );
}

export default React.memo(Icon);
