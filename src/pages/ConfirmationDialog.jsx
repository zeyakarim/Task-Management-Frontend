import { forwardRef, Fragment } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axiosInstance from '../utility/axios-instance';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationDialog = ({ open, onClose, id, setReRender, reRender }) => {

    const handleDelete = () => {
        axiosInstance
            .delete(`/tasks/${id}`)
            .then((response) => {
                if (response?.data?.success) {
                    onClose();
                    setReRender(!reRender);
                } else {
                    alert(response?.data?.message)
                }
            })
    }

    return (
        <Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className='text-center'>Are you sure ?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Do you really want to delete the task?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>No</Button>
                    <Button onClick={handleDelete}>Yes</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default ConfirmationDialog;