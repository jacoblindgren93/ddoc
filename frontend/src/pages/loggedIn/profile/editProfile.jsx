import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import SecondaryButton from "src/common/components/button/secondaryBtn";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const Transition = React.forwardRef(function Transition(props, ref) {
    // @ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditProfile() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <SecondaryButton hasBorder={true} onClick={handleClickOpen}>
                Edit profile
                <EditRoundedIcon sx={{ marginLeft: 2 }} />
            </SecondaryButton>
            <Dialog
                open={open}
                // @ts-ignore
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Create Project"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means
                        sending anonymous location data to Google, even when no
                        apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose}>Agree</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
