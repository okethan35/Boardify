require('dotenv').config();
const crypto = require('crypto');
const axios = require('axios');
const qs = require('qs');
const express = require('express');
const open = require('open').default;
const readline = require('readline');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let appAccessToken = null;
let userAccessToken = null;

function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0, length);
}

async function getAppAccessToken() {
  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    qs.stringify({ grant_type: 'client_credentials' }),
    { headers: { Authorization: `Basic ${authString}` } }
  );
  return response.data.access_token;
}

async function authenticateUser() {
  const state = generateRandomString(16);
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user-top-read&state=${state}`;

  return new Promise((resolve, reject) => {
    const app = express();
    let server = null;

    app.get('/callback', async (req, res) => {
      try {
        const tokenResponse = await axios.post(
          'https://accounts.spotify.com/api/token',
          qs.stringify({
            grant_type: 'authorization_code',
            code: req.query.code,
            redirect_uri: redirectUri
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
            }
          }
        );

        userAccessToken = tokenResponse.data.access_token;
        res.send('Authentication successful! You may close this window.');
        resolve(userAccessToken);
      } catch (error) {
        reject(error);
      } finally {
        server.close();
      }
    });

    server = app.listen(8888, () => {
      open(authUrl);
      console.log('\n=== Please authenticate in the browser ===');
    });
  });
}

async function getPublicUserData(username) {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/users/${username}`, {
      headers: { Authorization: `Bearer ${appAccessToken}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching public profile:', error.response?.data?.error?.message);
    return null;
  }
}

async function main() {
  try {
    appAccessToken = await getAppAccessToken();
    
    rl.question('Enter Spotify username to view public info: ', async (targetUsername) => {
      const cleanUsername = targetUsername.split('?')[0].trim();
      
      const publicUser = await getPublicUserData(cleanUsername);
      if (publicUser) {
        console.log('\n=== Public User Profile ===');
        console.log(`Name: ${publicUser.display_name}`);
        console.log(`Followers: ${publicUser.followers?.total || 'N/A'}`);
        console.log(`Profile URL: ${publicUser.external_urls.spotify}`);
      }

      console.log('\n=== Now authenticate your account ===');
      await authenticateUser();
      
      const currentUser = await axios.get('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${userAccessToken}` }
      });
      
      console.log('\n=== Authenticated User ===');
      console.log(`Logged in as: ${currentUser.data.display_name}`);
      
      const topTracks = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: { Authorization: `Bearer ${userAccessToken}` }
      });
      
      console.log('\nYour Personal Top Tracks:');
      topTracks.data.items.forEach((track, index) => {
        console.log(`${index + 1}. ${track.name} - ${track.artists[0].name}`);
      });

      rl.close();
    });
  } catch (error) {
    console.error('Error:', error.message);
    rl.close();
  }
}

main();