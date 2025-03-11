// export default function BoardingPass({ user }) {
//   const [data, setData] = useState(null);
//   // Set to true by default so the pass is shown immediately
//   const [showPass, setShowPass] = useState(true);
//   const [topTracks, setTopTracks] = useState('');
//   const [spotifyBarcode, setSpotifyBarcode] = useState('');
//   const [spotifyUsername, setSpotifyUsername] = useState('');
//   const [fromArtist, setFromArtist] = useState('');
//   const [toArtist, setToArtist] = useState('');
//   const [curDate, setCurDate] = useState('');
//   const [flightNumber, setFlightNumber] = useState(0);
//   const [flightCode, setFlightCode] = useState('');

//   // Append the last part of the Spotify URL to generate a barcode URL
//   const appendLastPartOfUrl = (url) => {
//     const baseUrl = "https://scannables.scdn.co/uri/plain/jpeg/000000/white/640/spotify:track:";
//     const lastPart = url.split('/').pop();
//     return `${baseUrl}${lastPart}`;
//   };

//   // Fetch user data when the component mounts using API_URL
//   useEffect(() => {
//     const fetchData = async () => {
//       const userToken = localStorage.getItem('spotify_token');
//       if (!userToken) {
//         console.error('User token not found');
//         return;
//       }
//       try {
//         const response = await fetch(`${API_URL}/api/getUserData`, {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch user data');
//         }
//         const userData = await response.json();
//         setData(userData);
//         console.log("DATA:", userData);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Initialize boarding pass details when data and showPass are available
//   useEffect(() => {
//     if (data && showPass) initializeBoardingPass();
//   }, [data, showPass]);

//   // Update top tracks for the boarding pass using user data
//   const updateTopTracksBoardingPass = (tracks) => {
//     setTopTracks(tracks.length > 0
//       ? tracks.map(track => `${track.name} by ${track.artist}`).join(', ')
//       : 'Top tracks not found.'
//     );
//   };

