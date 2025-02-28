const express = require('express');
const { authenticateUser, handleSpotifyCallback } = require('../controllers/apiController');

const router = express.Router();

router.post('/auth', authenticateUser);
router.post('/callback', handleSpotifyCallback);

module.exports = router;

//TODO: finish the routing here