import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="30"
      fill="none"
      viewBox="0 0 26 30"
    >
      <path
        stroke="#656C78"
        strokeWidth="3"
        d="M7.085 10.226l2.361-4.09a7.084 7.084 0 019.678-2.594v0a7.084 7.084 0 012.593 9.678l-2.362 4.09M18.174 19.355l-2.361 4.09a7.084 7.084 0 01-9.678 2.593v0a7.084 7.084 0 01-2.593-9.678l2.362-4.09M15.188 10.36L10.07 19.22"
      ></path>
    </svg>
  );
}

export default React.memo(Icon);
