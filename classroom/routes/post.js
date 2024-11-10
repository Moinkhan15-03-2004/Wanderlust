const express = require("express");
const router = express.Router();

// Index - users (GET all users)
router.get("/", (req, res) => {
    res.send("GET for posts");
});

// Show - users (GET specific user by ID)
router.get("/:id", (req, res) => {
    res.send("GET for Show posts");
});

// Post - users (Create a new user)
router.post("/", (req, res) => {
    res.send("POST for creating posts");
});

// Put - users (Update an existing user)
router.put("/:id", (req, res) => {
    res.send("PUT for updating posts");
});

module.exports = router;
