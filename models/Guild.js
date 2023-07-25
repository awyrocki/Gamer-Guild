const { mongoose } = require("../db")

const Guild = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        addedUsers: [{
            type: String,
            required: false
        }],
        createdBy: {
            type: String,
            required: false
        }
    }, 
    {timestamps: true}
)

module.exports = mongoose.model("guild", Guild)