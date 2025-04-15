import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  register: {
    marginTop: theme.spacing(2),
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful!');
      history.push('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Container component="main" className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Typography
            variant="body2"
            align="center"
            className={classes.register}
          >
            Don't have an account?{' '}
            <Link to="/register">Register here</Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
}

export default Login; 