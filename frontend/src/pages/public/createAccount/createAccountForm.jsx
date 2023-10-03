import { useEffect, useState } from "react";
import { Alert, Box, Paper, Stack, TextField, useTheme } from "@mui/material";
import PrimaryBtn from "src/common/components/button/primaryBtn";
import UseAlert from "src/common/components/alert/useAlert";
import useFetch from "src/common/hooks/useFetch";
import PopUp from "src/common/components/popUp/infoDialog";
import PrimaryBtnLoading from "src/common/components/button/primaryBtnLoading";

export default function CreateAccountForm() {
    const [formError, setFormError] = useState({ type: "", message: "" });
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        passwordRepeat: "",
    });
    const { loading, error, response, post } = useFetch();
    const theme = useTheme();

    function onCreateAccount(e) {
        if (e) e.preventDefault();
        setFormError({ type: "", message: "" });
        if (formData.username === "") {
            const error = { type: "username", message: "Username missing!" };
            setFormError(error);
            return;
        }
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(formData.email)) {
            const error = {
                type: "email",
                message:
                    "Hmm doesnt seem like you entered a valid email there buddy!",
            };
            setFormError(error);
            return;
        }

        if (formData.password === "" || formData.passwordRepeat === "") {
            const error = {
                type: "password",
                message: "Please enter the password fields",
            };
            setFormError(error);
            return;
        }

        if (formData.password !== formData.passwordRepeat) {
            const error = {
                type: "password",
                message: "The passwords does not match",
            };
            setFormError(error);
            return;
        }

        if (formData.password.length < 8) {
            const error = {
                type: "password",
                message: "Password has to be atleast 8 characters long",
            };
            setFormError(error);
            return;
        }

        let body = {
            userName: formData.username,
            email: formData.email,
            password: formData.password,
        };
        post("User", body);
    }
    useEffect(() => {
        if (response == 200) {
            setFormData({
                username: "",
                email: "",
                password: "",
                passwordRepeat: "",
            });
        }
    }, [response]);

    function onUpdateFormdata(field, value) {
        const updatedData = { ...formData, [field]: value };
        setFormData(updatedData);
    }

    return (
        <Box>
            <PopUp title="Success!" open={response == 200}>
                Your account has been created! We sent you an verification link
                to your email.
            </PopUp>

            <Paper elevation={3} sx={{ padding: 3 }}>
                <form onSubmit={onCreateAccount}>
                    <Stack direction={"column"} spacing={3}>
                        <TextField
                            sx={
                                formError.type === "username" && {
                                    backgroundColor:
                                        theme.palette.background.errorBG,
                                }
                            }
                            label="Username"
                            value={formData.username}
                            onChange={(e) =>
                                onUpdateFormdata("username", e.target.value)
                            }
                        />
                        <TextField
                            sx={
                                formError.type === "email" && {
                                    backgroundColor:
                                        theme.palette.background.errorBG,
                                }
                            }
                            placeholder="Email"
                            label="Email"
                            value={formData.email}
                            onChange={(e) =>
                                onUpdateFormdata("email", e.target.value)
                            }
                        />
                        <Alert severity="warning" variant={"outlined"}>
                            Always make your password unique, you can always
                            reset your password if you forget it
                        </Alert>
                        <TextField
                            sx={
                                formError.type === "password" && {
                                    backgroundColor:
                                        theme.palette.background.errorBG,
                                }
                            }
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={(e) =>
                                onUpdateFormdata("password", e.target.value)
                            }
                        />
                        <TextField
                            sx={
                                formError.type === "password" && {
                                    backgroundColor:
                                        theme.palette.background.errorBG,
                                }
                            }
                            label="Repeat password"
                            type="password"
                            value={formData.passwordRepeat}
                            onChange={(e) =>
                                onUpdateFormdata(
                                    "passwordRepeat",
                                    e.target.value
                                )
                            }
                        />
                        {formError.message && (
                            <UseAlert type="error">
                                {formError.message}
                            </UseAlert>
                        )}
                        {error && <UseAlert type="error">{error}</UseAlert>}
                        <PrimaryBtnLoading
                            onClick={onCreateAccount}
                            loading={loading}
                        >
                            Create
                        </PrimaryBtnLoading>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}
