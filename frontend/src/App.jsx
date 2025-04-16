import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router'
import useToken from './context/useToken';
import { ToastContainer } from 'react-toastify';

import { UserProvider } from './context/UserContext';
import Layout from './components/common/Layout';
import PrivateWrapper from './components/common/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';

import './App.css'
import { CssBaseline } from '@mui/material';

function App() {
  const { token, setToken, removeToken } = useToken();

  return (
    <UserProvider>
      <Router>
        <ToastContainer />

        <CssBaseline/>
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
  );
}

export default App
