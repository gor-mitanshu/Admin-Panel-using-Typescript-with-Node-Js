const mongoose = require('mongoose')
const User = new mongoose.Schema({
     email: { type: String, required: true },
     email_verified: { type: Boolean },
     family_name: { type: String },
     given_name: { type: String },
     name: { type: String },
     nickname: { type: String },
     picture: { type: String },
     phone_number: { type: Number },
     sub: { type: String, required: true, unique: true },
     updated_at: { type: String },
     user_metadata: {
          first_name: String,
          last_name: String,
          phone_number: Number,
          email: String
     },
     app_metadata: {
          role: String,
     },
}, { timestamps: true });

const model = new mongoose.model("Panel-Project", User)
module.exports = model