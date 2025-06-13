// src/components/InvoiceContent.js (ตัวอย่าง)
import React from 'react';
import { Box, Typography, Divider, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const InvoiceContent = ({ invoiceData }) => {
  if (!invoiceData) {
    return <Typography>Loading invoice data...</Typography>;
  }

  return (
    <Box sx={{ p: 4, border: '1px solid #ddd', borderRadius: 2, backgroundColor: '#fff' }} id="invoice-to-print">
      <Typography variant="h4" gutterBottom align="center">
        ใบแจ้งหนี้
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="h6">ผู้ขาย:</Typography>
          <Typography>{invoiceData.sellerName}</Typography>
          <Typography>{invoiceData.sellerAddress}</Typography>
          <Typography>โทร: {invoiceData.sellerPhone}</Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h6">เลขที่ใบแจ้งหนี้: {invoiceData.invoiceNumber}</Typography>
          <Typography>วันที่: {invoiceData.invoiceDate}</Typography>
          <Typography>ครบกำหนด: {invoiceData.dueDate}</Typography>
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom>ผู้ซื้อ:</Typography>
      <Typography>{invoiceData.customerName}</Typography>
      <Typography>{invoiceData.customerAddress}</Typography>
      <Typography>โทร: {invoiceData.customerPhone}</Typography>

      <Table sx={{ mt: 3, mb: 3 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
            <TableCell>รายการ</TableCell>
            <TableCell align="right">จำนวน</TableCell>
            <TableCell align="right">ราคาต่อหน่วย</TableCell>
            <TableCell align="right">รวม</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceData.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.description}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{item.unitPrice.toFixed(2)}</TableCell>
              <TableCell align="right">{(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3} align="right">**รวมทั้งหมด:**</TableCell>
            <TableCell align="right">**{invoiceData.totalAmount.toFixed(2)}**</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Typography variant="body2" sx={{ mt: 3 }}>หมายเหตุ: {invoiceData.notes}</Typography>
    </Box>
  );
};

export default InvoiceContent;