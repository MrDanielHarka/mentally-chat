import { Navigate, createBrowserRouter } from 'react-router-dom';
import { App } from './features/App';
import { SignIn } from './features/sign-in/SignIn';
import { client } from './http/client';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    if (client.authentication != null) {
      setAuth(true);
    }

    client.authentication
      .reAuthenticate()
      .then((res) => {
        setAuth(res?.accessToken != null);
      })
      .catch(() => setAuth(false));
  }, []);

  if (auth == null) {
    return <div>Loading...</div>;
  } else if (auth === false) {
    return <Navigate to="/sign-in" />;
  }

  return children;
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
