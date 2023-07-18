const { mongoose } = require("../db")

const Messages = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true
        },
        guild: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        flagged: {
            type: Boolean,
            required: false
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("messages", Messages)