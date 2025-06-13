// src/pages/InvoiceDetail.js
import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import Layout from '../components/Layout';
import { useTheme } from '@mui/material/styles';

// นำเข้าไลบรารีสำหรับ PDF
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// นำเข้าไลบรารี xml-js สำหรับแปลง JSON เป็น XML
import { js2xml } from 'xml-js';

// นำเข้า file-saver สำหรับการดาวน์โหลดไฟล์
import { saveAs } from 'file-saver';

// นำเข้า useNotification custom hook สำหรับ Global Notifications
import { useNotification } from '../contexts/NotificationContext';

// ข้อมูลจำลอง (ควรมาจาก API จริงในอนาคต)
const allInvoices = [
  {
    id: 'INV001',
    customer: { name: 'ลูกค้า ก', email: 'clienta@example.com', address: '123 ถนนบางนา, กรุงเทพฯ 10260' },
    date: '2024-05-01',
    dueDate: '2024-05-31',
    items: [
      { description: 'บริการพัฒนาเว็บไซต์', quantity: 1, unitPrice: 1000.00 },
      { description: 'ค่าออกแบบกราฟิก', quantity: 1, unitPrice: 200.00 },
    ],
    status: 'Paid',
  },
  {
    id: 'INV002',
    customer: { name: 'ลูกค้า ข', email: 'clientb@example.com', address: '456 ถนนสุขุมวิท, กรุงเทพฯ 10110' },
    date: '2024-05-10',
    dueDate: '2024-06-10',
    items: [
      { description: 'ให้คำปรึกษาการตลาด', quantity: 5, unitPrice: 150.00 },
      { description: 'ค่าใช้จ่ายเดินทาง', quantity: 1, unitPrice: 100.00 },
    ],
    status: 'Pending',
  },
  {
    id: 'INV003',
    customer: { name: 'ลูกค้า ค', email: 'clientc@example.com', address: '789 ถนนพหลโยธิน, กรุงเทพฯ 10400' },
    date: '2024-05-15',
    dueDate: '2024-06-15',
    items: [
      { description: 'ซื้ออุปกรณ์สำนักงาน', quantity: 10, unitPrice: 30.00 },
    ],
    status: 'Overdue',
  },
  {
    id: 'INV004',
    customer: { name: 'ลูกค้า ก', email: 'clienta@example.com', address: '123 ถนนบางนา, กรุงเทพฯ 10260' },
    date: '2024-05-20',
    dueDate: '2024-06-20',
    items: [
      { description: 'บำรุงรักษาระบบรายเดือน', quantity: 1, unitPrice: 2500.00 },
    ],
    status: 'Paid',
  },
];

// ฟังก์ชันสำหรับจัดรูปแบบสกุลเงินบาท
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
  }).format(amount);
};

