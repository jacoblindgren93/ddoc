import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import useFetch from "src/common/hooks/useFetch";
import SecondaryButton from "src/common/components/button/secondaryBtn";
import PrimaryBtn from "src/common/components/button/primaryBtn";
import { TextField } from "@mui/material";
import UseAlert from "src/common/components/alert/useAlert";

const Transition = React.forwardRef(function Transition(props, ref) {
    // @ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ForgotPasswordDialog({ show, setShow }) {
    const [showDialog, setShowDialog] = React.useState(show);
    const [email, setEmail] = React.useState("");
    const { post } = useFetch();
    const [showFeedback, setShowFeedBack] = React.useState(false);
    const handleClose = () => {
        setShow(false);
    };

    React.useEffect(() => {
        setShowDialog(show);
    }, [show]);

    const handleResetPassword = () => {
        setShowFeedBack(true);
        post(`User/ResetPassword?Email=${email}`);
    };

    return (
        <div>
            {showDialog && (
                <Dialog
                    fullWidth
                    open={showDialog}
                    // @ts-ignore
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>Reset password</DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-slide-description"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                minHeight: "120px",
                            }}
                        >
                            Please enter your email address
                            <TextField
                                sx={{ marginTop: 2 }}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {showFeedback && (
                                <UseAlert type="info">
                                    If your email exist an email has been set.
                                    Please follow the instructions there!
                                </UseAlert>
                            )}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {!showFeedback && (
                            <PrimaryBtn onClick={handleResetPassword}>
                                Reset password
                            </PrimaryBtn>
                        )}
                        <SecondaryButton onClick={handleClose}>
                            Close
                        </SecondaryButton>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
}
