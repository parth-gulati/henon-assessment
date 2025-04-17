import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsv3';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <App />
    </LocalizationProvider>
  </StrictMode>,
)
