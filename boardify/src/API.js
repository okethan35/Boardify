require('dotenv').config();
const axios = require('axios');
const qs = require('qs');
const readline = require('readline');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

async function getAccessToken() {
    try {
        const tokenUrl = "https://accounts.spotify.com/api/token";
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
        };

        const data = qs.stringify({ grant_type: "client_credentials" });
        const response = await axios.post(tokenUrl, data, { headers });
        return response.data.access_token;
    } catch (error) {
        console.error("Error fetching access token:", error.response ? error.response.data : error.message);
        return null;
    }
}

async function getUserProfile(username, accessToken) {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/users/${username}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error.response ? error.response.data : error.message);
        return null;
    }
}

async function getUserPlaylists(username, accessToken) {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/users/${username}/playlists`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user playlists:", error.response ? error.response.data : error.message);
        return null;
    }
}

async function getPlaylistTracks(playlistId, accessToken) {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching playlist tracks:", error.response ? error.response.data : error.message);
        return null;
    }
}

async function displayUserData(username) {
    const accessToken = await getAccessToken();
    if (!accessToken) return;

    const userProfile = await getUserProfile(username, accessToken);
    if (!userProfile) return;
    console.log("User Profile:");
    console.log(`Display Name: ${userProfile.display_name}`);
    console.log(`Followers: ${userProfile.followers ? userProfile.followers.total : 'N/A'}`);
    console.log(`Profile URL: ${userProfile.external_urls ? userProfile.external_urls.spotify : 'N/A'}`);
    if (userProfile.images && userProfile.images.length > 0) {
        console.log(`Profile Image: ${userProfile.images[0].url}`);
    }

    const playlists = await getUserPlaylists(username, accessToken);
    if (playlists && playlists.items && playlists.items.length > 0) {
        console.log(`Public Playlists (${playlists.items.length}):`);
        playlists.items.forEach((playlist, index) => {
            console.log(`${index + 1}. ${playlist.name} (Tracks: ${playlist.tracks.total})`);
        });

        const firstPlaylist = playlists.items[0];
        const tracksData = await getPlaylistTracks(firstPlaylist.id, accessToken);
        if (tracksData && tracksData.items && tracksData.items.length > 0) {
            const artistsSet = new Set();
            tracksData.items.forEach(item => {
                if (item.track && item.track.artists) {
                    item.track.artists.forEach(artist => artistsSet.add(artist.name));
                }
            });
            console.log(`Artists featured in the first playlist "${firstPlaylist.name}":`);
            console.log(Array.from(artistsSet).join(", "));
        } else {
            console.log(`No tracks found for playlist "${firstPlaylist.name}".`);
        }
    } else {
        console.log("No public playlists found for this user.");
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter Spotify username: ", (usernameInput) => {
    displayUserData(usernameInput.trim())
        .then(() => rl.close())
        .catch(err => {
            console.error("An error occurred:", err);
            rl.close();
        });
});