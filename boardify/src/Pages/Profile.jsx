import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar.jsx";
import "../styles/Profile.css";

const API_URL = process.env.REACT_APP_API_URL;

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${API_URL}/api/getUserData`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            setUserData(data.userData); // Note the .userData access here
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <>
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
          <h2>Welcome, {localStorage.getItem("email")}</h2>
          <p>You're logged in but not connected to Spotify.</p>
          <p>
            <a href={`${API_URL}/api/auth/spotify`} className="spotify-connect">
              Connect your Spotify account
            </a> to view music statistics and preferences.
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
          <p><strong>Followers:</strong> {userData.profile.followers?.toLocaleString()}</p>
          <p>
            <strong>Profile:</strong>{" "}
            <a 
              href={userData.profile.profileURL} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Visit Spotify Profile
            </a>
          </p>
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