import { Box } from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { useEffect } from "react";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
export default function useAlert({ type, children }) {
    let color;

    function getIcon() {
        switch (type) {
            case "error":
                color = "#b34444";
                return (
                    <ErrorOutlineRoundedIcon
                        sx={{ color: color, marginRight: 1 }}
                    />
                );
            case "info":
                color = "#f57842";
                return (
                    <InfoRoundedIcon sx={{ color: color, marginRight: 1 }} />
                );
            default:
                return "Missing icon";
        }
    }
    return (
        <Box
            sx={{ color: color }}
            padding={2}
            display={"flex"}
            alignItems={"center"}
        >
            {getIcon()} <p style={{ color: color }}>{children}</p>
        </Box>
    );
}
