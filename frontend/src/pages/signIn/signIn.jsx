import { AccountCircle } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import {
    Box,
    CircularProgress,
    Container,
    Input,
    InputAdornment,
    InputLabel,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import PrimaryBtn from "src/components/button/primaryBtn";

export default function SignIn() {
    const [loading, setLoading] = useState(false);

    function onLogin() {
        setLoading(true);
        console.log("Hej");
    }

    return (
        <Container sx={{ marginTop: 4 }}>
            <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Paper
                    sx={{
                        width: "80%",
                        height: "500px",
                        padding: 4,
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        textAlign={"center"}
                        fontWeight={"bold"}
                        fontSize={"25px"}
                    >
                        Members login
                    </Typography>
                    <Box marginTop={4}>
                        <TextField
                            label="Username"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: "25ch" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box marginTop={4}>
                        <TextField
                            label="Password"
                            type="password"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: "25ch" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <NavLink style={{ marginTop: "18px" }} to="/">
                        Forgot your password?
                    </NavLink>
                    <NavLink style={{ marginTop: "18px" }} to="/">
                        Dont have an account?
                    </NavLink>
                    <PrimaryBtn onClick={onLogin} sx={{ marginTop: 4 }}>
                        Login
                        {loading && (
                            <CircularProgress
                                size={20}
                                sx={{ marginLeft: 2 }}
                                color={"secondary"}
                            />
                        )}
                    </PrimaryBtn>
                </Paper>
            </Box>
        </Container>
    );
}
