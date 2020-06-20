import { Dispatch } from "redux";
import UserActivityService from "../api/UserActivityService";

export interface UserActivity {
  id: string;
  date: string;
  description: string;
  userId: string;
}

export interface FetchActivityAction {
  type: "FETCH_USER_ACTIVITY";
  payload: UserActivity[];
}

let userActivityService = new UserActivityService();

export const fetchUserActivity = () => {
  return async (dispatch: Dispatch) => {
    userActivityService.getAllActivity().then((response) => {
      dispatch<FetchActivityAction>({
        type: "FETCH_USER_ACTIVITY",
        payload: response.data,
      });
    });
  };
};
