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
      light: "#DCB211",
      main: "#BC9810",
      dark: "#9B6E25",
    },
    secondary: {
      main: green[100],
    },
    white: {
      main: common.white,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: "#BC9810 !important",
          color: "#fff",
        },
      },
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
