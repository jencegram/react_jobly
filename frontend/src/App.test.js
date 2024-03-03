import { render, screen } from '@testing-library/react';
import App from './App';
import UserContext from './UserContext';

/**
 * This file contains tests for the App component
 * Utilizes jest to mock dependencies and the UserContent
 * for providing a test user environment
 */

// Mock UserContext with a test user and an empty list of applications
const mockCurrentUser = {
  username: 'testuser',
  applications: []
};

/**
 * Mocking axios module to intercept calls and provide 
 * fake responses without making actual HTTP requests.
 */
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    defaults: {
      headers: {
        common: {}
      }
    }
  }))
}));

/**
 * Test checks if "Welcome to Jobly" message is rendered
 * It renders the App component within the UserContext.Provider to 
 * simulate a logged-in user
 */

test('renders welcome message', () => {
  render(
    <UserContext.Provider value={{ currentUser: mockCurrentUser }}>
      <App />
    </UserContext.Provider>
  );

  // Check for a specific element in  App component
  const welcomeElement = screen.getByText(/Welcome to Jobly/i);
  expect(welcomeElement).toBeInTheDocument();
});
