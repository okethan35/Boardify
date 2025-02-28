const express = require('express');
const { registerUser, loginUser, authenticateUser, protectedRoute } = require("../controllers/authController");

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// WORK ON THIS
app.post("/protected", authenticateUser, protectedRoute);

module.exports = router;