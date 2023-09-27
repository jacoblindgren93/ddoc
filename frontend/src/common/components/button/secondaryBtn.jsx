import { Box, useTheme } from "@mui/material";

export default function SecondaryButton({ onClick, children }) {
    const theme = useTheme();

    const btnStyle = {
        color: theme.palette.text.primary,
        transition: "0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "150px",
        borderRadius: "2px",
        fontWeight: 500,
        "&:hover": {
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "10px",
        },
        cursor: "pointer",
    };

    return (
        <Box
            sx={btnStyle}
            padding={1}
            borderRadius={1}
            onClick={() => onClick()}
        >
            {children}
        </Box>
    );
}
