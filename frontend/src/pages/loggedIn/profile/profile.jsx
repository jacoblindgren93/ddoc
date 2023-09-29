// @ts-ignore
import { Container } from "@mui/material";
// @ts-ignore
import Logo from "src/common/images/Logo_Light_Theme.svg";

export default function Profile() {
    return (
        <Container sx={{ padding: 4 }}>
            <img src={Logo} width="60" />
            <h1>Profile brother</h1>
        </Container>
    );
}
