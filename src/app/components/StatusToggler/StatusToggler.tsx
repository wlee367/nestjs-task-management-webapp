import React, { useEffect } from "react";
import { TaskStatus } from "./StatusEnums";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: "block",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "100%",
    },
  })
);

type StatusTogglerProps = {
  status: TaskStatus;
  changeStatus: (newStatus: TaskStatus) => void;
};

export default function StatusToggler(props: StatusTogglerProps) {
  const classes = useStyles();
  const [status, setStatus] = React.useState<TaskStatus>(props.status);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSetStatus = (newStatus: TaskStatus) => {
    props.changeStatus(newStatus);
    setStatus(newStatus);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={status}
          onChange={(event) => {
            const newValue = event.target.value;
            console.log(newValue);
            if (newValue === TaskStatus.OPEN) {
              handleSetStatus(TaskStatus.OPEN);
            } else if (newValue === TaskStatus.IN_PROGRESS) {
              handleSetStatus(TaskStatus.IN_PROGRESS);
            } else {
              handleSetStatus(TaskStatus.DONE);
            }
          }}
        >
          <MenuItem value={TaskStatus.OPEN}>Open</MenuItem>
          <MenuItem value={TaskStatus.IN_PROGRESS}>In Progress</MenuItem>
          <MenuItem value={TaskStatus.DONE}>Done</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
