import {
  SET_USER,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  SET_AUTHENTICATED,
  AUTHENTICATION_FAILED,
} from "./types";
import axios from "axios";
import AuthenticationService from "../api/AuthenticationService";

let AuthService = new AuthenticationService();

interface localStorageObj {
  username?: string;
  accessToken?: string;
}

export const loadUser = () => (dispatch: any) => {
  dispatch({ type: LOADING_USER });
  const userName = AuthService.loadUserNameIfExists();

  if (userName !== null) {
    dispatch({
      type: SET_USER,
      userName: userName,
    });
  }
};

export const signUpUser = (userData: any) => (dispatch: any) => {
  dispatch({ type: LOADING_UI });

  AuthService.signup(userData.username, userData.password).then((response) => {
    if (response.didRegisterError === true) {
      dispatch({
        type: AUTHENTICATION_FAILED,
        payload: {
          authenticated: false,
          error: response.errorObject,
        },
      });
    } else {
      dispatch({
        type: SET_AUTHENTICATED,
        payload: {
          authenticated: true,
          userName: userData.username,
        },
      });
    }
  });
};
export const loginUser = (userData: any, history: any) => (dispatch: any) => {
  dispatch({ type: LOADING_UI });
  AuthService.signin(userData.username, userData.password).then((response) => {
    if (response.isAuthError === true) {
      dispatch({
        type: AUTHENTICATION_FAILED,
        payload: {
          authenticated: false,
          error: response.errorObject,
        },
      });
    } else {
      dispatch({
        type: SET_AUTHENTICATED,
        payload: {
          authenticated: true,
          userName: userData.username,
        },
      });
    }
  });
};

export const logoutUser = () => (dispatch: any) => {
  AuthService.signout();
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
  // window.location.href = '/login'; // redirect to login page
};
