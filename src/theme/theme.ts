import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0f172a",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    fontSize: 15,
    h3: {
      fontSize: "3.2rem",
      fontWeight: 800,
    },
    h4: {
      fontSize: "2.5rem",
      fontWeight: 800,
    },
    h6: {
      fontSize: "1.35rem",
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: "0.95rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1.1rem",
    },
    body2: {
      fontSize: "1.0rem",
    },
    caption: {
      fontSize: "0.85rem",
      fontWeight: 500,
    },
    button: {
      fontSize: "1.05rem",
      fontWeight: 600,
    },
  },
});

export default theme;
