import { AccountCircle, CheckBox, SetMeal } from "@mui/icons-material";
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
    useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Alert from "src/common/components/alert/useAlert";
import PrimaryBtn from "src/common/components/button/primaryBtn";
import useFetch from "src/common/hooks/useFetch";
// @ts-ignore
import DavidBrent from "src/pages/public/signIn/DavidBrent.png";
import { AuthContext } from "src/providers/AuthContext";
import Cookies from "universal-cookie";
import ForgotPasswordDialog from "./forgotPasswordDialog";
import PrimaryBtnLoading from "src/common/components/button/primaryBtnLoading";

export default function SignIn() {
    const { setIsAuth } = useContext(AuthContext);
    const theme = useTheme();
    const cookie = new Cookies();
    const { post, loading, error, response } = useFetch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberAuth, setRememberAuth] = useState(false);
    const [showForgotPasswordDialog, setShowForgotPasswordDialog] =
        useState(false);
    const navigate = useNavigate();
    function onLogin(e) {
        e.preventDefault();
        post(`User/Login?email=${email}&password=${password}`);
    }

    useEffect(() => {
        if (response.length > 0) {
            console.log(response);
            if (rememberAuth) {
                var dt = new Date();
                const days = 1000;
                dt.setTime(dt.getTime() + days * 24 * 60 * 60 * 1000);
                cookie.set("token", response, {
                    path: "/",
                    expires: dt,
                });
            } else {
                cookie.set("token", response);
            }
            setIsAuth(true);
            navigate("/profile");
        }
    }, [response]);
    return (
        <Container sx={{ marginTop: 8 }}>
            {showForgotPasswordDialog && (
                <ForgotPasswordDialog
                    show={showForgotPasswordDialog}
                    setShow={setShowForgotPasswordDialog}
                />
            )}
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
                                boxShadow: "5px 5px 16px 2px rgb(0,0,0,0.3)",
                                maxWidth: "400px",
                            }}
                        />
                        <Box>
                            <Typography
                                marginTop={2}
                                color={"text.secondary"}
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
                        <form onSubmit={onLogin} className="flex-column">
                            <Box marginTop={4}>
                                <TextField
                                    label="Email"
                                    onChange={(e) => setEmail(e.target.value)}
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
                            {error && <Alert type="error">{error}</Alert>}
                            <FormControlLabel
                                sx={{ marginTop: "18px" }}
                                control={
                                    <Checkbox
                                        defaultChecked={rememberAuth}
                                        onChange={(e) =>
                                            setRememberAuth(e.target.checked)
                                        }
                                    />
                                }
                                label="Remember me"
                            />
                            <Typography
                                sx={{
                                    marginTop: "18px",
                                    textDecoration: "none",
                                    color: "text.secondary",
                                    cursor: "pointer",
                                }}
                                onClick={() =>
                                    setShowForgotPasswordDialog(true)
                                }
                            >
                                Forgot your password?
                            </Typography>

                            <NavLink
                                style={{
                                    marginTop: "18px",
                                    textDecoration: "none",
                                    color: theme.palette.text.secondary,
                                }}
                                to="/createAccount"
                            >
                                Dont have an account?
                            </NavLink>
                            <PrimaryBtnLoading
                                loading={loading}
                                onClick={onLogin}
                                type="submit"
                                sx={{ marginTop: 4 }}
                            >
                                Login
                            </PrimaryBtnLoading>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
