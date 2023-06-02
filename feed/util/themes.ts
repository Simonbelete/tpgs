import { createTheme } from "@mui/material/styles";
import { green, purple, common } from "@mui/material/colors";

declare module "@mui/material/styles" {
  // White
  interface Palette {
    white?: Palette["primary"];
    neutral?: Palette["primary"];
  }

  interface PaletteOptions {
    white?: PaletteOptions["primary"];
    neutral?: PaletteOptions["primary"];
  }

  // Typo
  interface TypographyVariants {
    title: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title: true;
  }
}

const lightTheme = createTheme({
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    title: {
      fontSize: 40,
      fontWeight: 700,
      fontFamily: ["Inter", "sans-serif"].join(","),
    },
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
