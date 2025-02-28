const mongoose = require("mongoose");

const UserListeningDataSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    topTracks: {type: [String]},
    topArtists: {type: [String]},
    profile: {type: object}
})

const UserListeningData = mongoose.model("UserListeningData", UserListeningDataSchema);
modules.export = UserListeningData;