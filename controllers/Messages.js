const router = require("express").Router()
const Messages = require("../models/Message")
const sessionValidation = require("../middleware/token")
const Message = require("../models/Message")

// Find a message using guild name
router.get("/:guildname", async (req, res) => {
    try {
        const { guild: guild } = req.params
        const findMessage = await Message.findOne({ guild })
        if(!findMessage) throw Error("none found")
        res.status(200).json(findMessage)
    } catch (err) {
        restart.status(500).json({
            message: `${err}`
        })
    }
})

// Create a message inside a guild room
router.post("/create", async (req, res) => {
    try {
        const { user, guild, body } = req.body
        if (!user || !guild || !body) throw Error("Please include all criteria")
        const newMessage = new Messages({ user, guild, body })
        await newMessage.save()
        res.status(201).json({
            message: 'message saved',
            newMessage
        })
    } catch (err) {
        err.name === "ValidationError"
        ? res.status(400).json({
            message: `Data type no good`
        })
        : res.status(500).json({
            message: `${err}`
        }) 
    }
})

// Update message via id
router.put("/update/:id", async (req, res) => {
    try {
        const { id: _id } = req.params
        const updateMessage = req.body
        const updated = await Messages.updateOne({ _id}, {$set: updateMessage})
        if (!updated) throw Error("ID not found")
        res.status(200).json({
            message: `Item updated`,
            updateMessage
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

// Delete a message by id
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id: _id } = req.params
        const deleteMessage = await Messages.findByIdAndDelete(_id)
        if(!deleteMessage) throw Error("ID not found")
        res.status(200).json({
            message: `Message deleted`,
            deleteMessage
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

module.exports = router;