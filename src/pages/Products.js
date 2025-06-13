// src/pages/Products.js
import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Layout from '../components/Layout';

// ฟังก์ชันสำหรับจัดรูปแบบสกุลเงินบาท
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
  }).format(amount);
};

const products = [
  { id: 1, name: 'บริการพัฒนาเว็บไซต์', price: 150.00, unit: 'ชั่วโมง' },
  { id: 2, name: 'แพ็คเกจออกแบบกราฟิก', price: 500.00, unit: 'โปรเจกต์' },
  { id: 3, name: 'ให้คำปรึกษา', price: 100.00, unit: 'ชั่วโมง' },
];

const Products = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        สินค้าและบริการ
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ชื่อ</TableCell>
              <TableCell align="right">ราคา</TableCell> {/* หัวข้อตาราง */}
              <TableCell>หน่วย</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{formatCurrency(product.price)}</TableCell> {/* ใช้ formatCurrency */}
                <TableCell>{product.unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Products;