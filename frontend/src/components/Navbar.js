import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  AccountCircle,
  LibraryBooks,
  Map,
  Home,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'white',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    marginLeft: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const isAuthenticated = localStorage.getItem('token');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to="/"
          >
            Smart Library
          </Typography>

          <Button
            color="inherit"
            component={Link}
            to="/"
            className={classes.link}
          >
            <Home className={classes.icon} />
            Home
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/books"
            className={classes.link}
          >
            <LibraryBooks className={classes.icon} />
            Books
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/library-map"
            className={classes.link}
          >
            <Map className={classes.icon} />
            Library Map
          </Button>

          {isAuthenticated ? (
            <>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  component={Link}
                  to="/my-books"
                  onClick={handleClose}
                >
                  My Books
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleClose}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                className={classes.link}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                className={classes.link}
              >
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar; 