import React from "react";

function Icon(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="22"
            fill="none"
            viewBox="0 0 18 22"
        >
            <path
                fill="#656C78"
                fillRule="evenodd"
                d="M17.51 2.133a8.906 8.906 0 000 17.734A10.95 10.95 0 0111 22C4.925 22 0 17.075 0 11S4.925 0 11 0c2.436 0 4.688.792 6.51 2.133z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
}

export default React.memo(Icon);
