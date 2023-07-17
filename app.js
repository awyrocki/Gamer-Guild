require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./db");
const app = express();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "127.0.0.1";

app.use(cors());
app.use(express.json());

app.listen(PORT, HOST, () => {
    dbConnect()
    console.log(`[server] listening on ${HOST}:${PORT}`)
})