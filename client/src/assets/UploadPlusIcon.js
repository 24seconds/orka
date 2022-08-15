import React from "react";

function Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 22 22"
        >
            <path stroke="#101010" strokeWidth="3.5" d="M0 11h22M11 22V0"></path>
        </svg>
    );
}

export default React.memo(Icon);
