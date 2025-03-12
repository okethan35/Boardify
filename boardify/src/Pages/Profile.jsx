import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar.jsx";
import { getUserId } from "../api/auth.jsx";
import { useParams } from "react-router-dom";
import def_prof_pic from '../assets/default_profile.png';
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
            src={def_prof_pic}
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
            src={userData.profile.profileImg?.url || def_prof_pic}
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
