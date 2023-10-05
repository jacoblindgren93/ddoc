import { Typography, Stack, TextField, InputAdornment } from "@mui/material";
import CreateProject from "../createProject";
import EditProfile from "../editProfile";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, useContext } from "react";
import useSearch from "src/common/hooks/useSearch";
import { Projects } from "../profile";

export default function MiddleSection(unfilteredProjects) {
    const [queryString, setQueryString] = useState("");
    const { setProjects } = useContext(Projects);
    const { filteredItems } = useSearch(
        unfilteredProjects.allProjects,
        queryString,
        "projectName"
    );
    useEffect(() => {
        if (filteredItems.length > 0) {
            setProjects(filteredItems);
        } else {
            // @ts-ignore
            setProjects(unfilteredProjects.allProjects);
        }
    }, [filteredItems]);
    return (
        <>
            <Typography fontSize={30} marginTop={4} fontWeight={600}>
                Welcome {"Jalle1337"}
            </Typography>
            <Stack direction="row" gap={3}>
                <CreateProject />
                <EditProfile />
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
        </>
    );
}
