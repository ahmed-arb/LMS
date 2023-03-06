import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import Navbar from "../navbar/Navbar";

const Layout = () => {
  return (
    <Fragment>
      <Navbar />
      <Container component="main">
        <CssBaseline />
        <Outlet />
      </Container>
    </Fragment>
  );
};

export default Layout;
