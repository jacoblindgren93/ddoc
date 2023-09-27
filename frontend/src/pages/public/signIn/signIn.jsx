import { AccountCircle, CheckBox } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import {
    Box,
    Checkbox,
    CircularProgress,
    Container,
    FormControlLabel,
    Grid,
    InputAdornment,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Alert from "src/common/components/alert/alert";
import PrimaryBtn from "src/common/components/button/primaryBtn";
import useFetch from "src/common/hooks/useFetch";
// @ts-ignore
import DavidBrent from "src/pages/public/signIn/DavidBrent.png";

export default function SignIn() {
    const { post, loading, error, response } = useFetch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    function onLogin() {
        const data = {
            username: "test",
            password: "test",
        };
        post(`User/Login?username=${username}&password=${password}`, data);
    }
    console.log(`Response = ${response}`);
    console.log(`Error = ${error}`);
    return (
        <Container sx={{ marginTop: 8 }}>
            <Paper sx={{ padding: 4 }} elevation={4}>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            borderRight: "2px solid #DDDDDD",
                            padding: 2,
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={DavidBrent}
                            style={{
                                borderRadius: "8px",
                                boxShadow: "5px 5px 8px 2px rgb(0,0,0,0.1)",
                                maxWidth: "400px",
                            }}
                        />
                        <Box>
                            <Typography
                                marginTop={2}
                                color={"#6E6E6A"}
                                fontStyle={"italic"}
                                fontSize={15}
                            >
                                A sergeant major spends his time training his
                                men to be killers. He doesn’t polish his own
                                boots. He probably does polish his own boots,
                                but, you know, that doesn’t mean I have to do my
                                own filing.
                            </Typography>
                            <Typography fontWeight={"bold"} marginTop={2}>
                                – David Brent
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
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
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
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
                            {error && (
                                <Alert type="error">
                                    Login failed, double-check your information
                                    and try again.
                                </Alert>
                            )}
                            <FormControlLabel
                                control={
                                    <Checkbox defaultChecked color="primary" />
                                }
                                label="Remember me"
                            />
                            <NavLink style={{ marginTop: "18px" }} to="/">
                                Forgot your password?
                            </NavLink>
                            <NavLink
                                style={{ marginTop: "18px" }}
                                to="/createAccount"
                            >
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
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
