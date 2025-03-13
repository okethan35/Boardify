const qrcode = require('qrcode'); // Import the QR code library


exports.generateQRCode = async (req, res) => {
  try {
    const { username } = req.params;
    console.log(username);
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }
    const FRONTEND_URL = req.headers.origin
    // Construct the URL where the QR code should redirect to
    const url = `${FRONTEND_URL}/qr/${username}`;
    const qrCode = await qrcode.toDataURL(url);
    res.json({ qrCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};