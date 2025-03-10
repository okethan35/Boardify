import { html2canvas } from 'html2canvas';
import '../styles/BoardingPass.css';
import { useState, useEffect } from "react";
import { getUserData } from '../api/spotify';

export default function BoardingPass({ user }) {
    const [data, setData] = useState();
    const [showPass, setShowPass] = useState(false);
    const [topTracks, setTopTracks] = useState('');
    const [spotifyBarcode, setSpotifyBarcode] = useState('');
    const [spotifyUsername, setSpotifyUsername] = useState('');
    const [fromArtist, setFromArtist] = useState('');
    const [toArtist, setToArtist] = useState('');
    const [curDate, setCurDate] = useState('');
    const [flightNumber, setFlightNumber] = useState(0); 
    const [flightCode, setFlightCode] = useState('');

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

    //function fetch tracks
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

    //fetch user's profile name for passenger
    async function fetchSpotifyUserProfile(token) {
        try {
            const profileResponse = await fetch('https://api.spotify.com/v1/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const profileData = await profileResponse.json();
            return profileData.display_name; // Spotify user's display name
        } catch (error) {
            console.error('Error retrieving Spotify user profile:', error);
            return '';
        }
    }

    // update top tracks on boarding pass
    const updateTopTracksBoardingPass = (topTracks) => {
        setTopTracks(topTracks.length > 0 ?
            topTracks.map(track => `${track.name} by ${track.artists}`).join(', ') :
            'Top tracks not found.'
        );
    };

    // Function to format the current date
    const getFormattedDate = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    // Function to initialize boarding pass data
    async function initializeBoardingPass() {
        const token = localStorage.getItem('spotify_token');
        if (!token) {
            console.error('Access token is not found');
            return;
        }

        //fetch user's name
        const username = await fetchSpotifyUserProfile(token);
        setSpotifyUsername(username);

        //fetch top tracks
        const topTracks = await fetchUserTopTracks(token);
        updateTopTracksBoardingPass(topTracks);
        
        //set "From" and "To" artists
        if (topTracks.length > 0) {
            //first top track's artist for "From"
            const firstTrackArtist = topTracks[0].artists;
            setFromArtist(firstTrackArtist);

            // 5th top track's artist for "To"
            if (topTracks.length >= 5) {
                const fifthTrackArtist = topTracks[4].artists;
                setToArtist(fifthTrackArtist);
            } else {
                setToArtist('No 5th track available');
            }
        }

        //generate spotify barcode
        if (topTracks.length > 0) {
            const spotifyUrl = topTracks[0].url;
            const barcodeUrl = appendLastPartOfUrl(spotifyUrl);
            setSpotifyBarcode(barcodeUrl); //setting spotify barcode url
        }

        //set current date for pass
        const formattedDate = getFormattedDate();
        setCurDate(formattedDate);

        // Increment flight number and generate flight code
        const newFlightNumber = flightNumber + 1;
        setFlightNumber(newFlightNumber);
        localStorage.setItem('flightNumber', newFlightNumber.toString());

        // Generate flight code (e.g., A1, B2)
        const randomLetter = generateRandomLetter();
        const newFlightCode = `${randomLetter}${newFlightNumber}`;
        setFlightCode(newFlightCode);
    }

    //to generate a random uppercase letter (A-Z)
    const generateRandomLetter = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return letters[Math.floor(Math.random() * letters.length)];
    };

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
                                    <strong>Passenger:</strong> <span>{spotifyUsername}</span>
                                </div>
                                <div>
                                    <strong>Flight:</strong> <span>{flightCode}</span>
                                </div>
                                <div>
                                    <strong>From:</strong> <span>{fromArtist}</span>
                                </div>
                            </div>

                            <div className="details-container">
                                <div>
                                    <strong>To:</strong> <span>{toArtist}</span>
                                </div>
                                <div>
                                    <strong>Carrier:</strong> <span>Boardify</span> 
                                </div>
                                <div>
                                    <strong>Date:</strong> <span>{curDate}</span>
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