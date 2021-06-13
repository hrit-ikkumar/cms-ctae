import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { selectUser } from "../features/authSlice";

function PrivateRoute({ children, ...rest }) {
  const user = useSelector(selectUser);

  return (
    <Route
      {...rest}
      render={() =>
        user ? children : <Redirect to={{ pathname: "/login" }} />
      }
    />
  );
}

export default PrivateRoute;
