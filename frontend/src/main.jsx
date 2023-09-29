import Router from "./common/router/router.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import ThemeContextProvider from "./providers/themeContextProvider.jsx";
import StyleProvider from "./providers/styleProvider.jsx";
import { CssBaseline } from "@mui/material";
import "./styles.css";
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeContextProvider>
            <StyleProvider>
                <CssBaseline />
                <Router />
            </StyleProvider>
        </ThemeContextProvider>
    </React.StrictMode>
);
