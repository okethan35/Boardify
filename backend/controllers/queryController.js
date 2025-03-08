const User = require('../models/User');  // Import the User model (adjust the path as needed)

exports.searchUsers = async (req, res) => {
  try {
    const query = req.query.query;
  
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }
  
    const users = await User.find({
      username: { $regex: query, $options: 'i' }
    }).select('username');
  
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
