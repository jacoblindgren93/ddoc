import { Box, Typography } from "@mui/material";
//Not in use atm. Replace colors with them colors if they should be used.
export default function AuthProvider({ provider, icon }) {
    const style = {
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        padding: 2,
        borderRadius: 2,
        border: "1px solid grey",
        "&:hover": {
            backgroundColor: "red",
        },
    };

    return (
        <Box sx={style}>
            {icon}{" "}
            <Typography marginLeft={2}>Continue with {provider}</Typography>
        </Box>
    );
}
