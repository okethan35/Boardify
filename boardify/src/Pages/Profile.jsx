import React from "react";
import Navbar from "../components/NavBar.jsx";
import "../styles/Profile.css";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-box">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile Picture"
            className="profile-picture"
          />
          <div className="profile-info">
            <h2>[Website Username]</h2>
            <p>
              Spotify Display Name: 
            </p>
            <p>
              Number of Followers on Spotify: 
            </p>
            <p>
              Link to Spotify Profile Page: 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
