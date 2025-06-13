// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InvoiceList from './pages/InvoiceList';
import NewInvoice from './pages/NewInvoice';
import InvoiceDetail from './pages/InvoiceDetail';
import Customers from './pages/Customers';
import Products from './pages/Products';
import Accounts from './pages/Accounts';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// นำเข้า NotificationProvider
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* NotificationProvider จะครอบ Router เพื่อให้ทุกหน้าเรียกใช้ Notifications ได้ */}
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/invoices" element={<InvoiceList />} />
            <Route path="/invoices/new" element={<NewInvoice />} />
            <Route path="/invoices/:id" element={<InvoiceDetail />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/accounts" element={<Accounts />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;