const mongoose = require("mongoose");

const UserListeningDataSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    topTracks: [{
        name: {type: String, required: false},
        artist: {type: String, required: false}
    }],
    topArtists: [{type: String, required: false}],
    topGenre: {type: String},
    profile: {
        type: {
            displayName: { type: String }, 
            profileID: { type: String }, 
            followers: { type: Number }, 
            profileURL: { type: String },
            profileImg: { 
                url: { type: String, required: false },
                height: { type: Number, required: false },
                width: { type: Number, required: false }
            }
        },
        required: false
    },
    timeCreated: {type: Date, default: Date.now}
})

const UserListeningData = mongoose.model("UserListeningData", UserListeningDataSchema);
module.exports = UserListeningData;