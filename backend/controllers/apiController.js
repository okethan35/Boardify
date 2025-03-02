require('dotenv').config();
const crypto = require('crypto');
const axios = require('axios');
const qs = require('qs');
const open = require('open').default;
const jwt = require("jsonwebtoken");
const UserListeningData = require('../models/UserListeningData.js');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

let userAccessToken = null;

function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0, length);
}

function base64URLEncode(buffer) {
  return buffer.toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function authenticateUser(req, res) {
    // Clear any previous authentication
    userAccessToken = null;
    const token = req.headers['authorization']?.split(' ')[1]
    const codeVerifier = generateRandomString(64);
    const state = JSON.stringify({ token, codeVerifier });
    const codeChallenge = base64URLEncode(crypto.createHash('sha256').update(codeVerifier).digest());
    const scope = 'user-top-read user-read-private';
  
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.append('client_id', clientId);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('scope', scope);
    authUrl.searchParams.append('state', state);
    authUrl.searchParams.append('code_challenge_method', 'S256');
    authUrl.searchParams.append('code_challenge', codeChallenge);
    authUrl.searchParams.append('show_dialog', 'true'); // Force re-authorization
  
    res.json({ url: authUrl.toString() });
}

async function handleSpotifyCallback(req, res){
    try { 
        const { code, state } = req.query;
        if (!state) {
            return res.status(400).json({ error: 'State parameter missing.' });
        }

        const { token, codeVerifier } = JSON.parse(state); // Extract the token from the state
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized, token missing' });
        }

        if(!code) {
            return res.status(400).json({error: 'Authorization code not provided.'});
        }
        console.log("ERROR 1");
        const tokenResponse = await axios.post(
            'https://accounts.spotify.com/api/token',
            qs.stringify({
              grant_type: 'authorization_code',
              code: req.query.code,
              redirect_uri: redirectUri,
              code_verifier: codeVerifier,
              client_secret: process.env.SPOTIFY_CLIENT_SECRET,
              client_id: clientId
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
        );
        console.log("ERROR 2");
        userAccessToken = tokenResponse.data.access_token; 
        console.log("ERROR 3");
        const userProfileResponse = await axios.get('https://api.spotify.com/v1/me', {
            headers: { Authorization: `Bearer ${userAccessToken}`}
        });
        console.log("ERROR 4");
        const tracksResponse = await axios.get(`https://api.spotify.com/v1/me/top/tracks`, {
            headers: { Authorization: `Bearer ${userAccessToken}` },
            params: { time_range: 'short_term', limit: 5 }
        });
        console.log("ERROR 5");
        const artistsResponse = await axios.get(`https://api.spotify.com/v1/me/top/artists`, {
            headers: { Authorization: `Bearer ${userAccessToken}` },
            params: { time_range: 'short_term', limit: 5 }
        });
        console.log("ERROR 6");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { userId } = decoded;
        console.log("ERROR 7");
        const userSpotifyData = new UserListeningData({
            userID: userId,
            topTracks: tracksResponse.data.items.map(track => ({
                name: track.name,
                artist: track.artists[0].name
            })),
            topArtists: artistsResponse.data.items.map(artist => artist.name),
            profile: {
                displayName: userProfileResponse.data.display_name,
                profileID: userProfileResponse.data.id,
                followers: userProfileResponse.data.followers.total,
                profileURL: userProfileResponse.data.external_urls.spotify
            }
        });
        console.log("ERROR 8");
        
        console.log("TRACKS: ");
        for(item of tracksResponse.data.items){
            console.log(item.name, " by ", item.artists[0].name);
        }
        console.log("Artists: ");
        for(item of artistsResponse.data.items){
            console.log(item.name);
        }
        console.log("PROFILE: ");
        console.log(userProfileResponse.data.display_name);
        console.log(userProfileResponse.data.id);
        console.log(userProfileResponse.data.followers.total);
        console.log(userProfileResponse.data.external_urls.spotify);

        await userSpotifyData.save();
        console.log("ERROR 9");
        
        res.json({ message: 'Authentication successful!', token: userAccessToken});
    } catch(error){
        console.error('Error in Spotify Callback');
        res.status(500).json({error: `Error: ${error.message}`});
    }
}
  
/*
async function getUserProfile() {
  try{
    const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${userAccessToken}`}
    });
    res.json(response.data);
  } catch(error){
    res.status(500).json({error: `Error fetching user profile: ${error.message}`});
  }
}

async function getTopItems(type) {
    try {
        const type = req.params.type;
        const response = await axios.get(`https://api.spotify.com/v1/me/top/${type}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` },
            params: { time_range: 'medium_term', limit: 5 }
        });
        res.json(response.data.items);
    } catch(error) {
        res.status(500).json({error: `Error fetching top ${type}: ${error.message}`});
    }
}
*/

module.exports = {
    authenticateUser,
    handleSpotifyCallback
}

//TODO: make it all work as one cohesive function here or in front end, doesn't matter.
//      introduce code to push all of the user listening data to database