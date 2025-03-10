const express = require('express');
const { registerUser, loginUser, getUserId, authenticateUser, protectedRoute } = require("../controllers/authController");

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/userid', getUserId);

// WORK ON THIS
//app.post("/protected", authenticateUser, protectedRoute);

module.exports = router;