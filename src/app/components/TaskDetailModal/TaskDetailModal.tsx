import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

type TaskDetailModalProps = {
    toggleModal: () => void;
    isOpen: boolean;
    title: string;
    content: string;
};

export const TaskDetailModal = (props: TaskDetailModalProps) => {
    const { isOpen, toggleModal, title, content } = props;

    const handleClose = () => {
        toggleModal();
    };
    return (
        <div>
            <Dialog
                disableBackdropClick={true}
                fullWidth={true}
                maxWidth="md"
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle
                    id="form-dialog-title"
                    style={{ paddingBottom: 0 }}
                >
                    {title}
                </DialogTitle>
                <DialogContent style={{ paddingTop: 0 }}>
                    <div>{content}.</div>
                </DialogContent>
                <DialogActions>
                    <Button>Hi</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
