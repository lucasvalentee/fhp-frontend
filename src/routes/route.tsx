import React from 'react';
import {
  Redirect,
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return <Component />;
        // return isPrivate === !!user ? (
        // ) : (
        //   <Redirect
        //     to={{
        //       pathname: isPrivate ? '/' : '/dashboard',
        //       state: { from: location },
        //     }}
        //   />
        // );
      }}
    />
  );
};

export default Route;
