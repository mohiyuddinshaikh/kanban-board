import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5a4ad1",
    },
    secondary: {
      main: green[500],
    },
  },

  typography: {
    fontSize: 12,
  },
});

export default theme;
