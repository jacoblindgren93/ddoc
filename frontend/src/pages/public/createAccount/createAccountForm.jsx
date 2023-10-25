import { useEffect, useState } from "react";
import { Alert, Box, Paper, Stack, TextField, useTheme } from "@mui/material";
import PrimaryBtn from "src/common/components/button/primaryBtn";
import UseAlert from "src/common/components/alert/useAlert";
import useFetch from "src/common/hooks/useFetch";
import PopUp from "src/common/components/popUp/infoDialog";
import PrimaryBtnLoading from "src/common/components/button/primaryBtnLoading";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    username: yup.string().max(40).required(),
    email: yup.string().email().max(100).required(),
    password: yup.string().min(8).required(),
});

export default function CreateAccountForm() {
    const registers = [
        {
            label: "Username",
            name: "username",
            type: "text",
        },
        {
            label: "Email",
            name: "email",
            type: "text",
        },
        {
            label: "Password",
            name: "password",
            type: "password",
        },
    ];

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(schema) });

    const { loading, error, response, post } = useFetch();
    const theme = useTheme();

    function onCreateAccount(formData) {
        let body = {
            userName: formData.username,
            email: formData.email,
            password: formData.password,
        };
        post("User", body);
        reset();
    }

    return (
        <Box>
            <PopUp title="Success!" open={response.length > 0}>
                Your account has been created! We sent you an verification link
                to your email.
            </PopUp>

            <Paper elevation={3} sx={{ padding: 3 }}>
                <form onSubmit={handleSubmit(onCreateAccount)}>
                    <Stack direction={"column"} spacing={3}>
                        {registers.map((reg) => {
                            return (
                                <>
                                    <TextField
                                        key={reg.label}
                                        label={reg.label}
                                        type={reg.type}
                                        // @ts-ignore
                                        {...register(reg.name)}
                                    />
                                    {errors[reg.label.toLowerCase()] && (
                                        <UseAlert type="error">
                                            {
                                                errors[reg.label.toLowerCase()]
                                                    .message
                                            }
                                        </UseAlert>
                                    )}
                                </>
                            );
                        })}

                        <PrimaryBtnLoading type="submit" loading={loading}>
                            Create
                        </PrimaryBtnLoading>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}
