import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import Styled from "styled-components";
import ListIcon from "@material-ui/icons/List";
import AssignmentIcon from "@material-ui/icons/Assignment";

type TaskDetailModalProps = {
  toggleModal: () => void;
  isOpen: boolean;
  title: string;
  content: string;
};

const StyledDialogTitleDiv = Styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
`;

const StyledCloseIcon = Styled(CloseIcon)`
    &:hover {
        cursor: pointer;
    }
`;

const StyledContentContainer = Styled.div`
`;

const StyledTitleHeader = Styled.div`
    display: flex;
    align-items: center;
`;

export const TaskDetailModal = (props: TaskDetailModalProps) => {
  const { isOpen, toggleModal, title, content } = props;

  const history = useHistory();

  const handleClose = () => {
    toggleModal();
    history.goBack();
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
          style={{ paddingTop: 0, alignItems: "center" }}
          id="form-dialog-title"
        >
          <StyledDialogTitleDiv>
            <div style={{ alignItems: "center", display: "flex" }}>
              <AssignmentIcon />
              <div style={{ marginLeft: "0.5em" }}>{title}</div>
            </div>
            <StyledCloseIcon onClick={handleClose} />
          </StyledDialogTitleDiv>
        </DialogTitle>
        <DialogContent style={{ paddingTop: 0 }}>
          <StyledContentContainer>
            <StyledTitleHeader>
              <ListIcon />
              <h3 style={{ marginLeft: "0.5em" }}>Details: </h3>
            </StyledTitleHeader>
            {content}
          </StyledContentContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
};
