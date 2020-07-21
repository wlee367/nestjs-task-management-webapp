import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

interface CommentInputProps {
  userInitials: string;
  submitComment: (commentText: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      "& > .MuiFormControl-root.MuiTextField-root > .MuiInputLabel-outlined": {
        transform: "translate(14px, 13px) scale(1)!important",
      },

      "& > .MuiFormControl-root.MuiTextField-root > .MuiInputLabel-outlined.MuiInputLabel-shrink": {
        transform: "translate(14px, -1px) scale(0.75)!important",
      },

      "& > .MuiFormControl-root.MuiTextField-root > .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl > .MuiInputBase-input.MuiOutlinedInput-input": {
        padding: "10px 12px!important",
      },
      "& > *": {
        width: "100%",
      },
    },
    button: {
      width: "10%",
      marginLeft: "0.5em",
    },
    userCircle: {
      width: "5%",
      height: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "grey",
      border: "1px solid grey",
      borderRadius: "50%",
      marginRight: "0.5em",
      //   borderRadius: "50%",
    },
  })
);

export const CommentInput = (props: CommentInputProps) => {
  const classes = useStyles();

  const [comment, setComment] = useState("");

  return (
    <>
      <div className={classes.userCircle}>{props.userInitials}</div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Write a comment"
          variant="outlined"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          disabled={comment.length === 0}
          onClick={() => props.submitComment(comment)}
        >
          Save
        </Button>
      </form>
    </>
  );
};
