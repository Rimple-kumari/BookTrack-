import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Chip,
  makeStyles,
} from '@material-ui/core';
import {
  Book as BookIcon,
  LocationOn,
  Timer,
  Category,
} from '@material-ui/icons';
import { toast } from 'react-toastify';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
  locationBox: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
  },
  icon: {
    marginRight: theme.spacing(1),
    verticalAlign: 'middle',
  },
}));

function BookDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/${id}`);
      setBook(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching book details');
      setLoading(false);
    }
  };

  const handleBorrow = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        history.push('/login');
        return;
      }

      await axios.post(
        `http://localhost:5000/api/books/${id}/borrow`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success('Book borrowed successfully');
      fetchBook();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error borrowing book');
    }
  };

  if (loading) {
    return (
      <Container className={classes.container}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container className={classes.container}>
        <Typography>Book not found</Typography>
      </Container>
    );
  }

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.title}>
              <BookIcon className={classes.icon} />
              {book.title}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              by {book.author}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Chip
              icon={<Category />}
              label={book.category}
              className={classes.chip}
              color="primary"
            />
            <Chip
              icon={<Timer />}
              label={book.is_available ? 'Available' : 'Borrowed'}
              className={classes.chip}
              color={book.is_available ? 'primary' : 'secondary'}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1" paragraph>
              {book.description}
            </Typography>
          </Grid>

          {book.location && (
            <Grid item xs={12}>
              <div className={classes.locationBox}>
                <Typography variant="h6">
                  <LocationOn className={classes.icon} />
                  Location
                </Typography>
                <Typography>
                  Shelf: {book.location.shelf_number}
                  <br />
                  Row: {book.location.row_number}
                  <br />
                  Position: {book.location.position}
                </Typography>
              </div>
            </Grid>
          )}

          <Grid item xs={12}>
            {book.is_available ? (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleBorrow}
              >
                Borrow Book
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled
                className={classes.button}
              >
                Currently Borrowed
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => history.goBack()}
            >
              Back to List
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default BookDetail; 