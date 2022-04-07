import React from "react";
import Alert from "react-native";
import * as SecureStore from "expo-secure-store";
import BackendQuery from "../config/Axios";
let user = {};

/**
 * @description useAuth is the function responsible for the router authorization
 * */

export function useAuth() {
  /**
   * @description Using React Reducer
   * */

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
  /**
   * @description Using React Memo
   * */
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
          debugger;
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
          throw e;
        }
      },
      register: async (body) => {
        try {
          await requestRegister(body);
        } catch (e) {
          throw e;
        }
      },
      forgotPassword: async (email) => {
        try {
          {
            const body = {
              email: email,
            };
            console.log("Forgot password called " + body.email);
            const result = await requestResetPassword(body);
          }
        } catch (e) {
          throw e;
        }
      },
    }),
    []
  );

  /**
   * @description Using React useEffect to check there is token in the local storage
   * */
  React.useEffect(async () => {
    await SecureStore.getItemAsync("user_token").then((user) => {
      if (user) {
        // dispatch(createAction('SET_USER', JSON.parse(user)));
        dispatch({ type: "SET_USER", token: user.sessionId });
      }
      dispatch({ type: "SET_LOADING", loading: false });
    });
  }, []);

  /**
   * @description requestSignIn
   * @route POST http://localhost:3000/auth/sign-in
   * @TODO - Tested and Working!
   * */

  const requestSignIn = async (body) => {
    try {
      const response = await BackendQuery.post("/auth/sign-in", body);
      console.log("I am in register");

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

  /**
   * @description requestsignOut
   * @route POST http://localhost:3000/auth/sign-out
   * @TODO - Tested and Working!
   * */
  const requestsignOut = async (body) => {
    try {
      const response = await BackendQuery.post("/auth/sign-out", body);
      console.log("I am in requestSignOut");

      if (response.status == 200) {
        console.log(response.data);
      }
    } catch (error) {
      const { error: errorIssue } = error.response.data;
      throw errorIssue;
    }
  };

  /**
   * @description requestRegister
   * @route POST http://localhost:3000/auth/new-signup
   * @TODO - Tested and Working!
   * */
  const requestRegister = async (body) => {
    try {
      //console.log(body);
      const response = await BackendQuery.post("/auth/new-signup", body);
      console.log("I am in requestRegister");

      if (response.status == 201) {
        //const { data } = response.status.data;
        console.log(response.data);
      }
    } catch (error) {
      const { error: errorIssue } = error.response.data;
      throw errorIssue;
    }
  };

  /**
   * @description requestResetPassword
   * @route POST http://localhost:3000/auth/new-signup
   * @TODO - Tested and Working!
   * */
  const requestResetPassword = async (body) => {
    try {
      //console.log(body);
      const response = await BackendQuery.post("/auth/reset-password", body);

      if (response.status == 200) {
        return;
      }
    } catch (error) {
      const { error: errorIssue } = error.response.data;
      throw errorIssue;
    }
  };
  return { auth, state };
}
