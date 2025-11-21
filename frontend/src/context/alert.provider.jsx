// AlertProvider.jsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { AlertContext } from './alert.contex'; // <-- importamos

export const AlertProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [alertData, setAlertData] = useState({ type: '', message: '' });

  const showAlert = (type, message) => {
    setAlertData({ type, message });
    setOpen(true);
  };

  const hideAlert = () => setOpen(false);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <Box sx={{ width: '40%', position: 'fixed', top: '10px', right: '370px' }}>
        <Collapse in={open}>
          <Alert
            severity={alertData.type}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={hideAlert}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {alertData.message}
          </Alert>
        </Collapse>
      </Box>
    </AlertContext.Provider>
  );
};
