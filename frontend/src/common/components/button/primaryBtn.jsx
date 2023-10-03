import { useTheme } from "@mui/material";
import { styled } from "@mui/system";

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
}));

export default function PrimaryBtn(props) {
    const theme = useTheme();

    return (
        <StyledButton type={props.type} sx={props.sx} onClick={props.onClick}>
            {props.children}
        </StyledButton>
    );
}
