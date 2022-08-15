import React from "react";

function Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="33"
            fill="none"
            viewBox="0 0 33 33"
        >
        <circle cx="16.5" cy="16.5" r="16.5" fill="#656C78"></circle>
        <path stroke="#000" strokeWidth="3" d="M9 17l8-8 8 8M17 9v17"></path>
    </svg>
    );
}

export default React.memo(Icon);
