const { mongoose } = require("../db")

const User = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        steamId: {
            type: String,
            required: false
        },
        bio: {
            type: String,
            required: false
        },
        profilePic: {
            type: String,
            required: false
        },
        admin: {
            type: Boolean,
            required: false
        }
    }, 
    {timestamps: true}
)

module.exports = mongoose.model("User", User)