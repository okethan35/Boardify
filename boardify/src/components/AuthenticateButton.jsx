import spotify_logo_black from '../assets/Spotify_Full_Logo_Black.png'
import '../styles/AuthenticateButton.css'
import { connectSpotify } from '../api/spotify.jsx'

export default function AuthenticateButton(){


    return (
        <>
            <button className='authenticate' onClick={connectSpotify}>
                Connect to
                <img src={spotify_logo_black} alt='Spotify Logo'/>
            </button>
        </>
    )
}