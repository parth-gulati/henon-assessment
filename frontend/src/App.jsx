// App.jsx - This file is the main entry point of the React application.
// It sets up the routing and context providers for the application.
// It uses React Router for navigation and Material-UI for styling.

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router'
import { ToastContainer } from 'react-toastify';
import { CssBaseline } from '@mui/material';

import { UserProvider } from './context/UserContext';
import Layout from './components/common/Layout';
import PrivateWrapper from './components/common/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';

import useToken from './context/useToken';
import { useEffect } from 'react';
import { useLoading } from './context/LoadingContext';
import { setupInterceptors } from './api/axiosInstance';

function App() {
  const { token, setToken, removeToken } = useToken();
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setupInterceptors(setLoading);
  }, []);

  return (
    <>
    <UserProvider>
      <Router>
        <ToastContainer />

        <CssBaseline/>
        {/* Routing - using Browser Router */}
        <Routes>
          <Route element={<Layout token={token} removeToken={removeToken} />}>
            <Route element={<PrivateWrapper auth={{ token: token }} />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
            <Route path='/signin' element={<SignIn token={token} setToken={setToken} />} />
            <Route path='/signup' element={<SignUp token={token} setToken={setToken} />} />
            <Route path="/404" element={<NotFound/>} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
    </>
  );
}

export default App
