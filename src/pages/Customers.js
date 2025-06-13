// src/pages/Customers.js
import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import Layout from '../components/Layout';

const customers = [
  { id: 1, name: 'ลูกค้า ก', email: 'clienta@example.com', phone: '081-111-2222' },
  { id: 2, name: 'ลูกค้า ข', email: 'clientb@example.com', phone: '082-333-4444' },
  { id: 3, name: 'ลูกค้า ค', email: 'clientc@example.com', phone: '083-555-6666' },
];

const Customers = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        ลูกค้า
      </Typography>
      <Paper sx={{ p: 3 }}>
        <List>
          {customers.map((customer) => (
            <React.Fragment key={customer.id}>
              <ListItem>
                <ListItemText
                  primary={customer.name}
                  secondary={`อีเมล: ${customer.email} | โทร: ${customer.phone}`}
                  primaryTypographyProps={{ variant: 'h6' }}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Layout>
  );
};

export default Customers;