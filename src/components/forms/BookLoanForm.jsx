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
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const BookLoanForm = ({ bookLoan, handleClose }) => {
  const [status, setStatus] = useState("");
  const [dateBorrowed, setDateBorrowed] = useState(null);
  const [dateDue, setDateDue] = useState(null);
  const [dateReturned, setDateReturned] = useState(null);

  useEffect(() => {
    console.log(bookLoan);
    setStatus(bookLoan.status);
    setDateBorrowed(bookLoan.date_borrowed);
    setDateDue(bookLoan.date_due);
    setDateReturned(bookLoan.date_returned);
  }, [bookLoan]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/loans/${bookLoan.id}/`, {
        book: bookLoan.book.id,
        status: status,
        date_borrowed: moment(dateBorrowed).format("YYYY-MM-DD"),
        date_due:  moment(dateDue).format("YYYY-MM-DD"),
        date_returned: moment(dateReturned).format("YYYY-MM-DD"),
      })
      .then(({ data }) => {
        toast.success("Book loan updated successfully.");
      })
      .catch((err) => {
        toast.error(err.msg);
      });
      handleClose()
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
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                <MenuItem value="requested">Requested</MenuItem>
                <MenuItem value="issued">Issued</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
                <MenuItem value="returned">Returned</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Grid item xs={6}>
              <DesktopDatePicker
                label="Date Borrowed"
                inputFormat="MM/DD/YYYY"
                value={dateBorrowed}
                onChange={setDateBorrowed}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={6}>
              <DesktopDatePicker
                label="Date Due"
                inputFormat="MM/DD/YYYY"
                value={dateDue}
                onChange={setDateDue}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={6}>
              <DesktopDatePicker
                label="Date Returned"
                inputFormat="MM/DD/YYYY"
                value={dateReturned}
                onChange={(value) => {
                  setDateReturned(value);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </LocalizationProvider>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default BookLoanForm;
