import React from 'react';
import { Container, Typography, Grid, Paper, makeStyles } from '@material-ui/core';
import { Book, Map, Person, Search } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  icon: {
    fontSize: 48,
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  feature: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
}));

function Home() {
  const classes = useStyles();

  const features = [
    {
      title: 'Smart Search',
      description: 'Find books easily with our intelligent search system',
      icon: <Search className={classes.icon} />,
    },
    {
      title: 'Interactive Map',
      description: 'Locate books in the library with our interactive map',
      icon: <Map className={classes.icon} />,
    },
    {
      title: 'Book Management',
      description: 'Track your borrowed books and due dates',
      icon: <Book className={classes.icon} />,
    },
    {
      title: 'Personal Profile',
      description: 'Manage your preferences and reading history',
      icon: <Person className={classes.icon} />,
    },
  ];

  return (
    <Container className={classes.container}>
      <Typography variant="h3" component="h1" align="center" className={classes.title}>
        Welcome to Smart Library
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Your modern library management system
      </Typography>

      <Grid container spacing={4} style={{ marginTop: '2rem' }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper className={classes.paper} elevation={3}>
              {feature.icon}
              <Typography variant="h6" className={classes.feature}>
                {feature.title}
              </Typography>
              <Typography color="textSecondary" align="center">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home; 