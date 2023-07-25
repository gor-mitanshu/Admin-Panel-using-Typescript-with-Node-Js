const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/UserSchema');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const colors = require("colors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

mongoose.connect(process.env.MONGO_URL).then(e => {
     console.log(`Connection established with Database`.bgGreen.white)
});
const PORT = process.env.PORT || 9936;
app.listen(PORT, () => {
     console.log(`connection successfull with ${PORT}`.bgWhite.white)
});
app.get('/', (req, res) => {
     res.send(`hello API`)
});


// Admin Register
app.post('/api/adminregister', async (req, res) => {
     try {
          let existingadmin = await User.findOne({ email: req.body.email });
          if (!!existingadmin) {
               return res.status(409).send({
                    success: false,
                    message: "Admin Already Registered!"
               })
          } else {
               const admin = new User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: await bcrypt.hash(req.body.password, 10),
                    role: "admin",
               })
               await admin.save();
               return res.status(200).send({
                    success: true,
                    message: "Successfully Registered",
                    admin: admin
               })
          }
     } catch (error) {
          console.log(error);
          res.status(404).send({
               success: false,
               message: "Something went wrong",
               error
          });
     }
});

app.get('/api/login', async (req, res) => {
     try {
          const admin = await User.findOne({ email: req.body.email });
          if (!!admin) {
               const hashedPassword = await bcrypt.compare(req.body.password, admin.password);
               const token = jwt.sign({ admin }, "auth",);
               if (!!hashedPassword) {
                    return res.status(200).send({
                         success: true,
                         message: "Login Successful",
                         result: { token }
                    })
               } else {
                    return res.status(401).send({
                         success: false,
                         message: "Password does not match",
                         error
                    })
               }
          } else {
               return res.status(400).send({
                    success: false,
                    message: "Email is not Registered",
                    error
               })
          }
     } catch (error) {
          console.log(error);
          res.status(404).send({
               success: false,
               message: "Something went wrong",
               error
          });
     }
});