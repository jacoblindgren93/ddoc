import { CircularProgress, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
export default function PrimaryBtnLoading(props) {
    const theme = useTheme();

    let btnStyle = {
        backgroundColor: theme.palette.background.primaryButton,
        color: theme.palette.text.contrast,
        transition: "0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100px",
        "&:hover": {
            backgroundColor: theme.palette.background.primaryButtonHover,
        },
        cursor: "pointer",
    };
    btnStyle = { ...btnStyle, ...props.sx };
    return (
        <Box
            borderRadius={1}
            sx={btnStyle}
            padding={1}
            onClick={() => props.onClick()}
        >
            {props.children}
            {props.loading && (
                <CircularProgress
                    size={20}
                    sx={{ marginLeft: 2 }}
                    color={"secondary"}
                />
            )}
        </Box>
    );
}
