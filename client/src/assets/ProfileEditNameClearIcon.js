import React from "react";

function Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="none"
            viewBox="0 0 25 25"
        >
            <path
                stroke="#656C78"
                strokeWidth="2.497"
                d="M6.242 18.725L18.724 6.242M18.724 18.725L6.241 6.242"
            ></path>
        </svg>
    );
}

export default React.memo(Icon);
