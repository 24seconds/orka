import React from "react";

function Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="34"
            fill="none"
            viewBox="0 0 30 34"
        >
            <path
                stroke="#fff"
                strokeWidth="3.5"
                d="M5.984 11.64a9.14 9.14 0 019.141-9.14v0a9.14 9.14 0 019.14 9.14v10.97H5.986V11.64zM.5 22.61h29.25M19.695 27.18a4.57 4.57 0 01-9.14 0"
            ></path>
        </svg>
    );
}

export default React.memo(Icon);
