import {
    Alert,
    Box,
    Container,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import AuthProvider from "src/common/components/AuthProvider/authProvider";
import BenefitPoint from "src/common/components/benefitPoint/benefitPoint";
import PrimaryBtn from "src/common/components/button/primaryBtn";
import GoogleIcon from "@mui/icons-material/Google";
import CreateAccountForm from "./createAccountForm";
export default function CreateAccount() {
    return (
        <Container
            sx={{ minHeight: "70vh", display: "flex", alignItems: "center" }}
        >
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h3"
                        fontWeight={"bold"}
                        marginBottom={4}
                    >
                        Create account
                    </Typography>
                    <Stack direction={"column"} spacing={3}>
                        <BenefitPoint>Its free... for now {":)"}</BenefitPoint>
                        <BenefitPoint>
                            Makes it easy to document your api
                        </BenefitPoint>
                        <BenefitPoint>
                            Create tickets for your team
                        </BenefitPoint>
                        <BenefitPoint>
                            Dont miss deadlines with our calender
                        </BenefitPoint>
                        <BenefitPoint>
                            Did we mention it is free? .. for now
                        </BenefitPoint>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={5}>
                    <CreateAccountForm />
                </Grid>
            </Grid>
        </Container>
    );
}
