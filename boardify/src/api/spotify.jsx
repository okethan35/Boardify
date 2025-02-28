const API_URL = process.env.REACT_APP_API_URL; 

const connectSpotify = async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/api/auth`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the JWT token
            }
        });

        const data = await response.json();
        if (data.url) {
            window.location.href = data.url; // Redirect to Spotify authorization URL
        }
        console.log(data);
    } catch (error) {
        console.error("Error authenticating with Spotify", error);
    }
};