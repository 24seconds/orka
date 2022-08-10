const SOCKET_STATE = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3,
};

const SOCKET_STATE_CODE = {
    0: "CONNECTING",
    1: "OPEN",
    2: "CLOSING",
    3: "CLOSED",
};

// 2020-06-25 13:34:55: Copied from https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
const WEBSOCKET_CLOSE_EVENT_CODE = {
    1000: {
        name: "Normal Closure",
        description:
            "Normal closure; the connection successfully completed whatever purpose for which it was created.",
    },
    1001: {
        name: "Going Away",
        description:
            "The endpoint is going away, either because of a server failure or because the browser is navigating away from the page that opened the connection.",
    },
    1002: {
        name: "Protocol Error",
        description:
            "The endpoint is terminating the connection due to a protocol error.",
    },
    1003: {
        name: "Unsupported Data",
        description:
            "The connection is being terminated because the endpoint received data of a type it cannot accept (for example, a text-only endpoint received binary data).",
    },
    1004: {
        name: "Reserved",
        description: "Reserved. A meaning might be defined in the future.",
    },
    1005: {
        name: "No Status Received",
        description:
            "Reserved.  Indicates that no status code was provided even though one was expected.",
    },
    1006: {
        name: "Abnormal Closure",
        description:
            "Reserved. Used to indicate that a connection was closed abnormally (that is, with no close frame being sent) when a status code is expected.",
    },
    1007: {
        name: "Invalid frame payload data",
        description:
            "The endpoint is terminating the connection because a message was received that contained inconsistent data (e.g., non-UTF-8 data within a text message).",
    },
    1008: {
        name: "Policy Violation",
        description:
            "The endpoint is terminating the connection because it received a message that violates its policy. This is a generic status code, used when codes 1003 and 1009 are not suitable.",
    },
    1009: {
        name: "Message too big",
        description:
            "The endpoint is terminating the connection because a data frame was received that is too large.",
    },
    1010: {
        name: "Missing Extension",
        description:
            "The client is terminating the connection because it expected the server to negotiate one or more extension, but the server didn't.",
    },
    1011: {
        name: "Internal Error",
        description:
            "The server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.",
    },
    1012: {
        name: "Service Restart",
        description:
            "The server is terminating the connection because it is restarting.",
    },
    1013: {
        name: "Try Again Later",
        description:
            "The server is terminating the connection due to a temporary condition, e.g. it is overloaded and is casting off some of its clients.",
    },
    1014: {
        name: "Bad Gateway",
        description:
            "The server was acting as a gateway or proxy and received an invalid response from the upstream server. This is similar to 502 HTTP Status Code.",
    },
    1015: {
        name: "TLS Handshake",
        description:
            "Reserved. Indicates that the connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).",
    },
};

export { SOCKET_STATE, WEBSOCKET_CLOSE_EVENT_CODE, SOCKET_STATE_CODE };
