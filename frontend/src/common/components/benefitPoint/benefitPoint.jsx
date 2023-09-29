import { Box, Typography } from "@mui/material";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";

export default function BenefitPoint({ children }) {
    return (
        <Box display={"flex"} alignItems={"center"}>
            <TaskAltRoundedIcon sx={{ fontSize: "45px" }} />
            <Typography
                fontSize={"25px"}
                fontWeight={600}
                color={"#3F3F3F"}
                sx={{ marginLeft: "10px" }}
            >
                {children}
            </Typography>
        </Box>
    );
}
