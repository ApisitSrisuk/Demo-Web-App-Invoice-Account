// src/components/Layout.js
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  useTheme,
  IconButton,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 260;

const Layout = ({ children }) => {
  const location = useLocation();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false); // State for mobile drawer

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // ข้อมูลเมนูสำหรับ Sidebar
  const menuItems = [
    { text: 'ภาพรวม', icon: <DashboardIcon />, path: '/' },
    { text: 'ใบแจ้งหนี้', icon: <ReceiptIcon />, path: '/invoices' },
    { text: 'สร้างใบแจ้งหนี้ใหม่', icon: <AddCircleOutlineIcon />, path: '/invoices/new' },
    { text: 'ลูกค้า', icon: <PeopleIcon />, path: '/customers' },
    { text: 'สินค้า/บริการ', icon: <ShoppingCartIcon />, path: '/products' },
    { text: 'ระบบบัญชี', icon: <AccountBalanceWalletIcon />, path: '/accounts' },
  ];

  const drawerContent = (
    <Box>
      {/* โลโก้หรือชื่อระบบใน Drawer */}
      <Toolbar
        sx={{
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '64px',
          mb: 1,
        }}
      >
        <Typography variant="h5" noWrap component="div" fontWeight={700}>
          InvoicePro
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

      {/* รายการเมนูหลัก */}
      <List sx={{ pt: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            selected={
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path)
            }
            onClick={mobileOpen ? handleDrawerToggle : undefined} // ปิด Drawer บน Mobile เมื่อคลิกเมนู
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` }, // บน desktop/tablet, width จะหดลง
          ml: { sm: `${drawerWidth}px` }, // บน desktop/tablet, margin-left เท่ากับ drawerWidth
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          {/* Hamburger Icon สำหรับ Mobile */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }} // แสดงเฉพาะบนหน้าจอเล็กกว่า sm
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div" fontWeight={600}>
            {menuItems.find(item =>
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path)
            )?.text || 'ภาพรวม'} {/* Fallback text ถ้าหาไม่เจอ */}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer สำหรับ Mobile และ Desktop */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="main navigation folders"
      >
        {/* Drawer สำหรับ Mobile (temporary) */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Optimizes open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' }, // แสดงเฉพาะบนหน้าจอเล็กกว่า sm
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Drawer สำหรับ Desktop (permanent) */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' }, // แสดงเฉพาะบนหน้าจอตั้งแต่ sm ขึ้นไป
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open // Permanent drawer should always be open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }, // บน desktop/tablet, width จะหดลง
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
        }}
      >
        <Toolbar /> {/* ใช้ Toolbar เป็น Spacer สำหรับ AppBar */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;