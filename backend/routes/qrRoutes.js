const express = require('express');
const { generateQRCode } = require('../controllers/qrController');  // Import the controller

const router = express.Router();

router.get('/getqrCode', generateQRCode);

module.exports = router;
