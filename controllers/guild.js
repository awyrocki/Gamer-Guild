const router = require("express").Router()
const Guild = require("../models/Guild")

router.post("/create", async (req, res) => {
    try {
        const { name, description, addedUsers, createdBy } = req.body
        if (!name || !description ||  !createdBy) throw Error("Provide all criteria")
        const newGuild = new Guild({ name, description, addedUsers, createdBy })
        await newGuild.save()

        const foundGuild = await Guild.findOne({ name: name})
        foundGuild.addedUsers.push(createdBy)
        foundGuild.save()
        res.status(201).json({
            message: `Guild created`,
            newGuild
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/", async (req, res) => {
    try {
        const guild = await Guild.find()
        res.status(200).json(guild)
    } catch (err) {
        res.status(500).json(err) 
    }
}) 

router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params
        // added the ability to add and remove users
        const key = Object.keys(req.body)
        const foundGuild = await Guild.findById(id)
        if (key.toString() === 'addedUsers') {
            foundGuild.addedUsers.push(req.body.addedUsers)
            foundGuild.save()
        } else {
            const guild = await Guild.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            })
        }
        if (!guild) throw Error("guild not found")
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