import { Navigate } from 'react-router-dom';
import { userAuthStore } from '../store';

const UserRoute = ({ children }: { children: JSX.Element }) => {
  const userStore = userAuthStore();
  return userStore.cookieExists ? children : <Navigate to="/" replace />;
};

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const userStore = userAuthStore();
  return userStore.token.isAdmin === true ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export { UserRoute, AdminRoute };
