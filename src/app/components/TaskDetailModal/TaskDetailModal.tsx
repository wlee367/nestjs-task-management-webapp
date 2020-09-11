import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory, useParams } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import Styled from 'styled-components';
import ListIcon from '@material-ui/icons/List';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import StatusToggler from '../StatusToggler/StatusToggler';
import { TaskStatus } from '../StatusToggler/StatusEnums';
import { CommentInput } from '../CommentInput/CommentInput';
import { Comment } from '../../redux/actions/index';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) => ({
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },

    dialogContent: {
        display: 'flex',
        flexDirection: 'row',
    },
}));

type TaskDetailModalProps = {
    toggleModal: () => void;
    isOpen: boolean;
    title: string;
    content: string;
    selectedStatus: string;
    comments: [];
    onStatusChange: (newStatus: string) => void;
    onSubmitComment: (taskId: string, commentText: string) => void;
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
    display: flex;
    flex-direction: column;
    padding: 0 1em;
`;

const StyledDetailContent = Styled.div``;

const StyledDetailHeader = Styled.div`
    max-height: 30%;
`;

const StyledCommentsContainer = Styled.div`
    // height: 50%;
    min-height: 50%;
`;

const StyledCommentsHeader = Styled.div``;

const StyledCommentInputContainer = Styled.div`
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
`;

const StyledWidgetContainer = Styled.div`
    width: 25%;
`;

const StyledTitleHeader = Styled.div`
    display: flex;
    align-items: center;
`;

const CommentCard = Styled.div`
    padding: 0.5em 0.5em;

    display: flex;
    flex-direction: row;
    align-items: center;

    border: 1px solid grey;
    border-radius: 8px;

    &> .comment {
      padding-left: 0.25em;
    }

    &>.createdAt {
      padding-left: 0.25em;
    }
`;

interface TaskDetailModalParam {
    id: string;
}

export const TaskDetailModal = (props: TaskDetailModalProps) => {
    const { isOpen, toggleModal, title, content, selectedStatus } = props;

    const history = useHistory();

    const classes = useStyles();

    const params: TaskDetailModalParam = useParams();

    const handleClose = () => {
        toggleModal();
        history.goBack();
    };

    /**
     * @param status
     */
    const determineSelectedStatusEnum = (status: string) => {
        switch (status) {
            case 'OPEN':
                return TaskStatus.OPEN;
            case 'IN_PROGRESS':
                return TaskStatus.IN_PROGRESS;
            case 'DONE':
                return TaskStatus.DONE;
            default:
                return TaskStatus.OPEN;
        }
    };

    const handleStatusOnChange = (newStatus: string) => {
        props.onStatusChange(newStatus);
    };

    const handleSubmitComment = (comment: string) => {
        let { id } = params;

        props.onSubmitComment(id, comment);
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
                    style={{ paddingTop: '1.5em', alignItems: 'center' }}
                    id="form-dialog-title"
                >
                    <StyledDialogTitleDiv>
                        <div
                            style={{
                                alignItems: 'center',
                                display: 'flex',
                                width: '100%',
                            }}
                        >
                            <AssignmentIcon />
                            <div style={{ marginLeft: '0.5em', width: '100%' }}>
                                {title}
                            </div>
                        </div>
                        <StyledCloseIcon onClick={handleClose} />
                    </StyledDialogTitleDiv>
                </DialogTitle>
                <DialogContent
                    classes={{ root: classes.dialogContent }}
                    style={{ paddingTop: 0, paddingBottom: '1.5em' }}
                >
                    <StyledContentContainer>
                        <StyledDetailHeader>
                            <StyledTitleHeader>
                                <ListIcon />
                                <h3 style={{ marginLeft: '0.5em' }}>
                                    Details:{' '}
                                </h3>
                            </StyledTitleHeader>
                            <StyledDetailContent>
                                <p>{content}</p>
                            </StyledDetailContent>
                        </StyledDetailHeader>
                        <StyledCommentsContainer>
                            <StyledCommentsHeader>
                                {' '}
                                <h3 style={{ marginLeft: '0.5em' }}>
                                    Comments:{' '}
                                </h3>
                            </StyledCommentsHeader>
                            <StyledCommentInputContainer>
                                <CommentInput
                                    userInitials={'JL'}
                                    submitComment={(comment: string) => {
                                        handleSubmitComment(comment);
                                    }}
                                />
                            </StyledCommentInputContainer>
                            {props.comments &&
                                props.comments.map((comment: Comment) => {
                                    console.log(comment);
                                    return (
                                        <CommentCard key={comment.id}>
                                            <p className="username">
                                                <b>{comment.user.username}</b>{' '}
                                                commented:{' '}
                                            </p>
                                            <p className="comment">
                                                "{comment.commentText}"
                                            </p>
                                            <p className="createdAt">
                                                at:{' '}
                                                {moment(
                                                    comment.createdAt,
                                                    'YYYY-MM-DD HH:mm:ss'
                                                ).format('LTS')}
                                            </p>
                                        </CommentCard>
                                    );
                                })}
                        </StyledCommentsContainer>
                    </StyledContentContainer>
                    <StyledWidgetContainer>
                        <StatusToggler
                            status={determineSelectedStatusEnum(selectedStatus)}
                            changeStatus={(newStatus: string) => {
                                handleStatusOnChange(newStatus);
                            }}
                        />
                    </StyledWidgetContainer>
                </DialogContent>
            </Dialog>
        </div>
    );
};
