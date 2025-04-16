import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router'
import useToken from './context/useToken';
import { ToastContainer } from 'react-toastify';

import { UserProvider } from './context/UserContext';
import Layout from './components/common/Layout';
import PrivateWrapper from './components/common/ProtectedRoute';
import Dashboard from './pages/Dashboard';

import './App.css'

function App() {
  const { token, setToken, removeToken } = useToken();

  return (
    <UserProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route element={<Layout token={token} removeToken={removeToken} />}>
            <Route element={<PrivateWrapper auth={{ token: token }} />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App
