import { html2canvas } from 'html2canvas';
import '../styles/BoardingPass.css';
import { useState, useEffect } from "react";

export default function BoardingPass({ user }) {

    // Function fetch tracks
    async function fetchUserTopTracks(token) {
        try {
            const trackResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const trackData = await trackResponse.json();

            const topTracks = trackData.items.map(track => ({
                name: track.name,
                artist: track.artists.map(artist => artist.name).join(' , ')
            }));

            return topTracks;
        } catch (error) {
            console.error('Error retrieving top tracks:', error);
            return [];
        }
    }

    // update top tracks on boarding pass
    const updateTopTracksBoardingPass = (topTracks) => {
        if (topTracks.length > 0) {
            setTopTracks(topTracks.map(track => `${track.name} by ${track.artist}`).join(', '));
        } else {
            setTopTracks('No top tracks found.');
        }
    };

    // State for the top tracks
    const [topTracks, setTopTracks] = useState('');

    // Function to initialize boarding pass data
    async function initializeBoardingPass() {
        const token = localStorage.getItem('spotify_token');
        const userId = localStorage.getItem('spotify_user_id');

        if (!token || !userId) {
            console.error('Access token or user ID not found in local storage.');
            return;
        }

        // Fetch top tracks and artists
        const topTracks = await fetchUserTopTracks(token);

        // Update the boarding pass with the fetched data
        updateTopTracksBoardingPass(topTracks);
    }

    // Call to initialize the boarding pass after the component mounts
    useEffect(() => {
        initializeBoardingPass();
    }, []);

    const handleDownload = () => {
        const boardingPassElement = document.querySelector('.boarding-pass');

        if (!boardingPassElement) {
            console.error("Boarding pass content not found");
            return;
        }

        html2canvas(boardingPassElement).then(canvas => {
            // Convert to image PNG
            const image = canvas.toDataURL('image/png');

            // Create a temp link to download the image
            const link = document.createElement('a');
            link.href = image;
            link.download = 'boardify.png'; // Name of the download
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