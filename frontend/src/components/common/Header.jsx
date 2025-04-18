// Header.jsx - This file defines the header of the application.
// It includes the application title and a logout button.
// The logout button calls the logout function from the authentication API
// and removes the token from local storage.

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/authenticationApi';
import { useUser } from '../../context/UserContext';
import { toast } from "react-toastify";

const Header = ({ token, removeToken }) => {
  const navigate = useNavigate();
  const {logoutUser } = useUser();

  const handleLogout = async () => {
    const res = await logout();
    if (res.status == 200) {
      toast.success(res.data.message)
    }
    removeToken();
    logoutUser();
  };


  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
          Event Planner
        </Typography>
        {!!token && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
