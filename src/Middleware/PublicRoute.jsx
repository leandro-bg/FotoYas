import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const redirecTo = "/tablero";
  const user = useSelector((state) => state.user);
  if (user.email.length > 0) {
    return <Navigate to={redirecTo} />;
  }
  return children ? children : <Outlet />;
};

export default PublicRoute;
