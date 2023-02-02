import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;
