// @ts-ignore
import {
    Box,
    Container,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import SecondaryButton from "src/common/components/button/secondaryBtn";
import Logo from "src/common/logo/logo";
import Cookies from "universal-cookie";
import { AuthContext } from "src/providers/AuthContext";
import { useContext, useEffect, useState, createContext } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DataSaverOnRoundedIcon from "@mui/icons-material/DataSaverOnRounded";
import { tempData } from "./TempData.js";
import ThemeButton from "src/common/components/button/themeButton.jsx";
import SearchIcon from "@mui/icons-material/Search";
import useSearch from "src/common/hooks/useSearch.jsx";
import ProjectsDisplay from "./projectsdisplay.jsx";
// @ts-ignore

export const Projects = createContext(null);

export default function Profile() {
    const cookie = new Cookies();
    const [queryString, setQueryString] = useState("");
    const [projects, setProjects] = useState(tempData);
    const { setIsAuth } = useContext(AuthContext);
    function onSignOut() {
        if (cookie.get("token")) {
            cookie.remove("token");
        }
        setIsAuth(false);
    }

    const { filteredItems } = useSearch(tempData, queryString, "name");

    useEffect(() => {
        if (filteredItems.length > 0) {
            setProjects(filteredItems);
        } else {
            setProjects(tempData);
        }
    }, [filteredItems]);

    return (
        <Container sx={{ padding: 4 }} maxWidth="lg">
            <Box display={"flex"} justifyContent={"space-between"}>
                <Logo />
                <Box className="flex">
                    <ThemeButton />
                    <SecondaryButton onClick={onSignOut}>
                        <LogoutIcon sx={{ marginRight: 2 }} />
                        Sign out
                    </SecondaryButton>
                </Box>
            </Box>
            <Stack gap={4}>
                <Typography fontSize={30} marginTop={4} fontWeight={600}>
                    Welcome {"Jalle1337"}
                </Typography>
                <Stack direction="row" gap={3}>
                    <SecondaryButton onClick={() => console.log("Hej")}>
                        New Project
                        <DataSaverOnRoundedIcon sx={{ marginLeft: 2 }} />
                    </SecondaryButton>
                    <SecondaryButton onClick={() => console.log("Hej")}>
                        Edit profile
                        <EditRoundedIcon sx={{ marginLeft: 2 }} />
                    </SecondaryButton>
                    <TextField
                        onChange={(e) => setQueryString(e.target.value)}
                        variant="outlined"
                        placeholder="Search project"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
                <Projects.Provider value={{ projects, setProjects }}>
                    <ProjectsDisplay />
                </Projects.Provider>
            </Stack>
        </Container>
    );
}
