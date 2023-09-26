import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { Box, Container } from "@mui/material";

export default function NavbarLayout() {
    return (
        <>
            <Container>
                <Navbar />
            </Container>
            <Box margin={2}></Box>
            <Outlet />
        </>
    );
}
