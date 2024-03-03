import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';
import UserContext from '../UserContext';

describe('Navigation', () => {
  const currentUser = { username: 'testuser' };
  const logout = jest.fn();

  it('renders navigation links correctly when logged in', () => {
    render(
      <UserContext.Provider value={{ currentUser }}>
        <MemoryRouter>
          <Navigation logout={logout} />
        </MemoryRouter>
      </UserContext.Provider>
    );

    expect(screen.getByText('Welcome, testuser')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Companies')).toBeInTheDocument();
    expect(screen.getByText('Jobs')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
  });

  it('renders navigation links correctly when logged out', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ currentUser: null }}>
          <Navigation logout={logout} />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.queryByText('Welcome, testuser')).not.toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.queryByText('Companies')).not.toBeInTheDocument();
    expect(screen.queryByText('Jobs')).not.toBeInTheDocument();
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});
