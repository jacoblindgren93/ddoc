import { Box, Container, Stack, Typography } from "@mui/material";
import PrimaryBtn from "src/common/components/button/primaryBtn";
import SecondaryButton from "src/common/components/button/secondaryBtn";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import "./styles.css";
// @ts-ignore
import AbstractImg from "src/pages/public/homepage/hp-img.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "src/providers/AuthContext";
import { useContext, useEffect } from "react";
import Reveal from "src/common/animation/reveal";
import RevealWithBox from "src/common/animation/reavelWithBox";
export default function Homepage() {
    const { isAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate("/profile");
        }
    }, [isAuth]);
    return (
        <Box marginTop="120px">
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h1" fontSize={150} fontWeight={900}>
                    burk
                </Typography>
                <RevealWithBox>
                    <Typography
                        color="text.secondary"
                        fontSize={40}
                        fontWeight={600}
                    >
                        Project management made easy
                    </Typography>
                </RevealWithBox>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={3}
                    marginTop={2}
                >
                    <PrimaryBtn onClick={() => navigate("/signin")}>
                        Sign in
                    </PrimaryBtn>
                    <SecondaryButton
                        hasBorder={false}
                        onClick={() => navigate("/about")}
                    >
                        Learn more <KeyboardArrowRightOutlinedIcon />
                    </SecondaryButton>
                </Stack>

                <div className="blurry-bg-blue"></div>
                <div style={{ marginTop: "150px" }}>
                    <Reveal y="up">
                        <img src={AbstractImg} width="900" />
                    </Reveal>
                </div>
            </Container>
        </Box>
    );
}
