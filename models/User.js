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
        admin: {
            type: Boolean,
            required: false
        }
    }, 
    {timestamps: true}
)

module.exports = mongoose.model("User", User)