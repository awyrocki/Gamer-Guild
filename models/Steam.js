const { mongoose } = require("../db");

const Steam = new mongoose.Schema(
    {
        steamId: {
            type: String,
            unique: true,
            require: true
        },
        userName: {
            type: String,
            require: true
        },
        avatar: {
            type: String,
            require: true
        }
    }
)

module.exports = mongoose.model("steam", Steam)