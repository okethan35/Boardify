require('dotenv').config();
const axios = require('axios');
const qs = require('qs');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyUsername = "z3duruth5f45724rxit83o5gu";

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

async function getUserData() {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) return;

    const response = await axios.get(`https://api.spotify.com/v1/users/${spotifyUsername}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    console.log(response.data);
  } catch (error) {
    console.error("Error fetching user data:", error.response ? error.response.data : error.message);
  }
}

getUserData();
