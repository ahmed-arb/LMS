import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";

import { logout } from "../../store/slices/userSlice";

const userPages = [
  { name: "Book Loans", path: "lms/mybooks" },
  { name: "Book Requests", path: "lms/myrequests" },
];
const librarianPages = [
  { name: "Book Loans", path: "lms/mybooks" },
  { name: "Book Requests", path: "lms/myrequests" },
];

function ResponsiveAppBar() {
  const [pages, setPages] = useState([]);
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.isLibrarian) {
      setPages(librarianPages);
    } else if (userInfo) {
      setPages(userPages);
    } else {
      setPages([]);
    }
  }, [userInfo]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Button
            onClick={() => navigate("/")}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Home
          </Button>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => navigate(page.path)}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {userInfo ? (
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            ) : (
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={() => navigate("/register")}
                >
                  / Signup
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
