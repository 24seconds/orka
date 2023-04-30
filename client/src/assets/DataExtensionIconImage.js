import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="32"
      fill="none"
      viewBox="0 0 34 32"
    >
      <path
        fill="#656C78"
        fillRule="evenodd"
        d="M27 3.5H7A2.5 2.5 0 004.5 6v20A2.5 2.5 0 007 28.5h20a2.5 2.5 0 002.5-2.5V6A2.5 2.5 0 0027 3.5zM7 0a6 6 0 00-6 6v20a6 6 0 006 6h20a6 6 0 006-6V6a6 6 0 00-6-6H7z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#656C78"
        fillRule="evenodd"
        d="M33.121 8.5l-15.06 15.06a1.5 1.5 0 01-2.122 0L11 18.622l-8 8L.879 24.5l9.06-9.06a1.5 1.5 0 012.122 0L17 20.378l14-14L33.121 8.5z"
        clipRule="evenodd"
      ></path>
      <path fill="#656C78" d="M22 10a4 4 0 11-8 0 4 4 0 018 0z"></path>
    </svg>
  );
}

export default React.memo(Icon);
