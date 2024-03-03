import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/FormsCommonStyle.css';

/**
 * SignupForm component renders a form for user registration.
 * It allows users to input their username, password, first name, last name, and email.
 * Upon submission, it invokes the handleSignup function provided as a prop.
 * After successful registration, it redirects the user to the homepage.
 *
 * @component
 * @param {object} props - Props for the SignupForm component.
 * @param {Function} props.handleSignup - Function to handle user registration.
 * @returns {JSX.Element} - SignupForm component.
 */


const SignupForm = ({ handleSignup }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  });
  const navigate = useNavigate(); // Initialize useNavigate

  /**
   * handleChange updates the form data state when input values change.
   *
   * @param {object} e - Event object representing the input change event.
   * @returns {void}
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  /**
   * handleSubmit handles the form submission.
   * It invokes the handleSignup function with the form data and redirects to the homepage on successful registration.
   *
   * @param {object} e - Event object representing the form submission event.
   * @returns {void}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSignup(formData);
      navigate('/'); // Redirect to homepage on successful signup
    } catch (error) {
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;