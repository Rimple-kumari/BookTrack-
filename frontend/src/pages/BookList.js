import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  searchContainer: {
    marginBottom: theme.spacing(4),
  },
  searchField: {
    marginRight: theme.spacing(2),
  },
  filterField: {
    minWidth: 200,
    marginRight: theme.spacing(2),
  },
}));

function BookList() {
  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.map(book => book.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === '' || book.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container className={classes.container}>
      <div className={classes.searchContainer}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              className={classes.searchField}
              label="Search Books"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
            />
          </Grid>
          <Grid item>
            <FormControl variant="outlined" className={classes.filterField}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={handleCategoryChange}
                label="Category"
              >
                <MenuItem value="">
                  <em>All Categories</em>
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>

      <Grid container spacing={4}>
        {filteredBooks.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {book.title}
                </Typography>
                <Typography>
                  Author: {book.author}
                </Typography>
                <Typography>
                  Category: {book.category}
                </Typography>
                <Typography>
                  Status: {book.is_available ? 'Available' : 'Borrowed'}
                </Typography>
                {book.location && (
                  <Typography>
                    Location: {book.location.shelf_number}-{book.location.row_number}-{book.location.position}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={`/books/${book.id}`}
                >
                  View Details
                </Button>
                {book.is_available && (
                  <Button
                    size="small"
                    color="secondary"
                    component={Link}
                    to={`/books/${book.id}/borrow`}
                  >
                    Borrow
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default BookList; 