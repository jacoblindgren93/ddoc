import { CircularProgress, styled, useTheme } from "@mui/material";
import Box from "@mui/material/Box";

export default function PrimaryBtnLoading(props) {
    const theme = useTheme();
    const StyledButton = styled("button")(({ theme, sx }) => ({
        backgroundColor: theme.palette.background.primaryButton,
        color: theme.palette.text.contrast,
        transition: "0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100px",
        borderRadius: "5px",
        padding: "10px",
        outline: "none",
        border: "none",
        fontSize: "15px",
        fontFamily: '"Inter", sans-serif',
        "&:hover": {
            backgroundColor: theme.palette.background.primaryButtonHover,
        },
        cursor: "pointer",
        ...props.sx,
    }));

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

    return (
        <StyledButton type={props.type} sx={props.sx} onClick={props.onClick}>
            {props.children}
            {props.loading && (
                <CircularProgress
                    size={20}
                    sx={{ marginLeft: 2 }}
                    color={"secondary"}
                />
            )}
        </StyledButton>
    );
}
