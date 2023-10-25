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
import { useContext, useEffect } from "react";
import Cookies from "universal-cookie";
import { Projects } from "./profile";
import PrimaryBtn from "src/common/components/button/primaryBtn";

const Transition = React.forwardRef(function Transition(props, ref) {
    // @ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

const schema = yup
    .object({
        projectName: yup.string().required(),
    })
    .required();

export default function CreateProject() {
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

    useEffect(() => {
        if (response.length > 0) {
            window.location.reload();
        }
    }, [response, error]);

    function onSubmit(data) {
        const body = JSON.stringify(data.projectName);
        const header = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie.get("token")}`,
        };
        post("Project", body, header);
    }

    const registers = [
        {
            label: "Project name",
            registerName: "projectName",
            registerOptions: { required: true },
        },
    ];

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
                fullWidth
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ textAlign: "center" }}>
                    {"Create Project"}
                </DialogTitle>
                <DialogContent
                    className="flex"
                    sx={{ padding: 4, marginTop: 2 }}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {registers.map((reg) => {
                            return (
                                <TextField
                                    key={reg.label}
                                    label={reg.label}
                                    {...register(
                                        reg.registerName,
                                        reg.registerOptions
                                    )}
                                />
                            );
                        })}
                    </form>
                    {errors.projectName && (
                        <p>DOH! Please enter a project name</p>
                    )}
                </DialogContent>
                <DialogActions>
                    <PrimaryBtn type="submit" onClick={handleClose}>
                        Create
                    </PrimaryBtn>
                    <SecondaryButton onClick={handleClose}>
                        Cancel
                    </SecondaryButton>
                </DialogActions>
            </Dialog>
        </>
    );
}
