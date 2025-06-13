// src/pages/Dashboard.js
import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import Layout from '../components/Layout';

// ฟังก์ชันสำหรับจัดรูปแบบสกุลเงินบาท
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
  }).format(amount);
};

const Dashboard = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        ภาพรวมแดชบอร์ด
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                รายได้รวม
              </Typography>
              <Typography variant="h4">{formatCurrency(12345.67)}</Typography> {/* ใช้ formatCurrency */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                ใบแจ้งหนี้ค้างชำระ
              </Typography>
              <Typography variant="h4">15</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                ใบแจ้งหนี้เกินกำหนด
              </Typography>
              <Typography variant="h4" color="error.main">
                5
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                ลูกค้าใหม่
              </Typography>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* สามารถเพิ่มกราฟ หรือข้อมูลอื่นๆ ได้ */}
      </Grid>
    </Layout>
  );
};

export default Dashboard;