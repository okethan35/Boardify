import { html2canvas } from 'html2canvas';
import '../styles/BoardingPass.css';
import { useState, useEffect } from "react";
import { getUserData } from '../api/spotify';

export default function BoardingPass({ user }) {
    const [data, setData] = useState();
    const [showPass, setShowPass] = useState(false);
    const [topTracks, setTopTracks] = useState('');
    const [spotifyBarcode, setSpotifyBarcode] = useState('');

    //function to append the last part of the Spotify URL
    const appendLastPartOfUrl = (url) => {
        const baseUrl = "https://scannables.scdn.co/uri/plain/jpeg/000000/white/640/spotify:track:";
        const lastPart = url.split('/').pop(); //get last part of the URL
        return `${baseUrl}${lastPart}`;
    };

    //only initialize data when boarding pass appears
    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUserData(); //userdata
            setData(userData);
            console.log("DATA:", userData);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (showPass) initializeBoardingPass();
    }, [showPass]);

    // Function fetch tracks
    async function fetchUserTopTracks(token) {
        try {
            const trackResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const trackData = await trackResponse.json();

            return trackData.items.map(track => ({
                name: track.name,
                artists: track.artists.map(artist => artist.name).join(', '),
                url: track.external_urls.spotify // Include Spotify URL
            }));

        } catch (error) {
            console.error('Error retrieving top tracks:', error);
            return [];
        }
    }

    // update top tracks on boarding pass
    const updateTopTracksBoardingPass = (topTracks) => {
        setTopTracks(topTracks.length > 0 ?
            topTracks.map(track => `${track.name} by ${track.artists}`).join(', ') :
            'Top tracks not found.'
        );
    };

    // Function to initialize boarding pass data
    async function initializeBoardingPass() {
        const token = localStorage.getItem('spotify_token');
        if (!token) {
            console.error('Access token is not found');
            return;
        }
        const topTracks = await fetchUserTopTracks(token);
        updateTopTracksBoardingPass(topTracks);

        //generate spotify barcode
        if (topTracks.length > 0) {
            const spotifyUrl = topTracks[0].url;
            const barcodeUrl = appendLastPartOfUrl(spotifyUrl);
            setSpotifyBarcode(barcodeUrl); //setting spotify barcode url
        }
    }

    //handle download
    const handleDownload = () => {
        const boardingPassElement = document.querySelector('.boarding-pass');

        if (!boardingPassElement) {
            console.error("Boarding pass content not found");
            return;
        }

        html2canvas(boardingPassElement).then(canvas => {
            //convert to image PNG
            const image = canvas.toDataURL('image/png');

            //create a temp link to download the image
            const link = document.createElement('a');
            link.href = image;
            link.download = 'boardify.png'; // Name of the download
            link.click();
        });
    };

    return (
        <div className="boarding-pass-container">
            {/* Button visible */}
            {!showPass && (
                <button id="show-button" onClick={() => setShowPass(true)}>
                    Show Boarding Pass
                </button>
            )}

            {/* show boarding pass when button is clicked*/}
            {showPass && (
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
                                    <div>{topTracks}</div>
                                </div>
                            </div>

                            <div className="bar-code">
                                {spotifyBarcode && (
                                    <img
                                        id="barcode"
                                        src={spotifyBarcode}
                                        alt="Spotify Barcode"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <button id="download-button" onClick={handleDownload}>
                        Save Ticket
                    </button>
                </div>
            )}
        </div>
    );
}