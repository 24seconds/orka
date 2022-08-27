import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="23"
      fill="none"
      viewBox="0 0 24 23"
    >
      <mask
        id="path-1-outside-1_215_1995"
        width="24"
        height="23"
        x="0"
        y="0"
        fill="#000"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#fff" d="M0 0H24V23H0z"></path>
        <path
          fillRule="evenodd"
          d="M18.107 14.53c1.321-1.223 2.122-2.822 2.122-4.572C20.229 6.115 16.372 3 11.614 3 6.857 3 3 6.115 3 9.958c0 3.842 3.857 6.957 8.614 6.957.826 0 1.625-.094 2.381-.269l4.112 1.594v-3.71z"
          clipRule="evenodd"
        ></path>
      </mask>
      <path
        fill="#656C78"
        d="M18.107 14.53l-2.038-2.201-.962.89v1.311h3zm-4.112 2.116l1.085-2.797-.862-.334-.9.209.677 2.922zm4.112 1.594l-1.084 2.797 4.084 1.583v-4.38h-3zm-.878-8.282c0 .787-.352 1.623-1.16 2.37l4.076 4.404c1.835-1.698 3.084-4.061 3.084-6.774h-6zM11.614 6c3.731 0 5.614 2.339 5.614 3.958h6C23.229 3.892 17.398 0 11.614 0v6zM6 9.958C6 8.338 7.883 6 11.614 6V0C5.83 0 0 3.892 0 9.958h6zm5.614 3.957C7.884 13.915 6 11.577 6 9.958H0c0 6.066 5.83 9.957 11.614 9.957v-6zm1.704-.191a7.548 7.548 0 01-1.704.191v6c1.053 0 2.08-.12 3.059-.346l-1.355-5.845zm5.873 1.719l-4.111-1.594-2.169 5.594 4.112 1.594 2.168-5.594zm-4.084-.913v3.71h6v-3.71h-6z"
        mask="url(#path-1-outside-1_215_1995)"
      ></path>
    </svg>
  );
}

export default React.memo(Icon);