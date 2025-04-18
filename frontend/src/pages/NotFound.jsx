// NotFound.jsx - This file is a React component that renders a 404 Not Found page.
// It provides a link to navigate back to the home page.

import React from 'react';
import { Container, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router';

const NotFound = () => {

  const navigate = useNavigate();
  
  return (
  <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
  <Typography variant="h5">404 - Page Not Found</Typography>
  <Link component="button" onClick={()=>{navigate('/')}} style={{ marginTop: '20px', textDecoration: 'none', color: '#3f51b5', cursor: 'pointer' }}>
  Go Home
  </Link>
  </Container>
  )
};

export default NotFound;