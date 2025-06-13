// src/pages/NewInvoice.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Layout from '../components/Layout';

// นำเข้า useNotification custom hook สำหรับ Global Notifications
import { useNotification } from '../contexts/NotificationContext';

// ฟังก์ชันสำหรับจัดรูปแบบสกุลเงินบาท
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
  }).format(amount);
};

const NewInvoice = () => {
  // เรียกใช้ Custom Hook เพื่อเข้าถึง showNotification
  const { showNotification } = useNotification();

  const [customer, setCustomer] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState([
    { id: 1, description: '', quantity: 1, unitPrice: 0 },
  ]);

  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      { id: prevItems.length + 1, description: '', quantity: 1, unitPrice: 0 },
    ]);
  };

  const handleRemoveItem = (id) => {
    // ป้องกันการลบรายการทั้งหมด (ต้องมีอย่างน้อย 1 รายการ)
    if (items.length === 1) {
      showNotification('ต้องมีรายการสินค้า/บริการอย่างน้อย 1 รายการ', 'warning');
      return;
    }
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleItemChange = (
    id,
    field,
    value
  ) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // ตัวอย่างการตรวจสอบความถูกต้องของข้อมูลก่อนบันทึก
    if (!customer || !invoiceDate || items.some(item => !item.description || item.quantity <= 0 || item.unitPrice < 0)) {
        showNotification('โปรดกรอกข้อมูลให้ครบถ้วนและถูกต้อง', 'error');
        return;
    }

    console.log({ customer, invoiceDate, dueDate, items, total: calculateTotal() });

    // ใช้ showNotification แทน alert()
    showNotification('สร้างใบแจ้งหนี้เรียบร้อยแล้ว!', 'success'); // ข้อความแจ้งเตือนสำเร็จ

    // รีเซ็ตฟอร์มหลังจากบันทึก
    setCustomer('');
    setInvoiceDate(new Date().toISOString().slice(0, 10));
    setDueDate('');
    setItems([{ id: 1, description: '', quantity: 1, unitPrice: 0 }]);
  };

  const customers = [
    { value: 'ลูกค้า ก', label: 'ลูกค้า ก' },
    { value: 'ลูกค้า ข', label: 'ลูกค้า ข' },
    { value: 'ลูกค้า ค', label: 'ลูกค้า ค' },
  ];

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        สร้างใบแจ้งหนี้ใหม่
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="ลูกค้า"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                fullWidth
                required
                variant="outlined"
              >
                {customers.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="วันที่ออกใบแจ้งหนี้"
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="วันครบกำหนดชำระ"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              รายการสินค้า/บริการ
            </Typography>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>คำอธิบาย</TableCell>
                    <TableCell align="right">จำนวน</TableCell>
                    <TableCell align="right">ราคาต่อหน่วย</TableCell>
                    <TableCell align="right">รวม</TableCell>
                    <TableCell align="center">จัดการ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <TextField
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(item.id, 'description', e.target.value)
                          }
                          fullWidth
                          variant="standard"
                          placeholder="เช่น พัฒนาเว็บไซต์, ค่าออกแบบ"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)
                          }
                          fullWidth
                          variant="standard"
                          inputProps={{ min: 1 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)
                          }
                          fullWidth
                          variant="standard"
                          inputProps={{ step: "0.01", min: 0 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(item.quantity * item.unitPrice)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleRemoveItem(item.id)}
                          color="error"
                          disabled={items.length === 1}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddItem}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              เพิ่มรายการ
            </Button>

            <Box mt={3} display="flex" justifyContent="flex-end">
              <Typography variant="h5">
                ยอดรวม: {formatCurrency(calculateTotal())}
              </Typography>
            </Box>
          </Box>

          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary" size="large">
              บันทึกใบแจ้งหนี้
            </Button>
          </Box>
        </form>
      </Paper>
    </Layout>
  );
};

export default NewInvoice;