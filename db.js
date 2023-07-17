const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL

// Connect to DB
const dbConnect = async () => {
    try {
        mongoose.connect(DB_URL, {
            useNewUrlPaster: true,
            useUnifiedTopology: true
        })
        console.log(`[db] connected to ${DB_URL}`);
    } catch (err) {
        console.log(`[db] error: ${err}`)
    }
}

module.exports = { dbConnect, mongoose }