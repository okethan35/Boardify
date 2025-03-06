const express = require('express');
const { authenticateUser, handleSpotifyCallback, getUserData } = require('../controllers/apiController');

const router = express.Router();

router.post('/auth', authenticateUser);
router.get('/callback', handleSpotifyCallback);
router.get('/getUserData', getUserData);

module.exports = router;

//TODO: finish the routing here