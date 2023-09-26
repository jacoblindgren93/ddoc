import { Box, Container, Stack, Typography } from "@mui/material";
import PrimaryBtn from "src/components/button/primaryBtn";
import SecondaryButton from "src/components/button/secondaryBtn";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import "./styles.css";
// @ts-ignore
import AbstractImg from "src/pages/homepage/abstract.png";
import About from "../about/about";
import { useNavigate } from "react-router-dom";
export default function Homepage() {
    const navigate = useNavigate();

    return (
        <Box marginTop="200px">
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h1" fontWeight={"bold"}>
                    ddoc
                </Typography>
                <Typography color="text.secondary" variant={"h5"}>
                    Manage your teams and documentation easily
                </Typography>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={3}
                    marginTop={2}
                >
                    <PrimaryBtn onClick={() => navigate("/signin")}>
                        Sign in
                    </PrimaryBtn>
                    <SecondaryButton onClick={() => navigate("/about")}>
                        Learn more <KeyboardArrowRightOutlinedIcon />
                    </SecondaryButton>
                </Stack>
                <div className="blurry-bg-pink"></div>
                <div className="blurry-bg-blue"></div>
                <div className="blurry-bg-orange"></div>
            </Container>
            <img
                src={AbstractImg}
                style={{
                    marginTop: "70px",
                    width: "100%",
                    marginBottom: "-10px",
                }}
            />
            <About />
        </Box>
    );
}
