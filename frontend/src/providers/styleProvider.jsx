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
                secondaryButtonHover: "#e3e3e3",
                light: "#E2E2E2",
                errorBG: "#ffeded",
                tableOddRow: "#E5E4E4",
            },
            text: {
                primary: "#232323",
                secondary: "#444444",
                contrast: "#F2F4FA",
            },
        },

        components: {
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        "&.Mui-checked": {
                            color: "#1D1D1B",
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiInputBase-input:focus + fieldset": {
                            border: `2px solid #444444`,
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#232323",
                        },
                    },
                },
            },
        },

        typography: {
            fontFamily: '"Inter", sans-serif', // Set Inter as the font family
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            background: {
                primaryButton: "#b55a36",
                primaryButtonHover: "#964b2d",
            },
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
