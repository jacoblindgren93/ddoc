import { Box } from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { useEffect } from "react";
export default function Alert({ type, children }) {
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
