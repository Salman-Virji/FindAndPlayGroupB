import React from "react";
import Alert from "react-native";
import * as SecureStore from "expo-secure-store";
import BackendQuery from "../config/Axios";
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
          throw error;
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
          //console.log("Error found in logout");
          //console.log(e);
          throw new Error(e);
        }
      },
      register: () => {},
    }),
    []
  );

  const requestSignIn = async (body) => {
    try {
      const response = await BackendQuery.post("/auth/sign-in", body);
      console.log("I am in requestSignIn");

      if (response.status == 200) {
        const { session_id } = response.data;
        user = {
          sessionId: session_id,
        };
      }
    } catch (error) {
      const { error: errorIssue } = error.response.data;
      //console.log(`Error found => ${errorIssue})`);
      throw errorIssue;
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
      Alert.alert(`Error found => ${errorIssue})`);
    }
  };
  return { auth, state };
}
