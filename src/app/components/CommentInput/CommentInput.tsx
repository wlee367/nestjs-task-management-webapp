import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

interface CommentInputProps {
  userInitials: string;
  submitComment: () => void;
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

  return (
    <>
      <div className={classes.userCircle}>{props.userInitials}</div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Write a comment"
          variant="outlined"
        />
      </form>
    </>
  );
};
