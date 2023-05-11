import { createTheme } from "@mui/material/styles";
import { green, purple, common } from "@mui/material/colors";

declare module "@mui/material/styles" {
  // White
  interface Palette {
    white?: Palette["primary"];
  }

  interface PaletteOptions {
    white?: PaletteOptions["primary"];
  }

  // neutral
  interface Palette {
    neutral?: Palette["primary"];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

const lightTheme = createTheme({
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
  palette: {
    mode: "light",
    primary: {
      light: "#6cb640",
      main: "#008a3f",
      dark: "#1f4841",
    },
    secondary: {
      main: green[100],
    },
    white: {
      main: common.white,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default lightTheme;
export { lightTheme, darkTheme };
