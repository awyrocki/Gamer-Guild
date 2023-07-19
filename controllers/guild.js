const express = require("express")
const router = express.Router()
const Guild = require("../models/Guild")

router.post("/create", async (req, res) => {
    try {
        const guild = await Guild.create(req.body)
        res.status(201).json(guild)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/", async (req, res) => {
    try {
        const guild = await Guild.find()
        res.json(guilds)
    } catch (err) {
        res.status(500).json(err) 
    }
}) 

router.put("/update/:id", async (req, res) => {
    try {
        const guild = await Guild.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        if (!guild) {
            return res.status(404).json(err)
        }
        res.json(guild)
    } catch(err) {
        res.status(500).json(err)
    }
} )

router.delete("/delete/:id", async (req, res) => {
    try {
        const guild = await Guild.findByIdAndDelete(req.params.id);
        if (!guild) {
            return res.status(404).json({ error: "Guild not found" });
    }
        res.json({ message: "Guild deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete Guild" });
    }
});

router.get("/:user", async (req, res) => {
    try {
        const guilds = await Guild.find({ addedUsers: req.params.user });
        res.json(guilds);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve Guilds for the user" });
    }
});

module.exports = router