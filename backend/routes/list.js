const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const List = require("../models/list");

//create
router.post("/addTask", async (req, res) => {
    try {
        const { title, body, id } = req.body;

        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        // Find the user by ID
        const existUser = await User.findById(id);
        if (!existUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a new task (list)
        const list = new List({
            title,
            body,
            user: existUser._id, // Associate the task with the user
        });

        // Save the task
        await list.save();

        // Add the list to the user's task array
        existUser.list.push(list);
        await existUser.save();

        return res.status(200).json({ message: "Task added successfully", list });
    } catch (error) {
        console.error("Error adding task:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});


//update
router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body, email } = req.body;

        // Log the task ID for debugging purposes
        console.log("Updating task with ID:", req.params.id);

        // Find the task (list) by its ID
        const list = await List.findById(req.params.id);

        // If task doesn't exist, return 404
        if (!list) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Update the task (title and body)
        list.title = title || list.title;
        list.body = body || list.body;

        // Save the updated task
        await list.save();

        // Send success response
        return res.status(200).json({ message: "Task updated", list });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

//Deleteded

router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const taskId = req.params.id; // Extract the task ID from the URL
        console.log("Task ID received:", taskId);

        // Validate and convert taskId to ObjectId
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ message: "Invalid Task ID format" });
        }
        const objectId = new mongoose.Types.ObjectId(taskId);

        // Find and delete the task
        const taskToDelete = await List.findByIdAndDelete(objectId);
        if (!taskToDelete) {
            console.error(`Task not found for ID: ${taskId}`);
            return res.status(404).json({ message: "Task not found" });
        }

        // Remove the task reference from the user's list
        const updatedUser = await User.findOneAndUpdate(
            { _id: { $in: taskToDelete.user } }, // Find the user associated with the task
            { $pull: { list: objectId } }, // Remove the task reference
            { new: true } // Return updated user
        );

        if (!updatedUser) {
            console.error(`User not found for task ID: ${taskId}`);
            return res.status(404).json({ message: "User not found for this task" });
        }

        console.log("Task deleted successfully and user updated");
        return res.status(200).json({ message: "Task deleted successfully", taskToDelete, updatedUser });
    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

//getTask
router.get("/getTasks/:id", async (req, res) => {
    try {
        const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
        
        if (list.length !== 0) {
            res.status(200).json({ list: list });
        } else {
            res.status(200).json({ message: "No Tasks" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
