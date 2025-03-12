

import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/NavBar.jsx";
import { getUserId } from "../api/auth.jsx";
import { getUserData } from "../api/spotify.jsx";
import html2canvas from "html2canvas";
import "../styles/BoardingPass.css";

const API_URL = process.env.REACT_APP_API_URL;

const BoardingPass = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [spotifyBarcode, setSpotifyBarcode] = useState('');
  const [barcodeLoaded, setBarcodeLoaded] = useState(false);
  const [showBoardingPass, setShowBoardingPass] = useState(false); // State for visibility
  const componentRef = useRef(null);
  const username = localStorage.getItem("username");

  const appendLastPartOfUrl = (url) => {
    const baseUrl = "https://scannables.scdn.co/uri/plain/jpeg/995f24/white/640/spotify:user:";
    const lastPart = url.split('/').pop();
    return `${baseUrl}${lastPart}`;
  };

  const handleDownload = async () => {
    if (!componentRef.current) return;

    const boardingPass = componentRef.current;
    boardingPass.style.display = 'none';
    const reflow = boardingPass.offsetHeight;
    boardingPass.style.display = 'flex';

    await new Promise(resolve => setTimeout(resolve, 500));

    const images = boardingPass.querySelectorAll('img');
    await Promise.all(
      Array.from(images).map(img => {
        if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
        return new Promise((resolve, reject) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', () => {
            console.warn('Image failed to load:', img.src);
            resolve();
          });
        });
      })
    );

    html2canvas(boardingPass, {
      useCORS: true,
      scale: 2,
      logging: true,
      allowTaint: false,
      backgroundColor: null,
      onclone: (clonedDoc) => {
        clonedDoc.querySelector('.boarding-pass').style.boxShadow = 'none';
      }
    }).then(canvas => {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'boardify.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleCreateBoardingPass = () => {
    setShowBoardingPass(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!username) {
          setLoading(false);
          return;
        }
        const userToken = await getUserId(username);
        if (userToken) {
          setIsLoggedIn(true);
          const data = await getUserData(userToken);
          setUserData(data.userData);

          const barcodeUrl = appendLastPartOfUrl(data.userData.profile.profileURL);
          setSpotifyBarcode(barcodeUrl);

          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = barcodeUrl;
          img.onload = () => setBarcodeLoaded(true);
          img.onerror = () => console.error('Failed to load barcode');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
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
          <p>Welcome! Sign in to see your profile details.</p>
        </>
      );
    }

    return (
      <div className="boarding-pass-container">
        {/* Conditionally render the "Create Boarding Pass" button */}
        {!showBoardingPass && (
          <button id="create-ticket-button" onClick={handleCreateBoardingPass}>
            Create Boarding Pass
          </button>
        )}

     
        {showBoardingPass && (
          <div className="boarding-pass" ref={componentRef}>
            <div className="dotted-line"></div>
            <div className="horizontal-line"></div>
            <div className="header">
              <div className="bar-code">
                {spotifyBarcode && (
                  <img
                    id="barcode"
                    src={spotifyBarcode}
                    alt="Spotify Barcode"
                    crossOrigin="anonymous"
                    style={{ opacity: barcodeLoaded ? 1 : 0 }}
                    onLoad={() => setBarcodeLoaded(true)}
                  />
                )}
              </div>
            </div>

            <div className="Board">
              <div className="Board-container">
                <div>
                  <strong>BOARDIFY</strong>
                </div>
              </div>

              <div className="details">
                <div className="details-container">
                  <div>
                    <strong>Passenger:</strong> <span>{userData.profile.displayName}</span>
                  </div>
                  <div>
                    <strong>Flight:</strong>{" "}
                    <span>
                      {`${"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)]}${Math.floor(
                        Math.random() * 10
                      )}`}
                    </span>
                  </div>
                  <div>
                    <strong>From:</strong> <span>{userData.topArtists[0] || ""}</span>
                  </div>
                </div>

                <div className="details-container">
                  <div>
                    <strong>To:</strong>{" "}
                    <span>
                      {userData.topArtists[4] ||
                        userData.topArtists[3] ||
                        userData.topArtists[2] ||
                        userData.topArtists[1] ||
                        ""}
                    </span>
                  </div>
                  <div>
                    <strong>Carrier:</strong> <span>Boardify</span>
                  </div>
                  <div>
                    <strong>Date:</strong>{" "}
                    <span>
                      {`${String(new Date().getMonth() + 1).padStart(2, "0")}/${String(
                        new Date().getDate()
                      ).padStart(2, "0")}/${new Date().getFullYear()}`}
                    </span>
                  </div>
                </div>

                <div className="top-tracks-container">
                  <div>
                    <strong>Top Tracks:</strong>
                    <div>
                      {userData.topTracks.map((track, index) => (
                        <li key={index}>
                          {track.name} by {track.artist}
                        </li>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Ticket Button */}
        {showBoardingPass && (
          <button
            id="download-button"
            onClick={handleDownload}
            disabled={!barcodeLoaded}
          >
            {barcodeLoaded ? "Save Ticket" : "Generating Ticket..."}
          </button>
        )}
      </div>
    );
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="boarding-pass-container">
        <div className="boarding-pass-box">
          <div className="boarding-pass-info">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default BoardingPass;