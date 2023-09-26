import { ThemeProvider, createTheme } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "./themeContextProvider";

export default function StyleProvider({ children }) {
    const { theme } = useContext(ThemeContext);

    const lightTheme = createTheme({
        palette: {
            mode: "light",
            background: {
                default: "#F2F4FA",
                paper: "#ffffff",
                primaryButton: "#1D1D1B",
                primaryButtonHover: "#2D2D2C",
                light: "#E2E2E2",
            },
            text: {
                primary: "#1D1D1B",
                secondary: "#4D4C4C",
                contrast: "#F2F4FA",
            },
        },

        typography: {
            fontFamily: '"Inter", sans-serif', // Set Inter as the font family
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
        typography: {
            fontFamily: '"Inter", sans-serif', // Set Inter as the font family
        },
    });

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            {children}
        </ThemeProvider>
    );
}
