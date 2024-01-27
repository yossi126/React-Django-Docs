import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",

    background: {
      paper: "#f2f2f2",
    },
    text: {
      primary: "#11111",
    },
  },
  typography: {
    fontFamily: "Open Sans, sans-serif",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Open Sans, sans-serif",
  },
});
