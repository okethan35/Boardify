const express = require('express');
const { searchUsers } = require('../controllers/qrController');  // Import the controller

const router = express.Router();

router.get('/qr/${username}', generateQRCode);

module.exports = router;
