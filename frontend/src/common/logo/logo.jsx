import { useContext } from "react";
// @ts-ignore
import LogoLight from "src/common/images/Logo_Light_Theme.svg";
import { ThemeContext } from "src/providers/themeContextProvider";

export default function Logo() {
    //Check theme
    const { theme } = useContext(ThemeContext);
    // @ts-ignore
    return (
        <div>
            {theme === "light" ? (
                <img src={LogoLight} width="60" />
            ) : (
                "Dark theme"
            )}
        </div>
    );
}
