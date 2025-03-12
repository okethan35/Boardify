const Post = require("../models/Post.js");
const mongoose = require("mongoose");

exports.makePost = async (req, res) => {
    try {
        const { userId, username, profileImg } = req.body;
        const { name, buffer, contentType } = req.file;

        try {
            const newPost = new Post({
                userId: userId,
                username: username,
                profileImg: profileImg,
                boardingPass: {
                    name: name,
                    image: buffer,
                    contentType: contentType
                }
            })
            await newPost.save();
        } catch (error) {
            console.error("Error creating post:", error);
            return res.status(500).json({ message: "Error creating post" });
        }

        res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
}

exports.getPosts = async(req, res) => {
    try {
        const postList = await Post.find().sort({timeCreated: -1}).limit(20);
        if(!postList){
            return res.status(400).json({ message: "No posts or error getting posts" });
        }
        res.json({ postList });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving posts" });
    }
}

//TODO: implement functions for updating likes and adding comments.

exports.like = async(req, res) => {
    try {
        const { postId, username } = req.body;
        const post = await Post.findOne({ _id: mongoose.Types.ObjectId(postId) });
        if(!post){
            return res.status(400).json({ message: "Post not found" });
        }
        if (post.likes.likedBy.includes(username)){
            post.likes.count = post.likes.count - 1;
            post.likes.likedBy = post.likes.likedBy.filter(user => user !== username);
        } else {
            post.likes.count = post.likes.count + 1;
            post.likes.likedBy.push(username);
        }
        await post.save();
        res.json( post.likes );
    } catch (error) {
        res.status(500).json({ message: "Error adding like" });
    }
}


exports.makeComment = async(req, res) => {
    try {
        const { postId, username, comment } = req.body;
        const post = await Post.findOne({ _id: mongoose.Types.ObjectId(postId) });
        if(!post){
            return res.status(400).json({ message: "Post not found" });
        }
        const newComment = {
            author: username,
            comment: comment
        } 
        post.comments.push(newComment);
        await post.save();
        res.json( post.comments );
    } catch (error) {
        res.status(500).json({ message: "Error adding comment" });
    }
}

