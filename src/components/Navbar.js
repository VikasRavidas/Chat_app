import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import gif from './img/Tech4.gif';
import images from './img/images.png';
import search_icon from './img/search_icon.png';

class Navbar extends React.Component {
  logOut = () => {
    localStorage.removeItem('token'); // Remove token from storage
    this.props.dispatch(logoutUser()); // Dispatch logout action
  };

  render() {
    const { auth } = this.props;
    return (
      <nav className="nav">
        {/* Logo */}
        <div className="left-div">
          <Link to="/">
            <img src={gif} alt="logo" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <img className="search-icon" src={search_icon} alt="search-icon" />
          <input placeholder="Search" />

          {/* Dummy search results */}
          <div className="search-results">
            <ul>
              <li className="search-results-row">
                <img src={images} alt="user-dp" />
                <span>{auth.isLoggedin ? auth.user.name : 'Guest'}</span>
              </li>
              <li className="search-results-row">
                <img src={images} alt="user-dp" />
                <span>{auth.isLoggedin ? auth.user.name : 'Guest'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Navigation */}
        <div className="right-nav">
          {/* User Profile */}
          <div className="user">
            <Link to="/settings">
              <img src={images} alt="user-dp" id="user-dp" />
            </Link>
            <span>{auth.isLoggedin ? auth.user.name : 'Guest'}</span>
          </div>

          {/* Navigation Links */}
          <div className="nav-links">
            <ul>
              {!auth.isLoggedin && (
                <li>
                  <Link to="/login">Log in</Link>
                </li>
              )}

              {auth.isLoggedin && (
                <li onClick={this.logOut} style={{ cursor: 'pointer' }}>
                  Log out
                </li>
              )}

              {!auth.isLoggedin && (
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

// Map Redux state to component props
const mapStateToProps = (state) => ({
  auth: state.auth,
});

// Connect Navbar to Redux
export default connect(mapStateToProps)(Navbar);
