import { Box } from "@mui/material";
import SecondaryButton from "src/common/components/button/secondaryBtn";
import ThemeButton from "src/common/components/button/themeButton";
import Logo from "src/common/logo/logo";
import Cookies from "universal-cookie";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "src/providers/AuthContext";

export default function TopSection() {
    const cookie = new Cookies();
    const navigate = useNavigate();
    const { setIsAuth } = useContext(AuthContext);
    function onSignOut() {
        if (cookie.get("token")) {
            cookie.remove("token");
            setIsAuth(false);
        }
        navigate("/");
    }

    return (
        <Box display={"flex"} justifyContent={"space-between"}>
            <Logo />
            <Box className="flex">
                <ThemeButton />
                <SecondaryButton onClick={onSignOut}>
                    <LogoutIcon sx={{ marginRight: 2 }} />
                    Sign out
                </SecondaryButton>
            </Box>
        </Box>
    );
}
