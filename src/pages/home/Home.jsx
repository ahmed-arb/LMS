import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Home = () => {
  const [books, setBooks] = useState([]);
  const { authToken } = useSelector((state) => state.user);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/books`).then(({ data }) => {
      setBooks(data);
    });
  }, []);

  const handleLoan = (bookId) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/loans/`, {
        book: bookId,
        status: "requested",
      })
      .then(({ data }) => {
        toast.success(
          'Book loan successful. You can track your loan in "Book Loans".'
        );
      })
      .catch((err) => {
        toast.error(err.msg);
      });
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
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {books.map((item) => (
          <Grid item xs={2} sm={4} md={4} key={item.id}>
            <Card sx={{ maxWidth: 300 }}>
              <CardMedia
                sx={{ height: 200 }}
                image={item.cover}
                title={item.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.author} - {item.publisher} - {item.stock} available
                </Typography>
              </CardContent>
              <CardActions>
                {authToken && (
                  <Button
                    disabled={item.stock === 0}
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => handleLoan(item.id)}
                  >
                    Loan
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
