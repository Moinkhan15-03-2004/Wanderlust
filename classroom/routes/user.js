const express = require("express");
const router = express.Router();

// Index - users
router.get("/", (req, res) => {
    res.send("GET for users");
});

// Show - users
router.get("/:id", (req, res) => {
    res.send("GET for Show users");
});

// Post - users
router.post("/", (req, res) => {
    res.send("POST for creating users");
});

// Delete - users
router.delete("/:id", (req, res) => {
    res.send("DELETE for removing users");
});

module.exports = router;
