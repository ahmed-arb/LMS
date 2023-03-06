import React, { useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";

import { toast } from "react-toastify";
import { bookRequestStatusOptions } from "../../constants";
import useHttp from "../../hooks/use-https";

const BookLoanForm = ({ defaultValue, handleClose }) => {
  const [status, setStatus] = useState(null);
  const [reason, setReason] = useState(null);
  const { sendRequest, isLoading } = useHttp();

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    sendRequest(
      {
        url: `book_requests/${defaultValue.id}/`,
        method: "PATCH",
        body: {
          status: status ?? defaultValue.status,
          reason: reason ?? defaultValue.reason,
        },
      },
      (data) => {
        toast.success("Book request updated successfully.");
        handleClose();
      }
    );
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
        Book Request
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={status ?? defaultValue?.status}
                label="Status"
                onChange={handleStatusChange}
              >
                {bookRequestStatusOptions.map((option) => (
                  <MenuItem value={option.value}>{option.display}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              required={status === "rejected"}
              aria-label="minimum height"
              minRows={10}
              placeholder="Reason for rejection"
              style={{ width: 400 }}
              value={reason ?? defaultValue?.reason}
              disabled={status !== "rejected"}
              onChange={(event) => setReason(event.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          disabled={isLoading}
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default BookLoanForm;
