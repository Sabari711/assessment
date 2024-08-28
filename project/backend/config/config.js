const Mongoose = require('mongoose');
const schema = Mongoose.Schema;
const model = Mongoose.model;
const ObjectId = Mongoose.Schema.Types.ObjectId;

const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, '../.env') })
module.exports = {
    HOST_URL: "mongodb+srv://sabari:XIM4Zfk2p9a5G8xi@cluster0.5nqc6.mongodb.net/assesment",
    PORT: process.env.APP_PORT,
    schema,
    ObjectId,
    model,
    PASSWORD_SECRET : "awesrdtcfyvgubh!@#$%asc",
    JWT_SECRET : "werdtfyguhi!@#$zxcvb"
}