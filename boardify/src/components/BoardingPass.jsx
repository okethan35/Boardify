
import { html2canvas } from 'html2canvas';
import '../styles/BoardingPass.css';
import { useState, useEffect } from "react"; 

export default function BoardingPass({ user }) {

    /*
    const[topTracks, setTopTracks] = useState([]);

    useEffect(() => {
        if (user.accessToken) {
            fetchUserData(user.accessToken);
        }
    }, [user.accessToken]);


// get user profile & top tracks
        async function fetchUserData(accessToken) {
            try {
                // Fetch user profile
                const profileResponse = await fetch('https://api.spotify.com/v1/me', {
                    headers: { 'Authorization': `Bearer ${accessToken}`
                    }  // Authorization:'Bearer 1POdFZRZbvb...qqillRxMr2z'
                });
                const profileData = await profileResponse.json();

               // const userName = profileData.display_name; // User's display name on pass

// Fetch top tracks
                const tracksResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const tracksData = await tracksResponse.json();
                setTopTracks(tracksData.items.map(track => track.name));
                //const topTracks = tracksData.items.map(track => track.name); // get tracsongsk names

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

       /* function generateBoardingPass(name, flight, from, to, carrier, date) {
            document.getElementById('passenger-name').textContent = name;
            document.getElementById('flight-number').textContent = flight;
            document.getElementById('from-airport').textContent = from;
            document.getElementById('to-airport').textContent = to;
            document.getElementById('music-genre').textContent = carrier;
            document.getElementById('flight-date').textContent = boardingtime;
*/

//updating top songs
          //  const topTracksElement = document.getElementById('top-tracks');
          //  topTracksElement.textContent = topTracks.join(',');


            //qr code -- need to put spotify code here
          //  const qrData = `Name:${name}|Flight:${flight}|From:${from}|To:${to}|Carrier:${carrier}|Date:${date}`;
          //  document.getElementById('barcode').src = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(qrData)}&code=Code128&translate-esc=on`;
      //  }

    //save boarding pass
   // document.getElementById('download-button').addEventListener('click', () => {
         //const boardingPassElement = document.querySelector('.boarding-pass');

         const handleDownload = () => {
              const boardingPassE = document.querySelector('.boarding-pass');

              if(!boardingPassE) {
                console.error("Boarding pass content not found");
                return;
              }


            html2canvas(boardingPassE).then(canvas => {
                // using canvas to convert to image png
                const image = canvas.toDataURL('image/png');

                // Create a temporary link to download the image
                const link = document.createElement('a');
                link.href = image;
                link.download = 'boardify.png'; // name of the download
                link.click();
            });
        };
        

            return (
                <div className="boarding-pass-container">
                    <button id="download-button" onClick={handleDownload}>
                        Save Ticket
                    </button>
        
                    <div className="boarding-pass">
                        <div className="dotted-line"></div>
                        <div className="horizontal-line"></div>
                        <div className="header"></div>
        
                        <div className="Board">
                            <div className="Board-container">
                                <div>
                                    <strong>BOARDIFY</strong>
                                </div>
                            </div>
        
                            <div className="details">
                                <div className="details-container">
                                    <div>
                                        <strong>Passenger:</strong> <span>{user.name}</span>
                                    </div>
                                    <div>
                                        <strong>Flight:</strong> <span>{user.flight}</span>
                                    </div>
                                    <div>
                                        <strong>From:</strong> <span>{user.from}</span>
                                    </div>
                                </div>
        
                                <div className="details-container">
                                    <div>
                                        <strong>To:</strong> <span>{user.to}</span>
                                    </div>
                                    <div>
                                        <strong>Carrier:</strong> <span>{user.carrier}</span>
                                    </div>
                                    <div>
                                        <strong>Date:</strong> <span>{user.date}</span>
                                    </div>
                                    
                                </div>
        
                                <div className="top-tracks-container">
                                    <div>
                                        <strong>Top Tracks:</strong>
                                        <div>{user.topTracks.join(', ')}</div>
                                    </div>
                                    </div>
                                <div className="qr-code">
                            <img
                                id="barcode"
                                src={`https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(
                                    `Name:${user.name}|Flight:${user.flight}|From:${user.from}|To:${user.to}|Carrier:${user.genre}|Date:${user.date}`
                                )}&code=Code128&translate-esc=on`}
                                alt="Barcode"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}