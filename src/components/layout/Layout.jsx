import React from "react";
import AppRoutes from "../Routes";
import { Route } from "react-router-dom";

const Layout = () => {
  return (
    <Route
      render={(props) => (
        <div>
          <AppRoutes />
        </div>
      )}
    />
  );
};

export default Layout;
