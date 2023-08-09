import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      fill="none"
      viewBox="0 0 36 36"
    >
      <circle cx="18" cy="18" r="10.5" fill="#31353B"></circle>
      <path
        fill="#656C78"
        fillRule="evenodd"
        d="M23.893 16.5c-.77 0-1.393.624-1.393 1.394V18a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-3.75a.75.75 0 01.75-.75.75.75 0 00.75-.75V11.74c0-.996.964-1.716 1.831-1.224 2.026 1.15 3.178 2.963 3.747 4.44.305.791-.337 1.546-1.185 1.546zM12 18a1.5 1.5 0 00-1.5 1.5V21a1.5 1.5 0 001.5 1.5h1.5v2.25c0 .415.336.75.75.75h1.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75H15v-1.5a1.5 1.5 0 00-1.5-1.5H12z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default React.memo(Icon);
