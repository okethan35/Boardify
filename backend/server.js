const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require('./models/User.js');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error: ", err));

app.post('/register', async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists"});
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await User.findOne({ email });
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        
        res.json({ token });
    } catch(error){
        res.status(500).json({ message: "Error logging user in" });
    }
});
// Front-end does headers: { Authorization: `Bearer ${token}` }
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Access Denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403). json({ message: "Invalid Token" });

        req.user = decoded;
        next();
    })
}

app.post("/protected", authenticateUser, (req, res) => {
    res.json({ message: "Access Granted", userID: req.user.userID });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));