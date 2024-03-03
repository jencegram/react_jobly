/**
 * Main application component for the Jobly app.
 * It sets up routing for the entire application and manages user authentication state.
 */

// React and related hooks and router imports
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importing utility functions and custom hooks
import { jwtDecode } from 'jwt-decode';
import useLocalStorage from './useLocalStorage';

// Context imports
import UserContext from './UserContext';

// Component imports
import HomePage from './components/HomePage';
import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import JobsList from './components/JobsList';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ProfilePage from './components/ProfilePage';
import Navigation from './components/Navigation';

// API utility import
import JoblyApi from './api';


/**
 * A wrapper for routes that require user authentication.
 * Redirects to the login page if the user is not authenticated.
 *
 * @param {ReactNode} children - The components to be rendered within the private route.
 * @returns {ReactNode} - A Route or Redirect component depending on the authentication status.
 */

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  return currentUser ? children : <Navigate to="/login" />;
};

/**
 * The main application component that manages routes and user state.
 *
 * @returns {ReactNode} The main router of the application.
 */

function App() {
  // State hooks for managing user token and details
  const [token, setToken] = useLocalStorage("jobly-token");
  const [currentUser, setCurrentUser] = useState(null);

  // Fetches the current user details from the API if a token is present
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (token) {
        try {
          JoblyApi.token = token;
          const decoded = jwtDecode(token);
          const currentUserDetails = await JoblyApi.getCurrentUser(decoded.username);
          const applications = currentUserDetails.applications || [];
          setCurrentUser({ ...currentUserDetails, applications });
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
    };
    fetchCurrentUser();
  }, [token]);

  // Handlers for user authentication actions

  const handleLogin = async (formData) => {
    try {
      const tokenResponse = await JoblyApi.login(formData);
      setToken(tokenResponse);
      const decoded = jwtDecode(tokenResponse);
      const currentUserDetails = await JoblyApi.getCurrentUser(decoded.username);
      setCurrentUser(currentUserDetails);
    } catch (errors) {
      console.error("login failed", errors);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  const handleSignup = async (formData) => {
    try {
      const tokenResponse = await JoblyApi.signup(formData);
      setToken(tokenResponse);
      const decoded = jwtDecode(tokenResponse);
      const currentUserDetails = await JoblyApi.getCurrentUser(decoded.username);
      setCurrentUser(currentUserDetails);
    } catch (errors) {
      console.error("signup failed", errors);
    }
  };

  // Function to manage job applications for the authenticated user
  const handleJobApplication = async (jobId) => {
    if (currentUser && !currentUser.applications.includes(jobId)) {
      try {
        await JoblyApi.applyToJob(currentUser.username, jobId);
        setCurrentUser({
          ...currentUser,
          applications: [...currentUser.applications, jobId],
        });
      } catch (err) {
        console.error("Applying to job failed:", err);
      }
    }
  };

  // Router setup with UserContext provider for user state management
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, handleJobApplication }}>
      <Router>
        <Navigation logout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/companies" element={<PrivateRoute><CompanyList /></PrivateRoute>} />
          <Route path="/companies/:handle" element={<PrivateRoute><CompanyDetail /></PrivateRoute>} />
          <Route path="/jobs" element={<PrivateRoute><JobsList /></PrivateRoute>} />
          <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupForm handleSignup={handleSignup} />} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;