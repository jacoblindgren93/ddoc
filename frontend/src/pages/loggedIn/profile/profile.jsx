// @ts-ignore
import {
    Container,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState, createContext } from "react";
import useSearch from "src/common/hooks/useSearch.jsx";
import ProjectsDisplay from "./projectsdisplay.jsx";
import CreateProject from "./createProject.jsx";
import EditProfile from "./editProfile.jsx";
import useFetch from "src/common/hooks/useFetch.jsx";
import Cookies from "universal-cookie";
import TopSection from "./sections/TopSection.jsx";
import MiddleSection from "./sections/middleSection.jsx";

export const Projects = createContext(null);

export default function Profile() {
    const { loading, error, response, get } = useFetch();
    const cookie = new Cookies();

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const header = {
            Authorization: `Bearer ${cookie.get("token")}`,
        };
        get("Project", header);
    }, []);

    useEffect(() => {
        if (error) {
            console.log("Error");
        }
        if (response) {
            // @ts-ignore
            setProjects(response.allProjects);
        }
    }, [response, error]);
    return (
        <Container sx={{ padding: 4 }} maxWidth="lg">
            {loading ? (
                <h1>Loading</h1>
            ) : (
                <>
                    <TopSection />
                    <Stack gap={4}>
                        <Projects.Provider value={{ projects, setProjects }}>
                            <MiddleSection
                                unfilteredProjects={response.allProjects}
                            />
                            {projects && projects.length > 0 && (
                                <ProjectsDisplay />
                            )}
                        </Projects.Provider>
                    </Stack>
                </>
            )}
        </Container>
    );
}
