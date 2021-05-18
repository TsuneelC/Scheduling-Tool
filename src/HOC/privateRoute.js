import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getCookie } from "../utils/cookies";

export const PrivateRoute = ({ Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      console.log('getCookie("accessToken")', getCookie("accessToken"));
      return getCookie("accessToken") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);
