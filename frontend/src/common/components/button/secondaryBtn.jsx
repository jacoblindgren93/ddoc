import { Box, useTheme } from "@mui/material";

export default function SecondaryButton({
    onClick,
    children,
    hasBorder = false,
}) {
    const theme = useTheme();

    const btnStyle = {
        color: theme.palette.text.primary,
        transition: "0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "170px",
        minWidth: "150px",
        borderRadius: "4px",
        fontWeight: 500,
        border: hasBorder ? "1px solid black" : "",
        "&:hover": {
            background: theme.palette.background.secondaryButtonHover,
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
