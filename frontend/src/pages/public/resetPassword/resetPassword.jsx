import {
    Box,
    CircularProgress,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import PrimaryBtn from "src/common/components/button/primaryBtn";
import useFetch from "src/common/hooks/useFetch";
import Logo from "src/common/logo/logo";

export default function ResetPassword() {
    const { put, loading, response, error } = useFetch();
    const [formData, setFormData] = useState({
        email: "",
        tempPassword: "",
        newPassword: "",
        newPasswordRepeat: "",
    });

    function onResetPassword() {
        //Validate...
        put(
            `User/UpdatePassword?email=${formData.email}&oldPassword=${formData.tempPassword}&newPassword=${formData.newPassword}`
        );
    }

    function onUpdateFormdata(field, value) {
        const updatedData = { ...formData, [field]: value };
        setFormData(updatedData);
    }

    return (
        <Box sx={{ minHeight: "100vh" }} className="flex">
            <Paper sx={{ padding: 4 }} elevation={4}>
                <Logo />
                <Stack direction="column" gap={2}>
                    <Typography fontWeight={"bold"} fontSize={30} marginTop={4}>
                        Reset your password
                    </Typography>
                    <>
                        Your email address
                        <TextField
                            onChange={(e) =>
                                onUpdateFormdata("email", e.target.value)
                            }
                        />
                    </>
                    <>
                        Enter your temporary password
                        <TextField
                            onChange={(e) =>
                                onUpdateFormdata("tempPassword", e.target.value)
                            }
                        />
                    </>
                    <>
                        Enter new password
                        <TextField
                            type="password"
                            onChange={(e) =>
                                onUpdateFormdata("newPassword", e.target.value)
                            }
                        />
                    </>
                    <>
                        Repeat new password
                        <TextField
                            type="password"
                            onChange={(e) =>
                                onUpdateFormdata(
                                    "newPasswordRepeat",
                                    e.target.value
                                )
                            }
                        />
                    </>
                    <PrimaryBtn onClick={onResetPassword}>
                        Update password
                        {loading && (
                            <CircularProgress
                                size={20}
                                sx={{ marginLeft: 2 }}
                                color={"secondary"}
                            />
                        )}
                    </PrimaryBtn>
                </Stack>
            </Paper>
        </Box>
    );
}
