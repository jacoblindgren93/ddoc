import { Box, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrimaryBtn from "src/common/components/button/primaryBtn";
import useFetch from "src/common/hooks/useFetch";

export default function Verify() {
    const { guid } = useParams();
    const { loading, response, error, post } = useFetch();
    useEffect(() => {
        console.log("Posting");
        post(`User/Verify?Guid=${guid}`);
    }, [guid]);

    return (
        <Box height={"100vh"} className="flex">
            <Paper sx={{ padding: 8 }}>
                {response && (
                    <Box padding={4}>
                        <Stack direction="column" gap={2}>
                            <Typography fontSize={20} fontWeight={"bold"}>
                                Your account has been verified!
                            </Typography>
                            <PrimaryBtn onClick={() => console.log("Hai")}>
                                Log into your account
                            </PrimaryBtn>
                        </Stack>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}
