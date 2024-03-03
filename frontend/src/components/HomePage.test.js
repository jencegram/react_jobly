import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import UserContext from '../UserContext';

describe('HomePage', () => {
  test('displays welcome back message for logged in user', () => {
    // Define a mock user
    const currentUser = { username: 'testuser' };

    render(
      <UserContext.Provider value={{ currentUser }}>
        <HomePage />
      </UserContext.Provider>
    );

    // Check for the personalized welcome back message
    expect(screen.getByText(`Welcome back, ${currentUser.username}!`)).toBeInTheDocument();
  });

  test('prompts to sign in or sign up when no user is logged in', () => {
    render(
      <UserContext.Provider value={{ currentUser: null }}>
        <HomePage />
      </UserContext.Provider>
    );

    // Check for the message prompting to sign in or sign up
    expect(screen.getByText(/Please sign in or sign up to continue./)).toBeInTheDocument();
  });
});
