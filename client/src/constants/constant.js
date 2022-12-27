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

export const NOTIFICATION_TYPE_STATUS = "STATUS";
export const NOTIFICATION_TYPE_COMMENT = "COMMENT";

// TODO(young): use later
export const STORAGE_MY_PROFILE_KEY = "STORAGE_MY_PROFILE_KEY";
export const STORAGE_MY_USERNAME_KEY = "STORAGE_MY_USERNAME_KEY";

/////////////////////////////////////
// user related constants
export const PROFILE_IMAGE_COUNT = 10;
export const RANDOM_ADJECTIVE = [
    "Artful",
    "Bionic",
    "Cosmic",
    "Disco",
    "Eoan",
    "Focal",
    "Groovy",
    "Hirsute",
    "Impish",
    "Jammy",
    "Kinetic",
    "Lunar",
];
export const RANDOM_NAMES = [
    "Seahorse",
    "Salmon",
    "Shark",
    "Shrimp",
    "Octopus",
    "Seal",
    "Cod",
    "Bream",
    "Tuna",
    "Skate",
];
