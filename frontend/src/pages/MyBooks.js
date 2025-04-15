import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import { Book, Warning } from '@material-ui/icons';
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
  table: {
    minWidth: 650,
  },
  warning: {
    color: theme.palette.error.main,
    marginRight: theme.spacing(1),
  },
  returnButton: {
    marginRight: theme.spacing(1),
  },
}));

function MyBooks() {
  const classes = useStyles();
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBorrows();
  }, []);

  const fetchBorrows = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/my-books', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBorrows(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching borrowed books');
      setLoading(false);
    }
  };

  const handleReturn = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/books/${bookId}/return`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Book returned successfully');
      fetchBorrows();
    } catch (error) {
      toast.error('Error returning book');
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  if (loading) {
    return (
      <Container className={classes.container}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.title}>
          <Book style={{ marginRight: '10px', verticalAlign: 'bottom' }} />
          My Borrowed Books
        </Typography>

        {borrows.length === 0 ? (
          <Typography>You haven't borrowed any books yet.</Typography>
        ) : (
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Book Title</TableCell>
                  <TableCell>Borrow Date</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {borrows.map((borrow) => (
                  <TableRow key={borrow.id}>
                    <TableCell>{borrow.book.title}</TableCell>
                    <TableCell>
                      {new Date(borrow.borrow_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(borrow.due_date).toLocaleDateString()}
                      {isOverdue(borrow.due_date) && !borrow.return_date && (
                        <Warning className={classes.warning} />
                      )}
                    </TableCell>
                    <TableCell>
                      {borrow.return_date
                        ? 'Returned'
                        : isOverdue(borrow.due_date)
                        ? 'Overdue'
                        : 'Borrowed'}
                    </TableCell>
                    <TableCell>
                      {!borrow.return_date && (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.returnButton}
                          onClick={() => handleReturn(borrow.book_id)}
                        >
                          Return
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
}

export default MyBooks; 