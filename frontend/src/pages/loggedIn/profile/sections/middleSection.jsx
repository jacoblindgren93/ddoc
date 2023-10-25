import { Typography, Stack, TextField, InputAdornment } from "@mui/material";
import CreateProject from "../createProject";
import EditProfile from "../editProfile";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, useContext, useRef } from "react";
import useSearch from "src/common/hooks/useSearch";
import { Projects } from "../profile";

export default function MiddleSection() {
    return (
        <>
            <Typography fontSize={30} marginTop={4} fontWeight={600}>
                Welcome {"Jalle1337"}
            </Typography>
            <Stack direction="row" gap={3}>
                <CreateProject />
                <EditProfile />
            </Stack>
        </>
    );
}
