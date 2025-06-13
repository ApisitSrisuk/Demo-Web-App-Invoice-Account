// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
 palette: {
   mode: 'light',
   primary: {
     main: '#21209C', // น้ำเงินเข้มหลัก
     light: '#3F3EB2', // น้ำเงินอ่อนลง
     dark: '#141364',  // น้ำเงินเข้มขึ้น
     contrastText: '#fff', // ขาว (นี่คือสีสำหรับ Font และ Icon ที่เราต้องการใน Sidebar)
   },
   secondary: {
     main: '#FDB827', // เหลืองทอง
     light: '#FFD370',
     dark: '#E09C1A',
     contrastText: '#212121', // สีเทาเข้ม
   },
   background: {
     default: '#FFFFFF',    // สีขาวบริสุทธิ์
     paper: '#FFFFFF',      // สีขาวสำหรับ Card, Paper
   },
   text: {
     primary: '#212121',    // สีเทาเข้มเกือบดำ (สำหรับเนื้อหาหลัก)
     secondary: '#616161',  // สีเทากลาง (สำหรับเนื้อหาหลัก)
     disabled: '#BDBDBD',
   },
   divider: '#E0E0E0',
   success: {
     main: '#4CAF50',
     light: '#81C784',
     dark: '#388E3C',
     contrastText: '#fff',
   },
   warning: {
     main: '#FF9800',
     light: '#FFB74D',
     dark: '#F57C00',
     contrastText: '#fff',
   },
   error: {
     main: '#F44336',
     light: '#E57373',
     dark: '#D32F2F',
     contrastText: '#fff',
   },
   info: {
     main: '#2196F3',
     light: '#64B5F6',
     dark: '#1976D2',
     contrastText: '#fff',
   },
 },
 typography: {
   fontFamily: ['"Kanit"', 'Roboto', 'sans-serif'].join(','),
   h1: { fontSize: '3rem', fontWeight: 700, color: '#212121' },
   h2: { fontSize: '2.5rem', fontWeight: 600, color: '#212121' },
   h3: { fontSize: '2rem', fontWeight: 600, color: '#212121' },
   h4: { fontSize: '1.75rem', fontWeight: 500, color: '#212121' },
   h5: { fontSize: '1.5rem', fontWeight: 500, color: '#212121' },
   h6: { fontSize: '1.25rem', fontWeight: 500, color: '#212121' },
   body1: { fontSize: '1rem', color: '#212121' },
   body2: { fontSize: '0.875rem', color: '#616161' },
   button: { fontWeight: 600, textTransform: 'none' },
 },
 shape: {
   borderRadius: 12,
 },
 spacing: 8,
 components: {
   MuiButton: {
     styleOverrides: {
       root: {
         borderRadius: 8,
         boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
         transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
         '&:hover': {
           boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
           transform: 'translateY(-2px)',
         },
       },
       containedPrimary: {
         backgroundColor: '#21209C',
         '&:hover': {
           backgroundColor: '#141364',
         },
       },
       outlinedPrimary: {
         borderColor: '#21209C',
         color: '#21209C',
         '&:hover': {
           backgroundColor: 'rgba(33, 32, 156, 0.04)',
           borderColor: '#141364',
         },
       },
       containedSecondary: {
         backgroundColor: '#FDB827',
         color: '#212121',
         '&:hover': {
           backgroundColor: '#E09C1A',
         },
       },
     },
   },
   MuiAppBar: {
     styleOverrides: {
       root: ({ theme }) => ({
         backgroundColor: '#FFFFFF',
         color: '#212121',
         boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
         borderBottom: `1px solid ${theme.palette.divider}`,
       }),
     },
   },
   MuiDrawer: {
     styleOverrides: {
       paper: ({ theme }) => ({
         background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
         color: theme.palette.primary.contrastText, // สีเริ่มต้นของข้อความใน Drawer
         borderRight: 'none',
         boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
         // กำหนดสีขาวให้กับ ListItemIcon ที่อยู่ใน Drawer
         '& .MuiListItemButton-root .MuiListItemIcon-root': {
           color: theme.palette.primary.contrastText,
         },
         // กำหนดสีขาวให้กับ ListItemText ที่อยู่ใน Drawer
         '& .MuiListItemButton-root .MuiListItemText-primary': {
           color: theme.palette.primary.contrastText,
         },
         '& .MuiListItemButton-root .MuiListItemText-secondary': {
           color: theme.palette.primary.contrastText,
         },
       }),
     },
   },
   MuiListItemButton: {
     styleOverrides: {
       root: ({ theme }) => ({
         margin: theme.spacing(0.8, 0),
         paddingLeft: theme.spacing(3),
         color: theme.palette.primary.contrastText, // ยังคงสีขาวให้กับปุ่มใน Drawer
         transition: 'background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out',
         borderRadius: 0,
         '&:hover': {
           backgroundColor: 'rgba(255, 255, 255, 0.15)',
           color: theme.palette.primary.contrastText,
           transform: 'translateX(0)',
         },
         '&.Mui-selected': {
           backgroundColor: 'rgba(255, 255, 255, 0.25)',
           color: theme.palette.primary.contrastText,
           fontWeight: 600,
           boxShadow: '0 0px 0px rgba(0,0,0,0)',
           transform: 'translateX(0)',
           borderLeft: `4px solid ${theme.palette.secondary.main}`,
           borderRadius: 0,
           '& .MuiListItemIcon-root': {
             color: theme.palette.primary.contrastText,
           },
           '&:hover': {
               backgroundColor: 'rgba(255, 255, 255, 0.35)',
               color: theme.palette.primary.contrastText,
           }
         },
       }),
     },
   },
   MuiListItemIcon: {
       styleOverrides: {
           root: ({ theme }) => ({
               minWidth: 40,
               // color: theme.palette.primary.contrastText, // ถูกจัดการใน MuiDrawer แล้ว
           }),
       },
   },
   MuiListItemText: {
     styleOverrides: {
       primary: ({ theme }) => ({
         fontWeight: 500,
         fontSize: '1rem',
         // color: theme.palette.primary.contrastText, // ถูกจัดการใน MuiDrawer แล้ว
       }),
       secondary: ({ theme }) => ({
         // color: theme.palette.primary.contrastText, // ถูกจัดการใน MuiDrawer แล้ว
       }),
     },
   },
   MuiCard: {
     styleOverrides: {
       root: {
         boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.08)',
         borderRadius: 16,
       },
     },
   },
   MuiPaper: {
       styleOverrides: {
           root: {
               borderRadius: 12,
           }
       }
   },
   MuiOutlinedInput: {
     styleOverrides: {
       root: {
         borderRadius: 8,
         '& fieldset': {
           borderColor: '#E0E0E0',
         },
         '&:hover fieldset': {
           borderColor: '#9E9E9E',
         },
         '&.Mui-focused fieldset': {
           borderColor: '#21209C',
           borderWidth: '2px',
         },
       },
     },
   },
   MuiTableCell: {
     styleOverrides: {
       head: {
         fontWeight: 600,
         backgroundColor: '#E6E6F8',
         color: '#212121',
       },
       body: {
         fontSize: '0.9rem',
         color: '#212121',
       },
     },
   },
   MuiTypography: {
       styleOverrides: {
           h4: { color: '#212121' },
           h5: { color: '#212121' },
           h6: { color: '#212121' },
           body1: { color: '#212121' },
           body2: { color: '#616161' }
       }
   }
 },
});

export default theme;