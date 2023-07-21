const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SALT = Number(process.env.SALT);
const JWT_KEY = process.env.JWT_KEY;

// ? REGISTER USER-------------------------------------------------//
router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password, userName, isAdmin } = req.body;

        if (!firstName || !lastName || !email || !password || !userName) {
            throw Error("All fields required");
        }

        console.log(firstName)
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, SALT),
            userName,
            isAdmin
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
        const name = foundUser.firstName;
        const id = foundUser._id;
        
        res.status(201).json({
            message: "User created",
            newUser,
            token,
            name,
            userName,
            id
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

        const name = foundUser.firstName;
        const id = foundUser._id;

        const userName = foundUser.userName;
      
        if (foundUser.steamId !== "") {
            const steamID = foundUser.steamId
        } else {
            const steamID = ""
        }

        res.status(200).json({
            message: "Login succesful",
            token,
            name,
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

// ? GET USER BY ID ------------------------------------------//
router.get("/:id", async (req, res) => {
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
router.put("/update/:id", async (req, res) => {
    try {
        const { id: _id } = req.params;

        const newInfo = await req.body
        console.log(newInfo) // ! CONSOLE LOG FLAG
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