require("dotenv").config();
const config = require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/v1");
const { errorHandler } = require("./middleware/errorHandler");

const PORT = config.port || 3000;

const app = express();

// Middleware
// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

// caching responses with Express, disable it temporarily
// app.use((req, res, next) => {
//     res.set("Cache-Control", "no-store");
//     next();
// });

// MongoDB Connection
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => console.log("MongoDB Connected")).catch(err => console.error("MongoDB Connection Error:", err.message));

// Routes
app.use("/api/v1", routes);

// handle error
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});