import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import MyBooks from './pages/MyBooks';
import LibraryMap from './pages/LibraryMap';
import Profile from './pages/Profile';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <main style={{ padding: '20px', marginTop: '64px' }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/books" component={BookList} />
              <Route path="/books/:id" component={BookDetail} />
              <Route path="/my-books" component={MyBooks} />
              <Route path="/library-map" component={LibraryMap} />
              <Route path="/profile" component={Profile} />
            </Switch>
          </main>
          <ToastContainer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 