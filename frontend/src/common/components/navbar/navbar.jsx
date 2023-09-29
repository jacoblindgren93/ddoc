import { Box, Stack, Typography, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import ThemeButton from "../button/themeButton";
import SecondaryButton from "../button/secondaryBtn";
import PrimaryBtn from "../button/primaryBtn";
import LoginIcon from "@mui/icons-material/Login";
import Logo from "../logo/logo";
export default function Navbar() {
    const theme = useTheme();

    const navItem = {
        color: theme.palette.text.secondary,
        textDecoration: "none",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        "&:hover": {
            color: "red",
        },
    };

    const navItemSelected = { ...navItem, color: theme.palette.text.primary };

    const hoverEffect = {
        padding: 1,
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        transition: "0.2s",
        "&:hover": {
            backgroundColor: theme.palette.background.light,
            color: theme.palette.text.primary,
        },
    };

    return (
        <Box display="flex" minHeight={60} alignItems={"center"}>
            <Typography
                fontWeight={"bold"}
                fontSize={20}
                sx={{
                    width: "33%",
                    justifyContent: "flex-start",
                }}
            >
                <Logo />
            </Typography>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                alignItems="center"
                sx={{
                    width: "33%",
                    justifyContent: "center",
                }}
            >
                <NavLink
                    style={({ isActive }) =>
                        isActive ? navItemSelected : navItem
                    }
                    to="/"
                >
                    <Box sx={hoverEffect}>Home</Box>
                </NavLink>
                <NavLink
                    to="/contact"
                    style={({ isActive }) =>
                        isActive ? navItemSelected : navItem
                    }
                >
                    <Box sx={hoverEffect}>Contact</Box>
                </NavLink>
                <ThemeButton />
            </Stack>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                alignItems="center"
                sx={{
                    width: "33%",
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <NavLink
                    to="/signin"
                    style={({ isActive }) =>
                        isActive ? navItemSelected : navItem
                    }
                >
                    <Box sx={hoverEffect}>
                        Sign in <LoginIcon sx={{ marginLeft: 1 }} />
                    </Box>
                </NavLink>
                <NavLink
                    to="/createAccount"
                    style={({ isActive }) =>
                        isActive ? navItemSelected : navItem
                    }
                >
                    <PrimaryBtn>Create account</PrimaryBtn>
                </NavLink>
            </Stack>
        </Box>
    );
}
