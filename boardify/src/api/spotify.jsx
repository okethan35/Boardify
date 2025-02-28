const API_URL = process.env.REACT_APP_API_URL; 

const connectSpotify = async () => {
    console.log("YAY");
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
        console.log(data);
    } catch (error) {
        console.error("Error authenticating with Spotify", error);
    }
};