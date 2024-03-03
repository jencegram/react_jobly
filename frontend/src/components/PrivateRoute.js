import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

/**
 * PrivateRoute component renders a Route that only allows access to authenticated users.
 * If the user is logged in, it renders the provided children components,
 * otherwise, it redirects the user to the login page.
 *
 * @param {object} props - Props for the PrivateRoute component.
 * @param {React.ReactNode} props.children - The child components to render if the user is authenticated.
 * @param {object} rest - Additional props passed to the Route component.
 * @returns {React.ReactNode} - Returns the Route component.
 */

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
          children
        ) : (
          <Navigate to="/login" state={{ from: location }} />
        )
      }
    />
  );
};

export default PrivateRoute;