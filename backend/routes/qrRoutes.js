const express = require('express');
const { generateQRCode } = require('../controllers/qrController');  // Import the controller

const router = express.Router();

router.get('/:username', generateQRCode);

module.exports = router;
