const express = require('express');
const app = express();
require('dotenv').config();
const cors = require("cors");
app.use(cors());
const mongoose = require('mongoose');
const User = require('./models/UserSchema');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const colors = require("colors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleWare = require("./middleware/authMiddleware");

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
               const user = new User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: await bcrypt.hash(req.body.password, 10),
                    role: "admin",
               })
               await user.save();
               return res.status(200).send({
                    success: true,
                    message: "Successfully Registered",
                    user: user
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

// Login
app.post('/api/login', async (req, res) => {
     try {
          const user = await User.findOne({ email: req.body.email });
          if (!!user) {
               const hashedPassword = await bcrypt.compare(req.body.password, user.password);
               if (!!hashedPassword) {
                    const expiresIn = 10;
                    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn });
                    return res.status(200).send({
                         success: true,
                         message: "Login Successful",
                         result: { token, expiresIn }
                    })
               } else {
                    return res.status(401).send({
                         success: false,
                         message: "Invalid Password",
                    })
               }
          } else {
               return res.status(400).send({
                    success: false,
                    message: "User Not Found",
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

// // Get user details
// app.get('/api/user', async (req, res) => {
//      try {
//           const token = req.headers.authorization;

//           if (!token) {
//                return res.status(401).send({
//                     success: false,
//                     message: "Authorization header missing"
//                });
//           }

//           const tokenWithoutBearer = token.replace('Bearer ', '');
//           const data = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

//           const user = await User.findOne({ _id: data.user._id });

//           if (user) {
//                return res.status(200).send({
//                     success: true,
//                     message: "Success",
//                     data: user
//                });
//           } else {
//                return res.status(401).send({
//                     success: false,
//                     message: "Data Not Found"
//                });
//           }
//      } catch (error) {
//           console.log(error);
//           res.status(404).send({
//                success: false,
//                message: "Something went wrong",
//                error
//           });
//      }
// });

// Protected Route 

const protectedRoute = express.Router();

protectedRoute.get('/api/protectedRoute', authMiddleWare, (req, res) => {
     const { user } = req;
     return res.send({ success: true, message: "This is a Protected Route", user: user });
});

app.use(protectedRoute);