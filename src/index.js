import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import "../src/assets/styles/index.scss";
import theme from "./assets/theme";
import Layout from "./components/Layout";
import reportWebVitals from "./reportWebVitals";
import Routing from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* <Layout> */}
      <Routing />
      {/* </Layout> */}
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
