import { ActivityAction, UserActivity } from "../actions";

const initialState = {
  activity: [] as UserActivity[],
};

export const activityReducer = (
  state = initialState,
  action: ActivityAction
) => {
  switch (action.type) {
    case "FETCH_USER_ACTIVITY":
      return {
        activity: action.payload,
      };
    default:
      return state;
  }
};
