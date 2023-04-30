import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="31"
      fill="none"
      viewBox="0 0 33 31"
    >
      <path
        fill="#656C78"
        fillRule="evenodd"
        d="M6.4 27.3a2.9 2.9 0 100-5.8 2.9 2.9 0 000 5.8zm0 3.5a6.4 6.4 0 100-12.8 6.4 6.4 0 000 12.8zM26.4 27.3a2.9 2.9 0 100-5.8 2.9 2.9 0 000 5.8zm0 3.5a6.4 6.4 0 100-12.8 6.4 6.4 0 000 12.8z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#656C78"
        fillRule="evenodd"
        d="M12.75 3.75V24h-3.5V3A2.75 2.75 0 0112 .25h18A2.75 2.75 0 0132.75 3v22h-3.5V3.75h-16.5z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#656C78"
        fillRule="evenodd"
        d="M29.25 10.75h-16.5v-3.5h16.5v3.5z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default React.memo(Icon);
