const express = require("express");
const router = express.Router();
const User = require("../models/User");


// GET all users (query username)
router.get("/", async(req, res) => {
    try {
        const username = req.query.username;

        let filter = {};

        if (username) {
            filter.username = username;
        }

        const users = await User.find(filter).populate("role");

        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});


// GET user by id
router.get("/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("role");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});


// CREATE user
router.post("/", async(req, res) => {
    try {
        const user = new User(req.body);

        const result = await user.save();

        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});


// UPDATE user  
router.put("/:id", async(req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);

    } catch (err) {
        res.status(500).json(err);
    }
});


// SOFT DELETE user
router.delete("/:id", async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id, { status: false }, { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});


// ENABLE user
router.post("/enable", async(req, res) => {
    try {
        const { email, username } = req.body;

        const user = await User.findOneAndUpdate({ email, username }, { status: true }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});


// DISABLE user
router.post("/disable", async(req, res) => {
    try {
        const { email, username } = req.body;

        const user = await User.findOneAndUpdate({ email, username }, { status: false }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;