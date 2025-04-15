import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import { QrCodeScanner } from '@material-ui/icons';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  shelf: {
    border: '1px solid #ccc',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: '#f5f5f5',
  },
  book: {
    border: '1px solid #ddd',
    padding: theme.spacing(1),
    margin: theme.spacing(0.5),
    backgroundColor: 'white',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e3f2fd',
    },
  },
  available: {
    borderLeft: '4px solid #4caf50',
  },
  borrowed: {
    borderLeft: '4px solid #f44336',
  },
  qrButton: {
    marginTop: theme.spacing(2),
  },
}));

function LibraryMap() {
  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [selectedShelf, setSelectedShelf] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleShelfClick = (shelfNumber) => {
    setSelectedShelf(shelfNumber);
  };

  const handleBookClick = (book) => {
    // Handle book click - could show details or navigate to book page
    console.log('Book clicked:', book);
  };

  const handleQrScan = (data) => {
    if (data) {
      // Handle QR code data - could be a book ID or location
      console.log('QR Code scanned:', data);
      setShowScanner(false);
    }
  };

  const handleScanError = (error) => {
    console.error('QR Code scan error:', error);
  };

  // Group books by shelf
  const booksByShelf = books.reduce((acc, book) => {
    if (book.location) {
      const shelf = book.location.shelf_number;
      if (!acc[shelf]) {
        acc[shelf] = [];
      }
      acc[shelf].push(book);
    }
    return acc;
  }, {});

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Library Map
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<QrCodeScanner />}
        className={classes.qrButton}
        onClick={() => setShowScanner(!showScanner)}
      >
        {showScanner ? 'Close Scanner' : 'Scan QR Code'}
      </Button>

      {showScanner && (
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            QR Code Scanner
          </Typography>
          {/* Add QR code scanner component here */}
        </Paper>
      )}

      <Grid container spacing={3}>
        {Object.entries(booksByShelf).map(([shelf, shelfBooks]) => (
          <Grid item xs={12} md={6} key={shelf}>
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                Shelf {shelf}
              </Typography>
              <div className={classes.shelf}>
                {shelfBooks.map((book) => (
                  <div
                    key={book.id}
                    className={`${classes.book} ${
                      book.is_available ? classes.available : classes.borrowed
                    }`}
                    onClick={() => handleBookClick(book)}
                  >
                    <Typography variant="body2">
                      {book.title}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Row {book.location.row_number}, Position {book.location.position}
                    </Typography>
                  </div>
                ))}
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default LibraryMap; 