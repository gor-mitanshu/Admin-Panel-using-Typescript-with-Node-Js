const mongoose = require('mongoose')
const User = new mongoose.Schema({
     email: { type: String },
     email_verified: { type: Boolean },
     family_name: { type: String },
     given_name: { type: String },
     name: { type: String },
     nickname: { type: String },
     picture: { type: String },
     phone_number: { type: Number },
     sub: { type: String },
     updated_at: { type: String },
     // password: { type: String },
}, { timestamps: true });

const model = new mongoose.model("Panel-Project", User)
module.exports = model