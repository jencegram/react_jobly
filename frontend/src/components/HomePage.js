import React, { useContext } from 'react';
import UserContext from '../UserContext';
import '../styles/HomePage.css';

/**
 * HomePage Component
 * Renders the landing page for the Jobly application.
 * 
 * Context:
 * - Uses UserContext to access the current user's information.
 * 
 * Behavior:
 * - Displays a welcoming message to all visitors.
 * - If a user is logged in (detected through UserContext), displays a personalized welcome back message.
 * - If no user is logged in, prompts the visitor to sign in or sign up.
 */

const HomePage = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="home-page">
      <h1>Welcome to Jobly</h1>
      {currentUser ? (
        <p>Welcome back, {currentUser.username}!</p>
      ) : (
        <p>Please sign in or sign up to continue.</p>
      )}
    </div>
  );
};

export default HomePage;