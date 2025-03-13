const express = require('express');
const multer = require('multer');
const { makePost, getPosts, getPost, like, makeComment } = require('../controllers/postController.js');  // Import the controller

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/makePost', upload.single("boardingPass"), makePost);
router.get('/getPosts', getPosts);
router.get('/getPost', getPost)
router.post('/like', like);
router.post('/comment', makeComment);

module.exports = router;
