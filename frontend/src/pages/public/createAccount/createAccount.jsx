import { Container, Grid, Stack, Typography } from "@mui/material";
import BenefitPoint from "src/common/components/benefitPoint/benefitPoint";
import CreateAccountForm from "./createAccountForm";
import RevealWithBox from "src/common/animation/reavelWithBox";
export default function CreateAccount() {
    const benefits = [
        "Its free.... for now :)",
        "Makes it easy to document your api",
        "Create tickets for your team",
        "Dont miss deadlines with our calender",
        "Did we mention it is free? .. for now",
    ];
    return (
        <Container
            sx={{ minHeight: "70vh", display: "flex", alignItems: "center" }}
        >
            <Grid container>
                <Grid item xs={12} md={6}>
                    <RevealWithBox>
                        <Typography
                            variant="h3"
                            fontWeight={"bold"}
                            marginBottom={4}
                        >
                            Create account
                        </Typography>
                    </RevealWithBox>
                    <Stack direction={"column"} spacing={3}>
                        {benefits.map((benefit) => (
                            <BenefitPoint key={benefit}>{benefit}</BenefitPoint>
                        ))}
                    </Stack>
                </Grid>
                <Grid item xs={12} md={5}>
                    <CreateAccountForm />
                </Grid>
            </Grid>
        </Container>
    );
}
