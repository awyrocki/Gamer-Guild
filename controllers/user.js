const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SALT = Number(process.env.SALT);
const JWT_KEY = process.env.JWT_KEY;
const sessionValidation = require("../middleware/token")

// ? REGISTER USER-------------------------------------------------//
router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password, userName } = req.body;

        if (!firstName || !lastName || !email || !password || !userName) {
            throw Error("All fields required");
        }
        // making empty values for not required
        const steamId = "";
        const bio = "";
        const admin = false;

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, SALT),
            userName,
            steamId,
            bio,
            admin
        });
        // creating user token
        await newUser.save();
        const token = jwt.sign(
            { _id: newUser._id },
            JWT_KEY,
            { expiresIn: 60 * 60 * 24 }
        );
        
        // sending basic user to front end for local storage/ session storage
        let foundUser = await User.findOne({ email });
        const id = foundUser._id;
        const user = foundUser.userName;
        const steamID = foundUser.steamId;
        
        res.status(201).json({
            message: "User created",
            token,
            user,
            id,
            steamID
        });
        
    } catch (err) {
        res.status(500).json({
            message: `${err}`
        })
        
    }
});

// ? LOGIN USER -------------------------------------------------------
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // searches for user of email
        let foundUser = await User.findOne({ email });

        if (!foundUser) throw Error("User not Found");

        const verifyPassword = await bcrypt.compare(password, foundUser.password);

        if (!verifyPassword) throw Error("Incorrect Password");

        const token = jwt.sign(
            { _id: foundUser._id },
            JWT_KEY,
            { expiresIn: 60 * 60 * 24 }
        )
        
        const id = foundUser._id;
        const userName = foundUser.userName;
        const steamID = foundUser.steamId;

        res.status(200).json({
            message: "Login succesful",
            token,
            userName,
            id,
            steamID
            
        });
    } catch (err) {
        res.status(500).json({
            message: `${err}`
        })
        
    }
})

// ? GET USER BY NAME --------------------------------------------//
router.get("/username/:name", sessionValidation,  async (req, res) => {
    try {
        const { name } = req.params;
        const singleUser = await User.find({ "userName": name });
        if(!singleUser) throw Error("User not Found");

        // data to send back
        const id = singleUser[0]._id
        const userName = singleUser[0].userName;
        const steamID = singleUser[0].steamId;
        const bio = singleUser[0].bio;

        res.status(200).json({
            message: "user found",
            id,
            userName,
            steamID,
            bio
        });
    } catch (err) {
        res.status(500).json({
            message: `${err}`
        })
    }
})

// ? GET USER BY ID ------------------------------------------//
router.get("/:id", sessionValidation, async (req, res) => {
    try {
        const { id: _id } = req.params;
        const singleUser = await User.findOne({ _id });
        if(!singleUser) throw Error("User not Found");
        res.status(200).json(singleUser);
    } catch (err) {
        res.status(500).json({
            message: `${err}`
        })
    }
})

// ! UPDATE USER BY ID-------------------------------------------------//
router.put("/update/:id", sessionValidation, async (req, res) => {
    try {
        const { id: _id } = req.params;

        const newInfo = await req.body

        const foundUser = await User.findOne({ _id });

        if(!foundUser) throw Error("User not Found");

        const updatedUser = await User.updateOne({ _id }, { $set: newInfo})

        if (updatedUser.matchedCount === 0) throw Error("Specify Updated Info");

        res.status(200).json({
            message: "User updated",
            updatedUser
        })
    } catch (err) {
        res.status(500).json({
            message: `${err}`
        })
    }
});

// ! UPDATE PASSWORD
router.put("/updatepassword/:id", sessionValidation, async (req, res) => {
    try {
        const { id: _id } = req.params;

        const newPassword = await req.body.password

        const password = {
            password: bcrypt.hashSync(newPassword, SALT)
        }
        
        const foundUser = await User.findOne({ _id });

        if(!foundUser) throw Error("User not Found");

        const updatedUser = await User.updateOne({ _id }, { $set: password})

        if (updatedUser.matchedCount === 0) throw Error("Specify Updated Info");

        res.status(200).json({
            message: "User updated",
            updatedUser
        })
    } catch (err) {
        res.status(500).json({
            message: `${err}`
        })
    }
});

// ! DELETE USER BY ID-------------------------------------//
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id: _id } = req.params;

        const deleteUser = await User.findByIdAndDelete({ _id });
    
        if (!deleteUser) throw Error("ID not found");

        res.status(200).json({
            message: "User Deleted"
        })

    } catch (err) {
        res.status(500).json({
            message: `${err}`
        })
    }
})

module.exports = router;