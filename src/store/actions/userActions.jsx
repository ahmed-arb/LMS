import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/jwt/create`,
        { username, password }
      );
      localStorage.setItem("authToken", data.access);
      return data;
    } catch (error) {
      console.log("error")
      if (error.response && error.response.data.detail) {
        return rejectWithValue(error.response.data);
      } else {
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);
