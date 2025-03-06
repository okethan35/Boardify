import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar.jsx";
import "../styles/Profile.css";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage to determine login status
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-box">
          <img
            src="data:image/png;base64,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"
            alt="Profile Picture"
            className="profile-picture"
          />
          <div className="profile-info">
            {isLoggedIn ? (
              <>
                <h2>Welcome, [User's Name]</h2>
                <p>
                  Spotify Display Name: [User's Spotify Display Name]
                </p>
                <p>
                  Number of Followers on Spotify: [User's Followers Count]
                </p>
                <p>
                  Link to Spotify Profile Page: [User's Profile Link]
                </p>
              </>
            ) : (
              <>
                <h2>Guest</h2>
                <p>
                  Please log in to view your profile details.
                </p>
                <p>
                  <a href="/login">Log In</a> to access your Spotify information.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
