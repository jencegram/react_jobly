import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FormsCommonStyle.css';

/**
 * LoginForm component for user authentication.
 * @param {Object} props - The props object.
 * @param {Function} props.handleLogin - Function to handle login authentication.
 * @returns {JSX.Element} LoginForm component JSX.
 */

const LoginForm = ({ handleLogin }) => {
  // State initialization
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // Hook to get navigation object
  const navigate = useNavigate(); // Initialize useNavigate


  /**
   * Function to handle form input change.
   * @param {Object} e - Event object.
   * @param {Object} e.target - The event target.
   * @param {string} e.target.name - The name of the input field.
   * @param {string} e.target.value - The value of the input field.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

   /**
   * Function to handle form submission.
   * @param {Object} e - Event object.
   * @param {Function} e.preventDefault - Prevents default form submission behavior.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(formData);
      navigate('/'); // Redirect to homepage on successful login
    } catch (error) {

    }
  };

  // Component rendering
  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


export default LoginForm;