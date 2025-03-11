import { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL; 

export default function QRCode({ username }) {
    const [qrCode, setQRCode] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!username) return;

        const fetchQRCode = async () => {
            try {
                const response = await fetch(`${API_URL}/qr/${username}`);
                const data = await response.json();

                if (response.ok) {
                    setQRCode(data.qrCode); // QR Code as base64
                } else {
                    setError(data.message || "Failed to load QR code");
                }
            } catch (err) {
                setError("Error fetching QR code");
            }
        };

        fetchQRCode();
    }, [username]);

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {qrCode ? (
                <img src={qrCode} alt="QR Code" style={{ width: "200px", height: "200px" }} />
            ) : (
                !error && <p>Loading QR Code...</p>
            )}
        </div>
    );
}
