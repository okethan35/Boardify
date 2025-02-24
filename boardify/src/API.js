require('dotenv').config();
const crypto = require('crypto');
const axios = require('axios');
const qs = require('qs');
const express = require('express');
const open = require('open').default;

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

async function authenticateUser() {
    const state = generateRandomString(16);
    const codeVerifier = generateRandomString(64);
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
  
    return new Promise((resolve, reject) => {
      const app = express();
      let server = null;
  
      app.get('/callback', async (req, res) => {
        try {
          if (req.query.state !== state) {
            throw new Error('State mismatch');
          }
  
          const tokenResponse = await axios.post(
            'https://accounts.spotify.com/api/token',
            qs.stringify({
              grant_type: 'authorization_code',
              code: req.query.code,
              redirect_uri: redirectUri,
              code_verifier: codeVerifier,
              client_id: clientId
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          );
  
          // Optional: Log tokenResponse.data to debug what scopes are granted.
          console.log(tokenResponse.data);
  
          userAccessToken = tokenResponse.data.access_token;
          
          // Verify we received required scopes
          const grantedScopes = tokenResponse.data.scope.split(' ');
          const requiredScopes = ['user-top-read', 'user-read-private'];
          if (!requiredScopes.every(scope => grantedScopes.includes(scope))) {
            throw new Error('Missing required scopes');
          }
  
          res.send('Authentication successful! You may close this window.');
          resolve(userAccessToken);
        } catch (error) {
          res.status(500).send(`Error: ${error.message}`);
          reject(error);
        } finally {
          server.close();
        }
      });
  
      server = app.listen(8888, () => {
        console.log('\n=== Please authenticate in your browser ===');
        open(authUrl.toString());
      });
    });
  }
  

async function getUserProfile() {
  const response = await axios.get('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${userAccessToken}` }
  });
  return response.data;
}

async function getTopItems(type) {
  const response = await axios.get(`https://api.spotify.com/v1/me/top/${type}`, {
    headers: { Authorization: `Bearer ${userAccessToken}` },
    params: { time_range: 'medium_term', limit: 5 }
  });
  return response.data.items;
}

async function main() {
  try {
    // Clear any previous authentication
    userAccessToken = null;
    
    await authenticateUser();
    
    console.log('\n=== Fetching your Spotify profile ===');
    const profile = await getUserProfile();
    
    console.log('\n=== Your Profile ===');
    console.log(`Display Name: ${profile.display_name || 'Not available'}`);
    console.log(`Account ID: ${profile.id}`);
    console.log(`Followers: ${profile.followers?.total || 'N/A'}`);
    console.log(`Profile URL: ${profile.external_urls.spotify}`);

    const [topTracks, topArtists] = await Promise.all([
      getTopItems('tracks'),
      getTopItems('artists')
    ]);

    console.log('\n=== Your Top Tracks ===');
    topTracks.forEach((track, index) => {
      console.log(`${index + 1}. ${track.name} - ${track.artists[0].name}`);
    });

    console.log('\n=== Your Top Artists ===');
    topArtists.forEach((artist, index) => {
      console.log(`${index + 1}. ${artist.name}`);
    });

  } catch (error) {
    console.error('Error:', error.response?.data?.error?.message || error.message);
  } finally {
    process.exit();
  }
}

main();