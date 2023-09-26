import { useContext } from "react";
import { ThemeContext } from "src/providers/themeContextProvider";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Box from "@mui/material/Box";
export default function ThemeButton() {
    const { theme, setTheme } = useContext(ThemeContext);

    function changeTheme() {
        theme === "light" ? setTheme("dark") : setTheme("light");
    }

    const styles = {
        marginTop: "5px",
        cursor: "pointer",
    };

    return (
        <Box onClick={changeTheme}>
            {theme === "light" ? (
                <LightModeIcon sx={styles} />
            ) : (
                <DarkModeIcon sx={styles} />
            )}
        </Box>
    );
}
