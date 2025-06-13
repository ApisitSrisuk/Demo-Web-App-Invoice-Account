// src/contexts/NotificationContext.js
import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

// 1. สร้าง Context
const NotificationContext = createContext();

// 2. สร้าง Custom Hook เพื่อให้เรียกใช้ได้ง่ายขึ้น
export const useNotification = () => {
  return useContext(NotificationContext);
};

// 3. สร้าง Notification Provider Component
export const NotificationProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success'); // 'success', 'error', 'warning', 'info'

  // ฟังก์ชันสำหรับแสดง Notification
  const showNotification = (msg, type = 'success') => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  };

  // ฟังก์ชันสำหรับปิด Notification
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const contextValue = {
    showNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {/* Snackbar Component ที่จะแสดง Notification จริงๆ */}
      <Snackbar
        open={open}
        autoHideDuration={4000} // แสดง 4 วินาที
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // ตำแหน่งด้านบนกลาง
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};