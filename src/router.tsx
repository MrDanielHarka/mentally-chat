import { Navigate, createBrowserRouter } from 'react-router-dom';
import { SignIn } from './features/sign-in/SignIn';
import { App } from './features/app/App';
import { useAuth } from './state/auth/authReducer';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    auth.reauthenticate().then((isAuthenticated) => {
      setIsAuthenticated(isAuthenticated);
    });
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading....</p>;
  } else if (auth.isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/sign-in" />;
  }
};

export const router = createBrowserRouter([
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/',
    index: true,
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
]);
