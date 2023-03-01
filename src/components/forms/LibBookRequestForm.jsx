import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextareaAutosize from "@mui/base/TextareaAutosize";

import axios from "axios";
import { toast } from "react-toastify";

const BookLoanForm = ({ defaultValue, handleClose }) => {
  const [status, setStatus] = useState(defaultValue?.status);
  const [reason, setReason] = useState(defaultValue?.reason);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/book_requests/${defaultValue.id}/`,
        {
        //   ...defaultValue,
          status,
          reason,
        }
      )
      .then(({ data }) => {
        toast.success("Book request updated successfully.");
        handleClose();
      })
      .catch((err) => {
        toast.error(err.detail);
      });
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
                value={status}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
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
              value={reason}
              disabled={status !== "rejected"}
              onChange={(event) => setReason(event.target.value)}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default BookLoanForm;
