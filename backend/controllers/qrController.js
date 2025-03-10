const qrcode = require('qrcode'); // Import the QR code library
const API_URL = process.env.REACT_APP_API_URL; 

// Controller function to generate a QR code for a user's unique link
exports.generateQRCode = async (req, res) => {
  try {
    const { username } = req.params; // Get username from URL parameter

    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    // Construct the URL where the QR code should redirect to
    const url = `${API_URL}/qr/${username}`;

    // Generate QR code for the constructed URL
    const qrCode = await qrcode.toDataURL(url); // This will generate the QR code as a base64 PNG image

    // Return the generated QR code as base64
    res.json({ qrCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
