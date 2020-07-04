import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import Styled from "styled-components";
import ListIcon from "@material-ui/icons/List";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AssignmentIcon from "@material-ui/icons/Assignment";
import StatusToggler from "../StatusToggler/StatusToggler";
import { TaskStatus } from "../StatusToggler/StatusEnums";

const useStyles = makeStyles((theme: Theme) => ({
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
  },

  dialogContent: {
    display: "flex",
    flexDirection: "row",
  },
}));

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
    width: 75%;
`;

const StyledWidgetContainer = Styled.div`
    width: 25%;
`;

const StyledTitleHeader = Styled.div`
    display: flex;
    align-items: center;
`;

export const TaskDetailModal = (props: TaskDetailModalProps) => {
  const { isOpen, toggleModal, title, content } = props;

  const history = useHistory();

  const classes = useStyles();

  const handleClose = () => {
    toggleModal();
    history.goBack();
  };
  return (
    <div>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        disableBackdropClick={true}
        fullWidth={true}
        maxWidth="md"
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          style={{ paddingTop: "1.5em", alignItems: "center" }}
          id="form-dialog-title"
        >
          <StyledDialogTitleDiv>
            <div
              style={{ alignItems: "center", display: "flex", width: "100%" }}
            >
              <AssignmentIcon />
              <div style={{ marginLeft: "0.5em", width: "100%" }}>{title}</div>
            </div>
            <StyledCloseIcon onClick={handleClose} />
          </StyledDialogTitleDiv>
        </DialogTitle>
        <DialogContent
          classes={{ root: classes.dialogContent }}
          style={{ paddingTop: 0, paddingBottom: "1.5em" }}
        >
          <StyledContentContainer>
            <StyledTitleHeader>
              <ListIcon />
              <h3 style={{ marginLeft: "0.5em" }}>Details: </h3>
            </StyledTitleHeader>
            {content}
          </StyledContentContainer>
          <StyledWidgetContainer>
            <StatusToggler
              status={TaskStatus.OPEN}
              changeStatus={() => {
                console.log("change");
              }}
            />
          </StyledWidgetContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
};
