const express = require('express');
const { searchUsers } = require('../controllers/qrController');  // Import the controller

const router = express.Router();

router.get('/generate/${username}', generateQRCode);

module.exports = router;
