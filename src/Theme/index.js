import { createTheme } from "@mui/material";
import { blue, lightGreen, orange } from "@mui/material/colors";

const BSIT = createTheme({
  palette: {
    primary: {
      main: orange[600],
      light: orange[400],
    },
  },
});
const BSED = createTheme({
  palette: {
    primary: {
      main: blue[500],
      light: blue[200],
    },
  },
});

const BEED = createTheme({
  palette: {
    primary: {
      main: blue[500],
      light: blue[200],
    },
  },
});

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: orange[500],
      light: orange[100],
      dark: orange[800],
    },
  },
});
const theme = { BSIT, BSED, BEED, defaultTheme };
export default theme;
