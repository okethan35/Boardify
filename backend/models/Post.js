const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    username: {type: String, required: true},
    profileImg: { 
        url: { type: String, required: false },
        height: { type: Number, required: false },
        width: { type: Number, required: false }
    },
    boardingPass: {
        name: { type: String, required: true},
        image: { type: Buffer, required: true},
        contentType: { type: String, required: true}
    },
    likes: {
        count: {type: Number, default: 0},
        likedBy: [{type: String}]
    },
    comments: [{
        author: { type: String },
        comment: { type: String }
    }],
    timeCreated: {type: Date, default: Date.now}
})

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;