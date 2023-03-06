import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { useSelector } from "react-redux";

import BookLoanForm from "../../components/forms/BookLoanForm";
import { toast } from "react-toastify";
import useHttp from "../../hooks/use-https";

const MyBooks = () => {
  const [loans, setLoans] = useState([]);
  const [defaultValue, setDefaultValue] = useState(null);
  const [reload, setReload] = useState(0);
  const [open, setOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.user);
  const { sendRequest } = useHttp();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setReload(Math.random());
  };

  useEffect(() => {
    sendRequest(
      {
        url: "loans",
      },
      (data) => {
        setLoans(data);
      }
    );
  }, [reload, sendRequest]);

  const handleRemind = (id) => {
    sendRequest(
      {
        url: `loans/${id}/`,
      },
      (data) => {
        toast.success("Reminder email sent.");
      }
    );
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Book</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Loaned</TableCell>
              <TableCell align="right">Due</TableCell>
              <TableCell align="right">Returned</TableCell>
              {userInfo?.is_librarian && (
                <TableCell align="right">Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.book.name}
                </TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.date_borrowed}</TableCell>
                <TableCell align="right">{row.date_due}</TableCell>
                <TableCell align="right">
                  {row.date_returned ?? "N/A"}
                </TableCell>
                {userInfo?.is_librarian && (
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setDefaultValue(row);
                        handleOpen();
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemind(row.id)}
                    >
                      remind
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <BookLoanForm bookLoan={defaultValue} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MyBooks;
