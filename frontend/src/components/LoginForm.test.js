import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { act } from 'react-dom/test-utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('LoginForm', () => {
  it('calls handleLogin prop on form submission', async () => {
    const handleLogin = jest.fn().mockResolvedValueOnce({});

    render(
      <MemoryRouter>
        <LoginForm handleLogin={handleLogin} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testpassword' } });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.submit(screen.getByText('Submit'));
      await waitFor(() => {
        expect(handleLogin).toHaveBeenCalledWith({
          username: 'testuser',
          password: 'testpassword'
        });
      });
    });
  });

  it('redirects to homepage on successful login', async () => {
    const handleLogin = jest.fn().mockResolvedValueOnce({});
    const navigate = jest.fn();

    useNavigate.mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <LoginForm handleLogin={handleLogin} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testpassword' } });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.submit(screen.getByText('Submit'));
      await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith('/');
      });
    });
  });
});
