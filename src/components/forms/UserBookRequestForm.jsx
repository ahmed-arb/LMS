import React, { useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import axios from "axios";
import { toast } from "react-toastify";

const UserBookRequestForm = ({ defaultValue, handleClose }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (defaultValue) {
      axios
        .put(
          `${process.env.REACT_APP_BACKEND_URL}/book_requests/${defaultValue.id}/`,
          {
            book_name: data.get("book_name"),
          }
        )
        .then(({ data }) => {
          toast.success("Book request updated successfully.");
          handleClose();
        })
        .catch((err) => {
          toast.error(err.detail);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/book_requests/`, {
          book_name: data.get("book_name"),
        })
        .then(({ data }) => {
          toast.success("Book request created successfully.");
          handleClose();
        })
        .catch((err) => {
          toast.error(err.detail);
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Request A Book
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="book_name"
              required
              fullWidth
              id="book_name"
              label="Book Name"
              defaultValue={defaultValue?.book_name}
              autoFocus
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Request
        </Button>
      </Box>
    </Box>
  );
};

export default UserBookRequestForm;
