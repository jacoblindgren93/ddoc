// @ts-ignore
import { Container, Stack } from "@mui/material";
import { useEffect, useState, createContext } from "react";
import ProjectsDisplay from "./projectsdisplay.jsx";
import useFetch from "src/common/hooks/useFetch.jsx";
// @ts-ignore
import TopSection from "./sections/TopSection.jsx";
import MiddleSection from "./sections/middleSection.jsx";
import useHeader from "src/common/hooks/useHeader.jsx";

export const Projects = createContext(null);

export default function Profile() {
    const { loading, error, response, get } = useFetch();
    const [projects, setProjects] = useState([]);
    const [unfilteredProjects, setUnfilteredProjects] = useState({});
    useEffect(() => {
        const { header } = useHeader();
        get("Project", header);
    }, []);

    useEffect(() => {
        if (error) {
            console.log("Error");
        }
        if (response) {
            // @ts-ignore
            setUnfilteredProjects(response.allProjects);
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
                                // @ts-ignore
                                unfilteredProjects={unfilteredProjects}
                            />
                            {projects && <ProjectsDisplay />}
                        </Projects.Provider>
                    </Stack>
                </>
            )}
        </Container>
    );
}
