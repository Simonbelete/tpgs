import { createTheme } from "@mui/material/styles";
import { green, purple, common } from "@mui/material/colors";

declare module "@mui/material/styles" {
  // White
  interface Palette {
    link?: Palette["text"];
    sidebar?: Palette["background"];
    sidebarText?: Palette["text"];
  }

  interface PaletteOptions {
    link?: PaletteOptions["text"];
    sidebar?: PaletteOptions["background"];
    sidebarText?: PaletteOptions["text"];
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
      fontSize: 30,
      fontWeight: 700,
      color: "#495057",
      fontFamily: ["Inter", "sans-serif"].join(","),
    },
  },
  palette: {
    mode: "light",
    primary: {
      light: "#6cb640",
      main: "#008a3f",
      dark: "#1f4841",
    },
    secondary: {
      main: "#475A64",
      dark: "#1d262a",
    },
    text: {
      primary: "#495056",
      // secondary: "#63758D",
      secondary: "#98AAC4",
    },
    link: {
      primary: "#88AACF",
      secondary: "#0000EE",
    },
    background: {
      default: "#F6F9FC",
      paper: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: "#008a3f !important",
        },
      },
    },
  },
});

// lightTheme.typography.title = {
//   [lightTheme.breakpoints.down("md")]: {
//     fontSize: 30,
//     fontWeight: 700,
//     color: "#495057",
//     fontFamily: ["Inter", "sans-serif"].join(","),
//   },
// };

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default lightTheme;
export { lightTheme, darkTheme };
