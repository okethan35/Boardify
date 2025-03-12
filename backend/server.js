const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const queryRoutes = require('./routes/queryRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();
const app = express();
app.use(express.json({ limit: "10mb"}));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cors());

app.options("*", cors());

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/query', queryRoutes);
app.use('/post', postRoutes);

mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error: ", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));