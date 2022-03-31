import React from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import BackendQuery from "../config/Axios";
import createAction from "../util/createAction";
let user = {};

export function useAuth() {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_USER":
          return {
            ...state,
            user: { ...action.payload },
          };
        case "REMOVE_USER":
          return {
            ...state,
            user: undefined,
          };
        case "SET_LOADING":
          return {
            ...state,
            loading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
      loading: true,
    }
  );

  const auth = React.useMemo(
    () => ({
      login: async (username, password) => {
        console.log("login+" + username + password);

        const body = {
          username: username,
          password: password,
        };
        try {
          await requestSignIn(body);

          console.log("Session ID ", user);
          if (user.sessionId != undefined) {
            await SecureStore.setItemAsync("user_token", user.sessionId);
            dispatch({ type: "SET_USER", token: user.sessionId });
          }
        } catch (error) {
          console.log(error);
          //console.log("Sign In Error", `Input Error, try again!`);
        }
      },
      logout: async () => {
        try {
          console.log("Logout user session id");
          const id = await SecureStore.getItemAsync("user_token");
          console.log(id);
          body = {
            id: id,
          };

          await requestsignOut(body);
          await SecureStore.deleteItemAsync("user_token");
          dispatch({ type: "REMOVE_USER" });
        } catch (e) {
          console.log("Error found in logout");
          console.log(e);
        }
      },
      register: () => {},

      //Function Being Called inside login method
    }),
    []
  );

  const requestSignIn = async (body) => {
    try {
      const response = await BackendQuery.post("/auth/sign-in", body);
      console.log("I am in requestSignIn");

      if (response.status == 200) {
        const { session_id } = response.data;

        //console.log(`Session ID: ${session_id}`);
        user = {
          sessionId: session_id,
        };
        console.log("Request Item Session");
        console.log(user.sessionId);
      }
    } catch (error) {
      const { error: errorIssue } = error.response.data;
      console.log(`Error found => ${errorIssue})`);
    }
  };

  const requestsignOut = async (body) => {
    try {
      const response = await BackendQuery.post("/auth/sign-out", body);
      console.log("I am in requestSignOut");

      if (response.status == 200) {
        console.log(response.data);
      }
    } catch (error) {
      const { error: errorIssue } = error.response.data;
      console.log(`Error found => ${errorIssue})`);
      //console.log("Cannot Authenticate Username or Password", `${errorIssue}`);
    }
  };
  return { auth, state };
}
