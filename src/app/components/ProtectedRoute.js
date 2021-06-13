import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { selectUser } from "../features/authSlice";

function ProtectedRoute({ children, ...rest }) {
  const user = useSelector(selectUser);

  return (
    <Route
      {...rest}
      render={() => (user ? <Redirect to={{ pathname: "/" }} /> : children)}
    />
  );
}

export default ProtectedRoute;
