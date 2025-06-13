// src/pages/Accounts.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../components/Layout';
import { useTheme } from '@mui/material/styles';

// นำเข้า useNotification custom hook สำหรับ Global Notifications
import { useNotification } from '../contexts/NotificationContext';

// ข้อมูลจำลองสำหรับตัวอย่าง
const dummyInvoices = [
  { id: 'INV001', customer: 'ลูกค้า ก', date: '2024-05-01', total: 12000.0, status: 'Paid', type: 'invoice' },
  { id: 'INV004', customer: 'ลูกค้า ก', date: '2024-05-20', total: 25000.0, status: 'Paid', type: 'invoice' },
  { id: 'INV005', customer: 'ลูกค้า ง', date: '2024-06-01', total: 5000.0, status: 'Paid', type: 'invoice' },
];

const dummyExpenses = [
  { id: 'EXP001', description: 'ค่าเช่าสำนักงาน', amount: 8000.0, date: '2024-06-05', category: 'ค่าใช้จ่ายสำนักงาน' },
  { id: 'EXP002', description: 'เงินเดือนพนักงาน (มิ.ย.)', amount: 35000.0, date: '2024-06-10', category: 'ค่าจ้างและเงินเดือน' },
  { id: 'EXP003', description: 'ค่าการตลาดออนไลน์', amount: 5000.0, date: '2024-06-12', category: 'ค่าการตลาด' },
];

// ฟังก์ชันสำหรับจัดรูปแบบสกุลเงินบาท
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
  }).format(amount);
};

// ฟังก์ชันสำหรับจัดรูปแบบวันที่
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' });
};

const Accounts = () => {
  const theme = useTheme();
  // เรียกใช้ Custom Hook เพื่อเข้าถึง showNotification
  const { showNotification } = useNotification();

  const [tabIndex, setTabIndex] = useState(0);
  const [expenses, setExpenses] = useState(dummyExpenses);
  const [incomes, setIncomes] = useState(dummyInvoices);

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    category: '',
  });

  const expenseCategories = [
    { value: 'ค่าใช้จ่ายสำนักงาน', label: 'ค่าใช้จ่ายสำนักงาน' },
    { value: 'ค่าจ้างและเงินเดือน', label: 'ค่าจ้างและเงินเดือน' },
    { value: 'ค่าการตลาด', label: 'ค่าการตลาด' },
    { value: 'ค่าสาธารณูปโภค', label: 'ค่าสาธารณูปโภค' },
    { value: 'อื่นๆ', label: 'อื่นๆ' },
  ];

  // คำนวณยอดรวม
  const totalIncome = incomes.reduce((sum, item) => sum + item.total, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const netProfit = totalIncome - totalExpense;

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleNewExpenseChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.description || !newExpense.amount || !newExpense.category) {
      // ใช้ showNotification แทน alert()
      showNotification('กรุณากรอกข้อมูลรายจ่ายให้ครบถ้วน', 'error');
      return;
    }
    // ตรวจสอบว่า amount เป็นตัวเลขและมากกว่า 0
    const amountValue = parseFloat(newExpense.amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      showNotification('จำนวนเงินต้องเป็นตัวเลขที่มากกว่า 0', 'error');
      return;
    }

    const newId = `EXP${(expenses.length + 1).toString().padStart(3, '0')}`;
    const expenseToAdd = {
      ...newExpense,
      id: newId,
      amount: amountValue, // ใช้ค่าที่แปลงเป็น float แล้ว
    };
    setExpenses((prev) => [...prev, expenseToAdd]);
    setNewExpense({
      description: '',
      amount: '',
      date: new Date().toISOString().slice(0, 10),
      category: '',
    });
    // ใช้ showNotification แทน alert()
    showNotification('บันทึกรายจ่ายเรียบร้อยแล้ว!', 'success');
  };


  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        ระบบบัญชี
      </Typography>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                รายรับรวม
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.success.dark }}>
                {formatCurrency(totalIncome)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                รายจ่ายรวม
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.error.dark }}>
                {formatCurrency(totalExpense)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                กำไรสุทธิ
              </Typography>
              <Typography variant="h4" sx={{ color: netProfit >= 0 ? theme.palette.success.dark : theme.palette.error.dark }}>
                {formatCurrency(netProfit)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="account tabs" sx={{ mb: 3 }}>
          <Tab label="รายการรายรับ" />
          <Tab label="รายการรายจ่าย" />
          <Tab label="บันทึกรายจ่ายใหม่" />
        </Tabs>

        {/* Tab 1: รายการรายรับ */}
        {tabIndex === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              รายการรายรับ (จากใบแจ้งหนี้ที่ชำระแล้ว)
            </Typography>
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: theme.palette.divider }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>เลขที่ใบแจ้งหนี้</TableCell>
                    <TableCell>ลูกค้า</TableCell>
                    <TableCell>วันที่ชำระ</TableCell>
                    <TableCell align="right">ยอดรวม</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incomes.length > 0 ? (
                    incomes.map((income) => (
                      <TableRow key={income.id}>
                        <TableCell>{income.id}</TableCell>
                        <TableCell>{income.customer}</TableCell>
                        <TableCell>{formatDate(income.date)}</TableCell>
                        <TableCell align="right">{formatCurrency(income.total)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">ไม่มีรายการรายรับ</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Tab 2: รายการรายจ่าย */}
        {tabIndex === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              รายการรายจ่าย
            </Typography>
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: theme.palette.divider }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>รหัส</TableCell>
                    <TableCell>คำอธิบาย</TableCell>
                    <TableCell>หมวดหมู่</TableCell>
                    <TableCell>วันที่</TableCell>
                    <TableCell align="right">จำนวนเงิน</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenses.length > 0 ? (
                    expenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>{expense.id}</TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell>{formatDate(expense.date)}</TableCell>
                        <TableCell align="right">{formatCurrency(expense.amount)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">ไม่มีรายการรายจ่าย</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Tab 3: บันทึกรายจ่ายใหม่ */}
        {tabIndex === 2 && (
          <Box component="form" onSubmit={handleAddExpense} sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              บันทึกรายจ่ายใหม่
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="คำอธิบาย"
                  name="description"
                  value={newExpense.description}
                  onChange={handleNewExpenseChange}
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="จำนวนเงิน"
                  name="amount"
                  type="number"
                  value={newExpense.amount}
                  onChange={handleNewExpenseChange}
                  fullWidth
                  required
                  variant="outlined"
                  inputProps={{ step: "0.01", min: 0 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="หมวดหมู่"
                  name="category"
                  value={newExpense.category}
                  onChange={handleNewExpenseChange}
                  fullWidth
                  required
                  variant="outlined"
                >
                  {expenseCategories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="วันที่"
                  name="date"
                  type="date"
                  value={newExpense.date}
                  onChange={handleNewExpenseChange}
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  size="large"
                >
                  บันทึกรายจ่าย
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Layout>
  );
};

export default Accounts;