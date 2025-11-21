require("dotenv").config();
const mongoose = require("mongoose");

const conn = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
            console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

// Call the connection function when starting the server
conn();
