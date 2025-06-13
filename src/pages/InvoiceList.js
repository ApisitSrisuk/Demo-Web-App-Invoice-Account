// src/pages/InvoiceList.js
import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import Layout from '../components/Layout';

// ข้อมูลจำลอง (ใช้ allInvoices จาก InvoiceDetail.js เป็นตัวอย่าง)
const invoices = [
  { id: 'INV001', customer: 'ลูกค้า ก', date: '2024-05-01', total: 1200.0, status: 'Paid' },
  { id: 'INV002', customer: 'ลูกค้า ข', date: '2024-05-10', total: 850.5, status: 'Pending' },
  { id: 'INV003', customer: 'ลูกค้า ค', date: '2024-05-15', total: 300.0, status: 'Overdue' },
  { id: 'INV004', customer: 'ลูกค้า ก', date: '2024-05-20', total: 2500.0, status: 'Paid' },
];

// ฟังก์ชันสำหรับจัดรูปแบบสกุลเงินบาท
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
  }).format(amount);
};

const InvoiceList = () => {
  const theme = useTheme();

  return (
    <Layout>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">รายการใบแจ้งหนี้</Typography>
        <Button variant="contained" color="primary" component={Link} to="/invoices/new">
          สร้างใบแจ้งหนี้ใหม่
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="invoice table">
          <TableHead>
            <TableRow>
              <TableCell>เลขที่ใบแจ้งหนี้</TableCell>
              <TableCell>ลูกค้า</TableCell>
              <TableCell>วันที่</TableCell>
              <TableCell align="right">ยอดรวม</TableCell> {/* หัวข้อตาราง */}
              <TableCell>สถานะ</TableCell>
              <TableCell align="center">จัดการ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow
                key={invoice.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {invoice.id}
                </TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{new Date(invoice.date).toLocaleDateString('th-TH')}</TableCell>
                <TableCell align="right">
                  {formatCurrency(invoice.total)} {/* ใช้ formatCurrency ตรงนี้ */}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                        color:
                          invoice.status === 'Paid'
                            ? theme.palette.success.dark
                            : invoice.status === 'Pending'
                            ? theme.palette.warning.dark
                            : theme.palette.error.dark,
                        fontWeight: 600,
                    }}
                  >
                    {invoice.status === 'Paid'
                        ? 'ชำระแล้ว'
                        : invoice.status === 'Pending'
                        ? 'รอดำเนินการ'
                        : 'เกินกำหนดชำระ'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    sx={{ mr: 1 }}
                    component={Link}
                    to={`/invoices/${invoice.id}`}
                  >
                    ดู
                  </Button>
                  <Button size="small" variant="outlined" color="error">
                    ลบ
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default InvoiceList;