import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { authToken } = useSelector((state) => state.user);

  return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
