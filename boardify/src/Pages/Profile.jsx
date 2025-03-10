import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar.jsx";
import { getUserId } from "../api/auth.jsx";
import { useParams } from "react-router-dom";
import "../styles/Profile.css";

const API_URL = process.env.REACT_APP_API_URL;

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  console.log(username);

  useEffect(() => {
    const fetchUserIdAndData = async () => {
      try {
        console.log('Here1');
        const userToken = await getUserId(username);
        console.log("Here2");
        if (userToken) {
      setIsLoggedIn(true);
      
          const response = await fetch(`${API_URL}/api/getUserData`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            setUserData(data.userData); 
          }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };
      
    fetchUserIdAndData();
    }, [username]);

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <>
          <img
            src="data:image/png;base64,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"
            alt="Default Profile"
            className="profile-picture default"
          />
          <h2>Guest</h2>
          <p>Please log in to view your profile details.</p>
          <p>
            <a href="/login">Log In</a> to access your Spotify information.
          </p>
        </>
      );
    }

    if (loading) {
      return <p>Loading user data...</p>;
    }

    // Check if Spotify is connected by presence of profile data
    const isSpotifyConnected = userData?.profile?.displayName;

    if (!isSpotifyConnected) {
      return (
        <>
          <h2>Welcome, {localStorage.getItem("username")}</h2>
          <p>You're logged in but not connected to Spotify.</p>
          <p>
            <a href={`${API_URL}/api/auth/spotify`} className="spotify-connect">
              Connect your Spotify account
            </a>{" "}
            to view music statistics and preferences.
          </p>
        </>
      );
    }

    return (
      <>
        <h2>Welcome, {userData.profile.displayName}</h2>
        <div className="profile-picture-container">
          <img
            src={userData.profile.profileImg?.url}
            alt="Spotify Profile"
            className="profile-picture"
          />
        </div>
        <div className="spotify-info">
          <p>
            <strong>Followers:</strong> {userData.profile.followers?.toLocaleString()}
          </p>
          <p>
            <a 
              href={userData.profile.profileURL} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Link 
            </a>{" "}
            to Spotify profile page
          </p>
          <p><strong>Top Artists:</strong></p>
          <ul>
            {userData.topArtists.map((artist, index) => (
              <li key={index}>{artist}</li>
            ))}
          </ul>
          <p><strong>Top Tracks:</strong></p>
          <ul>
            {userData.topTracks.map((track, index) => (
              <li key={index}>{track.name} by {track.artist}</li>
            ))}
          </ul>
        </div>
      </>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-box">
          <div className="profile-info">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
