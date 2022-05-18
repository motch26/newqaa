import React, { useContext } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";
import MyRoutes from "./MyRoutes";
import { Provider, Context } from "./Context";
import theme from "./Theme";
//TODO: Change backend for login in Login Component
//TODO: Add cookie expiry in Login Component
//TODO: Change backend for display of uploads in UploadedPDF Component
//TODO: Change backend for uploading in Dropbox COmponent
//TODO: Add uploads directory in main directory (cloud)
function App() {
  return (
    <Provider>
      <Router>
        <CookiesProvider>
          <CssBaseline />
          <MyRoutes />
        </CookiesProvider>
      </Router>
    </Provider>
  );
}

export default App;
