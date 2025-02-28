const mongoose = require("mongoose");

const UserListeningDataSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    topTracks: {type: [String], required: false},
    topArtists: {type: [String], required: false},
    profile: {
        type: {
            displayName: { type: String }, 
            profileID: { type: String }, 
            followers: { type: Number }, 
            profileURL: { type: String } 
        },
        required: false
    }
})

const UserListeningData = mongoose.model("UserListeningData", UserListeningDataSchema);
modules.export = UserListeningData;