import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import './index.css'
import App from './App.jsx'
import { LoadingProvider } from './context/LoadingContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <LoadingProvider>
      <App />
      </LoadingProvider>
    </LocalizationProvider>
  </StrictMode>,
)
