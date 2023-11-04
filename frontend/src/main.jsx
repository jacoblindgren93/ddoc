import Router from "./common/routes/router.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import ThemeContextProvider from "./providers/themeContextProvider.jsx";
import StyleProvider from "./providers/styleProvider.jsx";
import { CssBaseline } from "@mui/material";
import "./styles.css";
import AuthContextProvider from "./providers/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthChecker from "./common/authChecker/authChecker.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthContextProvider>
            <ThemeContextProvider>
                <StyleProvider>
                    <CssBaseline />

                    <BrowserRouter>
                        <AuthChecker />
                    </BrowserRouter>
                    <Router />
                </StyleProvider>
            </ThemeContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
