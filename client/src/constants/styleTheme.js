import { THEME_ORKA_DARK } from "./constant";
import { FontFamily } from "./styleConstants";

const PaletteDark = {
    Primary: "#0066FF",
    Primary02: "#061728",

    Grayscale01: "#656C78",
    Grayscale02: "#31353B",
    Grayscale03: "#202326",
    Grayscale03p5: "#17191C",
    Grayscale04: "#131415",
    Grayscale05: "#101010",

    Gray: "#959CA8",
    White: "#FFFFFF",
    Whitescale01: "#FEFEFE",
    Black: "#000000",
};

const PaletteLight = {
    Primary: "#1B76FF",
    Primary02: "#489DF1",
    Primaryscale01: "#A3ADBE",

    PrimaryDark: "#0066FF",
    PrimaryDark02: "#061728",

    Grayscale01: "#6E7685",
    Grayscale02: "#929FB1",
    Grayscale03: "#E6ECF8",
    Grayscale03p5: "#CCD7EC",
    Grayscale04: "#F6F9FF",
    Grayscale05: "#FBFCFF",

    Gray: "#959CA8",
    White: "#FFFFFF",
    Whitescale01: "#FEFEFE",
    Black: "#000000",
    Blackscale01: "#2E3136",
    DarkGrayscale03: PaletteDark.Grayscale03,
};

export const ThemeOrkaDark = {
    name: THEME_ORKA_DARK,

    White: PaletteDark.White,
    Black: PaletteDark.Black,

    // think about replacement color
    PlaceholderBackgroundscale01: "#31353C",

    // check which component use this color
    PlaceholderTextscale01: PaletteDark.Whitescale01,

    ActivityRowButtonTextscale01: "#E0E3E8",
    ActivityRowButtonTextscale02: "#61656D",
    ActivityRowBackgroundscale02: PaletteDark.Primary,
    ActivityRowBackgroundscale03: "#FF5151",

    PrimaryColor: PaletteDark.Primary,
    PrimaryColor02: PaletteDark.Primary02,

    Grayscale01: PaletteDark.Grayscale01,
    Grayscale02: PaletteDark.Grayscale02,
    Grayscale03: PaletteDark.Grayscale03,
    Grayscale03p5: PaletteDark.Grayscale03p5,
    Grayscale04: PaletteDark.Grayscale04,
    Grayscale05: PaletteDark.Grayscale05,

    Button: PaletteDark.White,
    IconColor: PaletteDark.Grayscale02,

    OrkaTitle: PaletteDark.White,

    TabButtonActive: PaletteDark.White,
    TabButtonInActive: PaletteDark.Grayscale01,

    DataTypeHolderBackground: PaletteDark.Grayscale02,
    DataTypeHolderText: PaletteDark.Gray,

    FilterActive: PaletteDark.White,
    FilterTextActive: PaletteDark.Grayscale03,
    FilterTextInActive: PaletteDark.White,
    FilterBorder: PaletteDark.Grayscale01,
    FilterNewestText: PaletteDark.Grayscale01,

    ActiveRowDisplayText: PaletteDark.White,
    StatusActive: PaletteDark.Primary02,
    StatusActiveText: PaletteDark.Primary,

    CommentRowText: PaletteDark.Whitescale01,

    NotificationRowText: PaletteDark.Whitescale01,

    DeleteButtonHover: "#FF5151",

    UploadInputText: PaletteDark.White,
};

export const ThemeOrkaLight = {
    name: "OrkaLight",

    White: PaletteLight.White,
    Gray: PaletteLight.Gray,
    Black: PaletteLight.Black,

    // think about replacement color
    PlaceholderBackgroundscale01: "#31353C",
    PlaceholderTextscale01: PaletteLight.Blackscale01,
    ActivityRowButtonTextscale01: "#E0E3E8",
    ActivityRowButtonTextscale02: "#61656D",
    ActivityRowBackgroundscale02: "#0066FF",
    ActivityRowBackgroundscale03: "#FF5151",

    PrimaryColor: PaletteLight.Primary,
    PrimaryColor02: PaletteLight.Primary02,

    Grayscale01: PaletteLight.Grayscale01,
    Grayscale02: PaletteLight.Grayscale02,
    Grayscale03: PaletteLight.Grayscale03,
    Grayscale03p5: PaletteLight.Grayscale03p5,
    Grayscale04: PaletteLight.Grayscale04,
    Grayscale05: PaletteLight.Grayscale05,

    Button: PaletteLight.Blackscale01,
    IconColor: PaletteLight.Grayscale05,

    OrkaTitle: PaletteLight.Blackscale01,

    TabButtonActive: PaletteLight.Blackscale01,
    TabButtonInActive: "#ABB4C1",

    DataTypeHolderBackground: PaletteLight.White,
    DataTypeHolderText: PaletteLight.Grayscale03p5,

    FilterActive: PaletteLight.Blackscale01,
    FilterTextActive: "#ECF0F7",
    FilterTextInActive: PaletteLight.Blackscale01,
    FilterBorder: PaletteLight.Primaryscale01,
    FilterNewestText: PaletteLight.Primaryscale01,

    ActiveRowDisplayText: PaletteLight.Blackscale01,
    StatusActive: PaletteLight.Primary02,
    StatusActiveText: PaletteLight.Primary,

    CommentRowText: PaletteLight.Blackscale01,

    NotificationRowText: PaletteLight.Blackscale01,

    DeleteButtonHover: "#FF5151",

    UploadInputText: PaletteLight.Black,

    LightModeHover: PaletteLight.DarkGrayscale03,
};

export const ColorThemes = {
    ThemeOrkaDark,
    ThemeOrkaLight,
};
