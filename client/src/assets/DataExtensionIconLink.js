import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        fill="#656C78"
        fillRule="evenodd"
        d="M16 29c7.18 0 13-5.82 13-13S23.18 3 16 3 3 8.82 3 16s5.82 13 13 13zm0 3c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#656C78"
        fillRule="evenodd"
        d="M30.5 17.5H2v-3h28.5v3z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#656C78"
        fillRule="evenodd"
        d="M14.276.66a1.5 1.5 0 01.663 2.016c-1.283 2.542-2.853 6.992-3.309 11.927-.456 4.936.213 10.197 3.206 14.547a1.5 1.5 0 01-2.472 1.7c-3.527-5.127-4.216-11.174-3.721-16.523.494-5.349 2.184-10.16 3.618-13.003a1.5 1.5 0 012.015-.663zM17.724.66a1.5 1.5 0 00-.663 2.016c1.283 2.542 2.853 6.992 3.309 11.927.456 4.936-.213 10.197-3.206 14.547a1.5 1.5 0 002.472 1.7c3.527-5.127 4.216-11.174 3.721-16.523-.494-5.349-2.184-10.16-3.618-13.003a1.5 1.5 0 00-2.015-.663z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default React.memo(Icon);
