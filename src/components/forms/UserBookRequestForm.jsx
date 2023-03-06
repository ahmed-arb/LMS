import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { toast } from "react-toastify";
import useHttp from "../../hooks/use-https";

const UserBookRequestForm = ({ defaultValue, handleClose }) => {
  const { sendRequest } = useHttp();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (defaultValue) {
      sendRequest(
        {
          url: `book_requests/${defaultValue.id}/`,
          method: "PUT",
          body: {
            book_name: data.get("book_name"),
          },
        },
        (data) => {
          toast.success("Book request updated successfully.");
          handleClose();
        }
      );
    } else {
      sendRequest(
        {
          url: "book_requests/",
          method: "POST",
          body: { book_name: data.get("book_name") },
        },
        (data) => {
          toast.success("Book request created successfully.");
          handleClose();
        }
      );
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
