// ProtectedRoute.jsx - This file defines a protected route component for a React application.
// It checks if the user is authenticated and either renders the child components or redirects
//  to a sign-in page.

import { Outlet, Navigate } from "react-router";

const PrivateWrapper = ({ auth: { token } }) => {
    return !!token ? <Outlet /> : <Navigate to="/signin" />;
  };

export default PrivateWrapper;