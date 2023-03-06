import React, { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PageNotFound from "./pages/404/PageNotFound";
import httpIntercept from "./interceptor/interceptor";
import { setCredentials } from "./store/slices/userSlice";
import Home from "./pages/home/Home";
import MyBooks from "./pages/book_loans/BookLoans";
import MyRequests from "./pages/book_requests/BookRequests";
import useHttp from "./hooks/use-https";

function App() {
  httpIntercept();

  const { authToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { sendRequest } = useHttp();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {

      sendRequest(
        {
          url: "auth/users/me/",
        },
        (data) => {
          dispatch(setCredentials(data));
        }
      );
    }
  }, [dispatch, authToken, sendRequest]);

  return (
    <Fragment>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/" exact element={<Home />} />

          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />

          <Route path="/lms" element={<PrivateRoute />}>
            <Route path="mybooks" exact element={<MyBooks />} />
            <Route path="myrequests" exact element={<MyRequests />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Fragment>
  );
}

export default App;
