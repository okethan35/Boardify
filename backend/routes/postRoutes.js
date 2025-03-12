const express = require('express');
const multer = require('multer');
const { makePost, getPosts, like, makeComment } = require('../controllers/postController.js');  // Import the controller

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/makePost', upload.single("image"), makePost);
router.get('/getPosts', getPosts);
router.post('/like', like);
router.post('/comment', makeComment);

module.exports = router;
