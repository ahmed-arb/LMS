import React, { useState } from "react";

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

import { toast } from "react-toastify";
import moment from "moment";
import { bookLoanStatusOptions } from "../../constants";
import useHttp from "../../hooks/use-https";

const BookLoanForm = ({ bookLoan, handleClose }) => {
  const [status, setStatus] = useState(null);
  const [dateBorrowed, setDateBorrowed] = useState(null);
  const [dateDue, setDateDue] = useState(null);
  const [dateReturned, setDateReturned] = useState(null);
  const { sendRequest, isLoading } = useHttp();

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest(
      {
        url: `loans/${bookLoan.id}/`,
        method: "PUT",
        body: {
          book: bookLoan.book.id,
          status: status ?? bookLoan.status,
          date_borrowed: dateBorrowed
            ? moment(dateBorrowed).format("YYYY-MM-DD")
            : bookLoan.date_borrowed,
          date_due: dateDue
            ? moment(dateDue).format("YYYY-MM-DD")
            : bookLoan.date_due,
          date_returned: dateReturned
            ? moment(dateReturned).format("YYYY-MM-DD")
            : bookLoan.date_returned,
        },
      },
      (data) => {
        toast.success("yay");
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
        Book Loan Form
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={status ?? bookLoan?.status}
                label="Status"
                onChange={handleStatusChange}
              >
                {bookLoanStatusOptions.map((option) => (
                  <MenuItem value={option.value}>{option.display}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Grid item xs={6}>
              <DesktopDatePicker
              
                label="Date Borrowed"
                inputFormat="MM/DD/YYYY"
                value={dateBorrowed ?? bookLoan?.date_borrowed}
                onChange={setDateBorrowed}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={6}>
              <DesktopDatePicker
                label="Date Due"
                inputFormat="MM/DD/YYYY"
                value={dateDue ?? bookLoan?.date_due}
                onChange={setDateDue}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={6}>
              <DesktopDatePicker
                label="Date Returned"
                inputFormat="MM/DD/YYYY"
                value={dateReturned ?? bookLoan?.date_returned}
                onChange={(value) => {
                  setDateReturned(value);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </LocalizationProvider>
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
