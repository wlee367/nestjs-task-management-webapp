import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

type NewCardModalProps = {
    toggleModal: () => void;
    submitForm: (title: string, description: string) => void;
    isOpen: boolean;
};

export const NewCardModal = (props: NewCardModalProps) => {
    const { isOpen, toggleModal, submitForm } = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleClose = () => {
        toggleModal();
    };

    const submit = () => {
        submitForm(title, description);
    };

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle
                    id="form-dialog-title"
                    style={{ paddingBottom: 0 }}
                >
                    Add a new task
                </DialogTitle>
                <DialogContent style={{ paddingTop: 0 }}>
                    <TextField
                        defaultValue={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        margin="dense"
                        id="title"
                        label="What would you like to accomplish?"
                        type="text"
                        required={true}
                        fullWidth
                    />
                    <TextField
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                        margin="dense"
                        id="description"
                        label="Describe your task (optional)"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={submit} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
