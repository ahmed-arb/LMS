import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { useSelector } from "react-redux";

import UserBookRequestForm from "../../components/forms/UserBookRequestForm";
import LibBookRequestForm from "../../components/forms/LibBookRequestForm";
import moment from "moment";
import useHttp from "../../hooks/use-https";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [defaultValue, setDefaultValue] = useState(null);
  const [reload, setReload] = useState(0);
  const [open, setOpen] = useState(false);

  const { sendRequest } = useHttp();

  const { userInfo } = useSelector((state) => state.user);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setDefaultValue(null);
    setOpen(false);
    setReload(Math.random());
  };

  useEffect(() => {
    sendRequest({ url: "book_requests/" }, (data) => {
      setRequests(data);
    });
  }, [reload, sendRequest]);
  return (
    <Grid
      sx={{
        marginTop: 8,
      }}
      container
      spacing={2}
    >
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Request a book
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {userInfo?.is_librarian && (
                  <TableCell align="right">User</TableCell>
                )}
                <TableCell>Book</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Reason</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {userInfo?.is_librarian && (
                    <TableCell align="right">{row.user}</TableCell>
                  )}
                  <TableCell component="th" scope="row">
                    {row.book_name}
                  </TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.reason ?? "N/A"}</TableCell>
                  <TableCell align="right">
                    {moment(row.created_at).format("ll")}
                  </TableCell>

                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setDefaultValue(row);
                        handleOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {userInfo?.is_librarian && defaultValue ? (
            <LibBookRequestForm
              defaultValue={defaultValue}
              handleClose={handleClose}
            />
          ) : (
            <UserBookRequestForm
              defaultValue={defaultValue}
              handleClose={handleClose}
            />
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default MyRequests;
