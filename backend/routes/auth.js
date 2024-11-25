const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// SIGN UP (Register)
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Log the incoming data for debugging
        console.log("Received data:", req.body);

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" }); // Return 400 for bad request
        }

        // Encrypt the password
        const hashpassword = bcrypt.hashSync(password);

        // Create a new user
        const user = new User({ email, username, password: hashpassword });

        // Log the user object before saving
        console.log("User to be saved:", user);

        // Save the user to the database
        await user.save();
        res.status(201).json({ message: "Sign up successful" }); // Return 201 for resource created
    } catch (error) {
        console.error("Error occurred during registration:", error);

        // Differentiate error messages based on type
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation failed", error: error.message });
        }
        res.status(500).json({ message: "An internal error occurred", error: error.message });
    }
});


// SIGN IN
router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).json({ message: "Please sign up first" });
        }

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(200).json({ message: "Password is not correct" });
        }

        const { password, ...others } = user._doc;
        return res.status(200).json({ others });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(200).json({ message: "User Already exists" });
    }
});

module.exports = router;
