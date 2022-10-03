export const IMAGE_URL = "asset";
export const FINGERPRINT_SIZE = 35;
export const HEADER_SIZE_IN_BYTES = FINGERPRINT_SIZE;
export const LOCALDROP_APP_VERSION =
    process.env.REACT_APP_VERSION_NUMBER || "v0.1.0";
// https://chromium.googlesource.com/external/webrtc/+/master/pc/data_channel.cc, half of kMaxQueuedSendDataBytes
export const DATACHANNEL_MAX_BUFFERED_AMOUNT = 8 * 1024 * 1024;
export const DATACHANNEL_BUFFER_THRESHOLD = 65535;

export const THEME_ORKA_DARK = "OrkaDark";

export const Tabs = Object.freeze({
    Home: "Home",
    Profile: "Profile",
    Notification: "Notification",
});

export const DATATYPE_FILE = "FILE";
export const DATATYPE_LINK = "LINK";