//   // Format the current date as MM/DD/YYYY
//   const getFormattedDate = () => {
//     const date = new Date();
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${month}/${day}/${year}`;
//   };

//   // Initialize boarding pass details using the already-collected user data
//   function initializeBoardingPass() {
//     if (!data) return;

//     // Set Spotify username from user data
//     setSpotifyUsername(data.profile.displayName);

//     // Update top tracks using data.topTracks
//     const tracks = data.topTracks || [];
//     updateTopTracksBoardingPass(tracks);

//     if (tracks.length > 0) {
//       // Use first track's artist for 'From'
//       setFromArtist(tracks[0].artist);

//       // Use 5th track's artist for 'To' if available
//       if (tracks.length >= 5) {
//         setToArtist(tracks[4].artist);
//       } else {
//         setToArtist('No 5th track available');
//       }

//       // If the first track has a URL, generate a barcode URL
//       if (tracks[0].url) {
//         const barcodeUrl = appendLastPartOfUrl(tracks[0].url);
//         setSpotifyBarcode(barcodeUrl);
//       }
//     }

//     // Set the current date
//     setCurDate(getFormattedDate());

//     // Handle flight number and flight code
//     const storedFlightNumber = parseInt(localStorage.getItem('flightNumber') || "0", 10);
//     const newFlightNumber = storedFlightNumber + 1;
//     setFlightNumber(newFlightNumber);
//     localStorage.setItem('flightNumber', newFlightNumber.toString());

//     const randomLetter = generateRandomLetter();
//     setFlightCode(`${randomLetter}${newFlightNumber}`);
//   }

//   // Generate a random uppercase letter (A-Z)
//   const generateRandomLetter = () => {
//     const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     return letters[Math.floor(Math.random() * letters.length)];
//   };

//   // Handle download of the boarding pass as an image
//   const handleDownload = () => {
//     const boardingPassElement = document.querySelector('.boarding-pass');
//     if (!boardingPassElement) {
//       console.error("Boarding pass content not found");
//       return;
//     }
//     html2canvas(boardingPassElement).then(canvas => {
//       const image = canvas.toDataURL('image/png');
//       const link = document.createElement('a');
//       link.href = image;
//       link.download = 'boardify.png';
//       link.click();
//     });
//   };

//   return (
//     <div className="boarding-pass-container">
//       <div className={`boarding-pass ${showPass ? 'visible' : ''}`}>
//         <div className="dotted-line"></div>
//         <div className="horizontal-line"></div>
//         <div className="header">
//           {data?.profile?.profileImg?.url && (
//             <img
//               src={data.profile.profileImg.url}
//               alt="Profile"
//               className="profile-picture"
//             />
//           )}
//         </div>

//         <div className="Board">
//           <div className="Board-container">
//             <div>
//               <strong>BOARDIFY</strong>
//             </div>
//           </div>

//           <div className="details">
//             <div className="details-container">
//               <div>
//                 <strong>Passenger:</strong> <span>{spotifyUsername}</span>
//               </div>
//               <div>
//                 <strong>Flight:</strong> <span>{flightCode}</span>
//               </div>
//               <div>
//                 <strong>From:</strong> <span>{fromArtist}</span>
//               </div>
//             </div>

//             <div className="details-container">
//               <div>
//                 <strong>To: </strong> <span>{toArtist}</span>
//               </div>
//               <div>
//                 <strong>Carrier:</strong> <span>Boardify</span>
//               </div>
//               <div>
//                 <strong>Date:</strong> <span>{curDate}</span>
//               </div>
//             </div>

//             <div className="top-tracks-container">
//               <div>
//                 <strong>Top Tracks:</strong>
//                 <div>{topTracks}</div>
//               </div>
//             </div>

//             {data?.topArtists && data.topArtists.length > 0 && (
//               <div className="top-artists-container">
//                 <div>
//                   <strong>Top Artists:</strong>
//                   <div>{data.topArtists.join(', ')}</div>
//                 </div>
//               </div>
//             )}

//             <div className="bar-code">
//               {spotifyBarcode && (
//                 <img
//                   id="barcode"
//                   src={spotifyBarcode}
//                   alt="Spotify Barcode"
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//         <button id="download-button" onClick={handleDownload}>
//           Save Ticket
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar.jsx";
import "../styles/Profile.css";
import { getUserId } from "../api/auth.jsx";

const API_URL = process.env.REACT_APP_API_URL;

const BoardingPass = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");

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
          <div className={`boarding-pass`}>
            <div className="dotted-line"></div>
            <div className="horizontal-line"></div>
            <div className="header">
              {(
                <img
                  src={userData.profile.profileImg?.url || "data:image/png;base64,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"}
                  alt="Profile"
                  className="profile-picture"
                />
              )}
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
                    <strong>Flight:</strong> <span>{`${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.length)]}${Math.floor(Math.random() * 10)}`}</span>
                  </div>
                  <div>
                    <strong>From:</strong> <span>{userData.topArtists[0] || ""}</span>
                  </div>
                </div>
    
                <div className="details-container">
                  <div>
                    <strong>To: </strong> <span>{userData.topArtists[4] || userData.topArtists[3] || userData.topArtists[2] || userData.topArtists[1] || ""}</span>
                  </div>
                  <div>
                    <strong>Carrier:</strong> <span>Boardify</span>
                  </div>
                  <div>
                    <strong>Date:</strong> <span>{`${String((new Date()).getMonth() + 1).padStart(2, '0')}/${String((new Date()).getDate()).padStart(2, '0')}/${(new Date()).getFullYear()}`}</span>
                  </div>
                </div>
    
                <div className="top-tracks-container">
                  <div>
                    <strong>Top Tracks:</strong>
                    <div>{userData.topTracks.map((track, index) => (
              <li key={index}>{track.name} by {track.artist}</li>
            ))}</div>
                  </div>
                </div>
    
                {userData?.topArtists && userData.topArtists.length > 0 && (
                  <div className="top-artists-container">
                    <div>
                      <strong>Top Artists:</strong>
                      <div>{userData.topArtists.map((artist, index) => (
              <li key={index}>{artist}</li>
            ))}</div>
                    </div>
                  </div>
                )}
    
                {/* <div className="bar-code">
                  {spotifyBarcode && (
                    <img
                      id="barcode"
                      src={spotifyBarcode}
                      alt="Spotify Barcode"
                    />
                  )}
                </div> */}
              </div>
            </div>
            {/* <button id="download-button" onClick={handleDownload}>
              Save Ticket
            </button> */}
          </div>
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
          <div className="boarding-pass-info">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardingPass;
