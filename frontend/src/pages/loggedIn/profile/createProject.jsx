import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import SecondaryButton from "src/common/components/button/secondaryBtn";
import DataSaverOnRoundedIcon from "@mui/icons-material/DataSaverOnRounded";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useFetch from "src/common/hooks/useFetch";
import { useEffect } from "react";
import Cookies from "universal-cookie";

const Transition = React.forwardRef(function Transition(props, ref) {
    // @ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

const schema = yup
    .object({
        projectName: yup.string().required(),
    })
    .required();

export default function CreateProfile() {
    const cookie = new Cookies();
    const [open, setOpen] = React.useState(false);
    const { response, error, loading, post } = useFetch();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    useEffect(() => {}, [response, error]);

    function onSubmit(data) {
        const body = JSON.stringify(data.projectName);
        const header = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie.get("token")}`,
        };
        post("Project", body, header);
    }

    return (
        <>
            <SecondaryButton hasBorder={true} onClick={handleClickOpen}>
                New Project
                <DataSaverOnRoundedIcon sx={{ marginLeft: 2 }} />
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Project name"
                            {...register("projectName", {
                                required: true,
                                maxLength: 100,
                            })}
                        />
                    </form>
                    {errors.projectName && (
                        <p>DOH! Please enter a project name</p>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
