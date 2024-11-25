const mongoose = require("mongoose");

const conn = async () => {
    try {
        await mongoose.connect("mongodb+srv://monalib117:mpb117@cluster0.7gxxo.mongodb.net/");
            console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

// Call the connection function when starting the server
conn();
