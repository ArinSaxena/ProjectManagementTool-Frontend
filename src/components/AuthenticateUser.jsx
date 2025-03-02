import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

export const AuthenticationWrapper = ({ children, protect, role }) => {
  const user = useSelector((state) => state.auth.userData);

  // ✅ If authentication is required but user is not logged in
  if (protect && !user) {
    return <Navigate to="/" />;
  }

  // ✅ If user role doesn't match the required role
  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.userData);

  if (user) {
    const roleBasedRedirect = {
      admin: "/dashboard/admin",
      projectmanager: "/dashboard/projectmanager",
      user: "/dashboard/user",
    };
    return <Navigate to={roleBasedRedirect[user?.role]} replace />;
  }
  return children;
};

export const AuthenticateAdmin = ({ children }) => {
  return (
    <AuthenticationWrapper protect={true} role="admin">
      {children}
    </AuthenticationWrapper>
  );
};

export const AuthenticateManager = ({ children }) => {
  return (
    <AuthenticationWrapper protect={true} role="projectmanager">
      {children}
    </AuthenticationWrapper>
  );
};

export const AuthenticateUser = ({ children }) => {
  return (
    <AuthenticationWrapper protect={true} role="user">
      {children}
    </AuthenticationWrapper>
  );
};
