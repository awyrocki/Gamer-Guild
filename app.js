require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./db");
const app = express();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "127.0.0.1";

const userController = require("./controllers/user");
const guildController = require("./controllers/guild");
const messageController = require("./controllers/message");
const sessionValidation = require("./middleware/token");

app.use(cors());
app.use(express.json());

app.use("/user", userController);
app.use("/guild", guildController);
app.use("/message", messageController);

app.listen(PORT, HOST, () => {
    dbConnect()
    console.log(`[server] listening on ${HOST}:${PORT}`)
})