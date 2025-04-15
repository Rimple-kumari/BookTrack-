import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  makeStyles,
} from '@material-ui/core';
import { Person, Security } from '@material-ui/icons';
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
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  divider: {
    margin: theme.spacing(4, 0),
  },
  section: {
    marginTop: theme.spacing(3),
  },
  icon: {
    marginRight: theme.spacing(1),
    verticalAlign: 'middle',
  },
}));

function Profile() {
  const classes = useStyles();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching profile');
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/profile',
        profile,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/profile/password',
        {
          current_password: passwords.currentPassword,
          new_password: passwords.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Password updated successfully');
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error('Error updating password');
    }
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
          <Person className={classes.icon} />
          Profile Settings
        </Typography>

        <form className={classes.form} onSubmit={handleUpdateProfile}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Name"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                disabled
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update Profile
          </Button>
        </form>

        <Divider className={classes.divider} />

        <Typography variant="h5" className={classes.section}>
          <Security className={classes.icon} />
          Change Password
        </Typography>

        <form className={classes.form} onSubmit={handleUpdatePassword}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Current Password"
                name="currentPassword"
                type="password"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update Password
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Profile; 