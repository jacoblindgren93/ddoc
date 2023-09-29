import { Box, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PrimaryBtn from "src/common/components/button/primaryBtn";

export default function Verify() {
    const [nrOfTriesLeft, setNrOfTriesLeft] = useState(3);
    const [code, setCode] = useState("");

    function handleSubmit(e) {
        if (e) e.preventDefault();
        setNrOfTriesLeft((prev) => prev - 1);
    }

    console.log("hej");
    return (
        <Box height={"100vh"} className="flex">
            <Paper sx={{ padding: 8 }}>
                <form onSubmit={handleSubmit}>
                    <Stack direction="column" gap={2}>
                        <Typography fontWeight="bold" fontSize={30}>
                            Time to verify!
                        </Typography>
                        <Typography color="grey">
                            We sent you an email with the verification code
                        </Typography>
                        {nrOfTriesLeft !== 3 && (
                            <Typography color="grey">
                                Incorrect! You got {nrOfTriesLeft} tries left.
                            </Typography>
                        )}
                        <TextField
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <PrimaryBtn onClick={() => handleSubmit()}>
                            Verify!
                        </PrimaryBtn>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}
