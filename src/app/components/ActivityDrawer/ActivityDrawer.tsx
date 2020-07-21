import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import moment from "moment";
import { useDispatch } from "react-redux";
import { fetchUserActivity } from "../../redux/actions/activity";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { StoreState } from "../../redux/reducers";
import { UserActivity } from "../../redux/actions/activity";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  activityListItem: {
    display: "flex",
    flexDirection: "column",
  },
  dateText: {
    fontSize: "13px",
  },
});

type Anchor = "top" | "left" | "bottom" | "right";

export const ActivityDrawer = () => {
  const classes = useStyles();
  const typedUseSelector: TypedUseSelectorHook<StoreState> = useSelector;

  const dispatch = useDispatch();
  const { activity } = typedUseSelector((state) => state.userActivity);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    dispatch(fetchUserActivity());
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor, str: string) => (
    <>
      {activity && activity.length === 0 && (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Start by creating a task :){" "}
        </div>
      )}
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === "top" || anchor === "bottom",
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {activity &&
            activity.length > 0 &&
            activity.reverse().map((text: UserActivity) => {
              const date = moment(text.date).calendar();
              return (
                <ListItem key={text.id} alignItems={"center"}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderBottom: "1px solid grey",
                    }}
                  >
                    <ListItemText
                      primary={text.description}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component={"span"}
                            variant={"body1"}
                            className={classes.dateText}
                          >
                            {date}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </div>
                </ListItem>
              );
            })}
        </List>
        {/* <Divider /> */}
      </div>
    </>
  );

  return (
    <div>
      {(["right"] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            color="primary"
            variant={"contained"}
          >
            Activity
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor, "hi")}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};