const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const invoiceRef = useRef(null); // Ref สำหรับ PDF
  const invoice = allInvoices.find((inv) => inv.id === id);

  // เรียกใช้ Custom Hook เพื่อเข้าถึง showNotification สำหรับ Global Notifications
  const { showNotification } = useNotification();

  if (!invoice) {
    // ใช้ showNotification เมื่อไม่พบใบแจ้งหนี้
    showNotification(`ไม่พบใบแจ้งหนี้หมายเลข: ${id}`, 'error');
    return (
      <Layout>
        <Typography variant="h5" color="error">
          ไม่พบใบแจ้งหนี้หมายเลข: {id}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/invoices')}
          sx={{ mt: 2 }}
        >
          กลับหน้ารายการใบแจ้งหนี้
        </Button>
      </Layout>
    );
  }

  const calculateSubtotal = () => {
    return invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  const subtotal = calculateSubtotal();
  const taxRate = 0.07; // 7% VAT
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + taxAmount;

  // ฟังก์ชันเตรียมข้อมูลสำหรับส่งออก JSON/XML
  const getInvoiceDataForExport = () => {
    return {
      invoiceNumber: invoice.id,
      invoiceDate: invoice.date,
      dueDate: invoice.dueDate,
      seller: {
        name: 'บริษัท พัฒนาซอฟต์แวร์ จำกัด',
        taxId: '01055xxxxxxxx', // ตัวอย่าง
        address: '100/123 อาคาร XYZ, ถนนสาทร, กรุงเทพฯ 10120',
        phone: '02-123-4567',
        email: 'info@softwaredev.co.th',
      },
      customer: {
        name: invoice.customer.name,
        taxId: '11037xxxxxxxx', // ตัวอย่าง
        address: invoice.customer.address,
        phone: '081-987-6543', // ตัวอย่าง
        email: invoice.customer.email,
      },
      items: invoice.items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalAmount: item.quantity * item.unitPrice,
      })),
      summary: {
        subtotal: subtotal,
        taxRate: taxRate,
        taxAmount: taxAmount,
        totalAmount: totalAmount,
      },
      paymentMethod: 'Bank Transfer',
      notes: 'ขอบคุณสำหรับธุรกิจของคุณ!',
      documentType: 'Invoice',
    };
  };

  // ฟังก์ชันสำหรับดาวน์โหลดไฟล์ โดยใช้ file-saver พร้อมแจ้งเตือนผ่าน Global Notification
  const downloadFile = (data, filename, type) => {
    try {
      const blob = new Blob([data], { type: type });
      if (blob.size === 0) {
        console.error('ERROR: Blob is empty (0 bytes). Check data source.');
        showNotification('ไม่สามารถส่งออกไฟล์ได้: ข้อมูลว่างเปล่า', 'error'); // แจ้งเตือนข้อผิดพลาด
        return;
      }
      saveAs(blob, filename); // ใช้ saveAs จาก file-saver
      console.log(`File "${filename}" saved successfully.`);
      // แจ้งเตือนสำเร็จ
      const fileExtension = filename.split('.').pop().toUpperCase();
      showNotification(`ส่งออกใบแจ้งหนี้ ${invoice.id} เป็นไฟล์ ${fileExtension} สำเร็จ!`, 'success');
    } catch (error) {
      console.error('Error during file download:', error);
      showNotification(`เกิดข้อผิดพลาดในการส่งออกไฟล์: ${error.message}`, 'error'); // แจ้งเตือนข้อผิดพลาด
    }
  };

  // ฟังก์ชันสำหรับส่งออกเป็น JSON
  const handleExportJson = () => {
    const data = getInvoiceDataForExport();
    const jsonString = JSON.stringify(data, null, 2); // จัดรูปแบบ JSON ให้อ่านง่าย
    downloadFile(jsonString, `invoice_${invoice.id}.json`, 'application/json');
  };

  // ฟังก์ชันสำหรับส่งออกเป็น XML
  const handleExportXml = () => {
    const data = getInvoiceDataForExport();

    // แปลง JSON Object ไปเป็นโครงสร้างที่ xml-js เข้าใจ
    const xmlStructure = {
      _declaration: { _attributes: { version: '1.0', encoding: 'utf-8' } },
      Invoice: {
        Header: {
          InvoiceNumber: { _text: data.invoiceNumber },
          InvoiceDate: { _text: data.invoiceDate },
          DueDate: { _text: data.dueDate },
        },
        Seller: {
          Name: { _text: data.seller.name },
          TaxId: { _text: data.seller.taxId },
          Address: { _text: data.seller.address },
          Email: { _text: data.seller.email },
        },
        Customer: {
          Name: { _text: data.customer.name },
          Address: { _text: data.customer.address },
          Email: { _text: data.customer.email },
        },
        Items: data.items.map(item => ({
          Item: {
            Description: { _text: item.description },
            Quantity: { _text: item.quantity },
            UnitPrice: { _text: item.unitPrice },
            TotalAmount: { _text: item.totalAmount },
          }
        })),
        Summary: {
          Subtotal: { _text: data.summary.subtotal },
          TaxAmount: { _text: data.summary.taxAmount },
          TotalAmount: { _text: data.summary.totalAmount },
        },
        Notes: { _text: data.notes }
      }
    };

    const xmlString = js2xml(xmlStructure, { compact: false, ignoreComment: true, spaces: 2 }); // แปลงเป็น XML String
    downloadFile(xmlString, `invoice_${invoice.id}.xml`, 'application/xml');
  };

  // ฟังก์ชันสำหรับพิมพ์ PDF พร้อมแจ้งเตือนผ่าน Global Notification
  const handlePrintPdf = async () => {
    const input = invoiceRef.current;

    if (input) {
      try {
        const canvas = await html2canvas(input, {
          scale: 2,
          useCORS: true,
          logging: true,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = -heightLeft;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save(`ใบแจ้งหนี้_${invoice.id}.pdf`);
        showNotification(`สร้างและดาวน์โหลดไฟล์ PDF ใบแจ้งหนี้ ${invoice.id} สำเร็จ!`, 'success'); // แจ้งเตือนสำเร็จ
      } catch (error) {
        console.error("Error creating PDF:", error);
        showNotification(`เกิดข้อผิดพลาดในการสร้าง PDF: ${error.message}`, 'error'); // แจ้งเตือนข้อผิดพลาด
      }
    } else {
      console.error("ไม่พบส่วนประกอบของใบแจ้งหนี้สำหรับสร้าง PDF.");
      showNotification("ไม่สามารถสร้าง PDF ได้: ไม่พบเนื้อหาใบแจ้งหนี้", 'error'); // แจ้งเตือนข้อผิดพลาด
    }
  };

  return (
    <Layout>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} className="no-print">
        <Typography variant="h4">รายละเอียดใบแจ้งหนี้: {invoice.id}</Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/invoices')}
            sx={{ mr: 2 }}
          >
            กลับ
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PrintIcon />}
            onClick={handlePrintPdf}
            sx={{ mr: 2 }}
          >
            พิมพ์ใบแจ้งหนี้ (PDF)
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DownloadIcon />}
            onClick={handleExportJson}
            sx={{ mr: 2 }}
          >
            ส่งออก JSON
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<DownloadIcon />}
            onClick={handleExportXml}
          >
            ส่งออก XML
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 4, mb: 3 }} ref={invoiceRef}>
        <Grid container spacing={3}>
          {/* ข้อมูลบริษัท (สมมติ) */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              จาก:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              บริษัท พัฒนาซอฟต์แวร์ จำกัด
            </Typography>
            <Typography variant="body2">
              100/123 อาคาร XYZ, ถนนสาทร, กรุงเทพฯ 10120
            </Typography>
            <Typography variant="body2">
              โทร: 02-123-4567 | อีเมล: info@softwaredev.co.th
            </Typography>
          </Grid>

          {/* ข้อมูลลูกค้า */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              ถึง:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {invoice.customer.name}
            </Typography>
            <Typography variant="body2">{invoice.customer.address}</Typography>
            <Typography variant="body2">อีเมล: {invoice.customer.email}</Typography>
          </Grid>

          {/* ข้อมูลใบแจ้งหนี้ */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <Box component="span" fontWeight="medium">
                เลขที่ใบแจ้งหนี้:
              </Box>{' '}
              {invoice.id}
            </Typography>
            <Typography variant="body1">
              <Box component="span" fontWeight="medium">
                วันที่ออก:
              </Box>{' '}
              {new Date(invoice.date).toLocaleDateString('th-TH')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <Box component="span" fontWeight="medium">
                วันครบกำหนด:
              </Box>{' '}
              {new Date(invoice.dueDate).toLocaleDateString('th-TH')}
            </Typography>
            <Typography variant="body1">
              <Box component="span" fontWeight="medium">
                สถานะ:{' '}
              </Box>
              <Typography
                component="span"
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
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* ตารางรายการสินค้า */}
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          รายการสินค้า/บริการ
        </Typography>
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: theme.palette.divider }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>คำอธิบาย</TableCell>
                <TableCell align="right">จำนวน</TableCell>
                <TableCell align="right">ราคาต่อหน่วย</TableCell>
                <TableCell align="right">รวม</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoice.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{formatCurrency(item.unitPrice)}</TableCell>
                  <TableCell align="right">{formatCurrency(item.quantity * item.unitPrice)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right" sx={{ fontWeight: 'bold' }}>
                  ยอดรวมก่อนภาษี:
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  {formatCurrency(subtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} align="right">
                  ภาษีมูลค่าเพิ่ม ({taxRate * 100}%):
                </TableCell>
                <TableCell align="right">{formatCurrency(taxAmount)}</TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: theme.palette.primary.light, '& .MuiTableCell-root': { fontWeight: 'bold', color: theme.palette.primary.contrastText } }}>
                <TableCell colSpan={3} align="right">
                  ยอดสุทธิ:
                </TableCell>
                <TableCell align="right">{formatCurrency(totalAmount)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            ขอบคุณสำหรับธุรกิจของคุณ!
          </Typography>
        </Box>
      </Paper>
      {/* ส่วนของ Snackbar สำหรับแจ้งเตือนถูกย้ายไปอยู่ใน NotificationContext.js แล้ว */}
    </Layout>
  );
};

export default InvoiceDetail;