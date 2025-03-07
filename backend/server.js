const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error: ", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));