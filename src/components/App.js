import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import Navbar from './Navbar';
import Page404 from './Page404';
import Home from './Home';
import Login from './Login';
import Signup from './SignUp';
import { jwtDecode } from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import Settings from './Setting';

import { useLocation } from 'react-router-dom';
import UserProfile from './UserProfile';

const PrivateRoute = ({ children, isLoggedin }) => {
  const location = useLocation(); // ✅ Get current location

  return isLoggedin ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = jwtDecode(token);
        this.props.dispatch(
          authenticateUser({
            id: user.id, // Ensure this matches your token's structure
            name: user.name,
            email: user.email,
          }),
        );
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      }
    }
  }

  render() {
    const { posts, auth } = this.props;
    return (
      <Router>
        <div>
          <Navbar user={auth.user} />
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute isLoggedin={auth.isLoggedin}>
                  <Home posts={posts} />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/settings"
              element={
                <PrivateRoute isLoggedin={auth.isLoggedin}>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route
              path="/user"
              element={
                <PrivateRoute isLoggedin={auth.isLoggedin}>
                  <UserProfile />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth,
});

App.propTypes = {
  posts: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(App);
