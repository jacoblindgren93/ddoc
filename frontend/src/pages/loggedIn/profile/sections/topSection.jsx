import { Box } from "@mui/material";
import SecondaryButton from "src/common/components/button/secondaryBtn";
import ThemeButton from "src/common/components/button/themeButton";
import Logo from "src/common/logo/logo";
import Cookies from "universal-cookie";
import LogoutIcon from "@mui/icons-material/Logout";

export default function TopSection() {
    const cookie = new Cookies();
    function onSignOut() {
        if (cookie.get("token")) {
            cookie.remove("token");
        }
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
