const express = require('express');
const { searchUsers } = require('../controllers/queryController');  // Import the controller

const router = express.Router();

// Define the GET route for the search functionality
router.get('/search', searchUsers);

module.exports = router;
