const mongoose = require('mongoose')
const User = new mongoose.Schema({
     firstname: { type: String, required: true },
     lastname: { type: String, required: true },
     phone: { type: Number, required: true },
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },
     role: { type: String }
}, { timestamps: true })
const model = new mongoose.model("Panel-Project", User)
module.exports = model