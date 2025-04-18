// src/components/GlobalLoader.jsx
import { Backdrop, CircularProgress, Box } from '@mui/material';
import {useLoading} from '../../context/LoadingContext.jsx';
import { useEffect } from 'react';

const GlobalLoader = () => {
    const { loading } = useLoading();
  
    if (!loading) return null;
  
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(3px)',
          zIndex: 13000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: '0.3s ease-in-out',
        }}
      >
        <CircularProgress color='#ffffff' size={60} thickness={5} />
      </Box>
    );
  };
  
  export default GlobalLoader;
  