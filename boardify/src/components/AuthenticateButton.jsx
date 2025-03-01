import spotify_logo_black from '../assets/Spotify_Full_Logo_Black.png'
import '../styles/AuthenticateButton.css'
import { testButton, connectSpotify } from '../api/spotify.jsx';

export default function AuthenticateButton(){

    const handleClick = async () => {
        console.log("First Press");
        try {
            const response = await connectSpotify(); // Call the backend to get the Spotify URL
            if (response.url) {
                window.location.href = response.url; // Redirect the user to Spotify
            } else {
                console.error("No URL returned from the backend");
            }
        } catch (error) {
            console.error("Error connecting to Spotify:", error);
        }
    };

    return (
        <>
            <button className='authenticate' onClick={handleClick}>
                Connect to
                <img src={spotify_logo_black} alt='Spotify Logo'/>
            </button>
        </>
    )
}