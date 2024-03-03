import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navigation.css';
import UserContext from '../UserContext';

/**
 * Navigation Component
 * 
 * A navigation bar component that renders navigation links based on the user's authentication status.
 * If the user is logged in, it displays links to home, companies, jobs, profile, and a logout button.
 * If the user is logged out, it displays links to home, login, and sign up.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.logout - Function to handle logout action
 * @returns {JSX.Element} - Rendered navigation bar
 */
const Navigation = ({ logout }) => {
  // Access current user data from the UserContext
  const { currentUser } = useContext(UserContext);

  return (
    <nav>
      {/* Render "Welcome, user" before other navigation elements */}
      {currentUser && (
        <span className="nav-username">Welcome, {currentUser.username}</span>
      )}
      <NavLink className="nav-link" to="/">Home</NavLink>
      {/* Render these links only if a user is logged in */}
      {currentUser && (
        <>
          <NavLink className="nav-link" to="/companies">Companies</NavLink>
          <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
        </>
      )}
       {/* Render profile, logout, login, and sign up links based on user's authentication status */}
      {currentUser ? (
        <>
          <NavLink className="nav-link" to="/profile">Profile</NavLink>
          <button onClick={logout} className="nav-logout">Logout</button>
        </>
      ) : (
        <>
          <NavLink className="nav-link" to="/login">Login</NavLink>
          <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigation;