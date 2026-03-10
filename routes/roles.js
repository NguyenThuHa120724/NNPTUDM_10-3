const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Role = require("../models/Role");

// CREATE ROLE
router.post("/", async(req, res) => {
    try {
        const role = new Role(req.body);
        const result = await role.save();
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET USERS BY ROLE
router.get("/:id/users", async(req, res) => {
    const users = await User.find({
        role: req.params.id
    }).populate("role");

    res.json(users);
});

module.exports = router;