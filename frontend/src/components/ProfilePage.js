// src/ProfilePage.js
import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../UserContext';
import JoblyApi from '../api';
import '../styles/FormsCommonStyle.css';

/**
 * ProfilePage component renders a form to edit user profile information.
 * Users can update their first name, last name, email, and password.
 * Upon submission, it invokes the handleSignup function provided as a prop.
 *
 * @component
 * @returns {JSX.Element} ProfilePage component.
 */
const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    email: currentUser.email || "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // Populate form with current user data
    setFormData({
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      email: currentUser.email || "",
      password: "",
    });
  }, [currentUser]);

  /**
   * Handles input change events and updates the form data state accordingly.
   * @param {Event} evt - The input change event.
   */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  /**
   * Handles form submission by sending updated user data to the server.
   * Upon success, updates the current user state and clears any errors.
   * Upon failure, logs the error and updates the errors state.
   * @param {Event} evt - The form submission event.
   */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const updatedUser = await JoblyApi.updateUser(currentUser.username, formData);
      setCurrentUser(updatedUser);
      setErrors([]);
    } catch (err) {
      console.error("Update Profile Error:", err);
      setErrors(err instanceof Array ? err : [err.toString()]);
    }
  };

  return (
    <div className="form-container">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm password to make changes:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {errors.length > 0 && (
          <div className="form-errors">
            {errors.map(error => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <button type="submit" className="form-button">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfilePage;