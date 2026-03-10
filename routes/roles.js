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

// GET ALL ROLES
router.get("/", async(req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ROLE BY ID
router.get("/:id", async(req, res) => {
    try {
        const role = await Role.findById(req.params.id);

        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        res.json(role);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE ROLE
router.put("/:id", async(req, res) => {
    try {
        const role = await Role.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );

        res.json(role);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE ROLE
router.delete("/:id", async(req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        res.json(role);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET USERS BY ROLE
router.get("/:id/users", async(req, res) => {
    try {
        const users = await User.find({
            role: req.params.id
        }).populate("role");

        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;