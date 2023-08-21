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
const { authMiddleware } = require("./middleware/authMiddleware");
const { verifyToken } = require('./middleware/authMiddleware');


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
app.post('/register', async (req, res) => {
     try {
          let existingUser = await User.findOne({ email: req.body.email, sub: req.body.sub });
          if (!!existingUser) {
               await User.findOneAndUpdate({ email: req.body.email },
                    { $set: { email: req.body.email, email_verified: req.body.email_verified, family_name: req.body.family_name, given_name: req.body.given_name, nickname: req.body.nickname, picture: req.body.picture, name: req.body.name } }, { "new": true }
               )
               return res.status(201).json({ success: true, user: existingUser, message: 'Get User Successfully', });
          } else {
               const { email, name, email_verified, family_name, given_name, nickname, picture, updated_at, sub } = req.body;
               const newUser = new User({ name, email, email_verified, family_name, given_name, nickname, picture, updated_at, sub });
               await newUser.save();

               return res.status(201).json({ success: true, user: newUser, message: 'User registered successfully', });
          }

     }
     catch (error) {
          return res.status(500).json({ message: 'Error registering user', success: false, error: error.message });
     }
});

// Login
app.post('/api/login', async (req, res) => {
     try {
          const user = await User.findOne({ email: req.body.email });
          if (!!user) {
               const hashedPassword = await bcrypt.compare(req.body.password, user.password);
               if (!!hashedPassword) {
                    const expiresIn = 500000;
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

// Logout
app.post('/api/logout', (req, res) => {
     res.json({ success: true, message: 'Logout Successful' });
});

// Protected Route 
const protectedRoute = express.Router();
app.use(authMiddleware);

// Get User
protectedRoute.get('/api/getuser', verifyToken, async (req, res) => {
     try {
          // Get the user ID from req.user
          const userId = req.user._id;
          // Find the user by ID
          const user = await User.findById(userId);
          if (!user) {
               return res.status(404).send({ success: false, message: 'User not found' });
          }
          // Return the user information
          return res.status(200).send({
               success: true,
               message: 'User information retrieved successfully',
               user: user,
          });
     } catch (error) {
          console.error(error);
          return res.status(500).send({
               success: false,
               message: 'Something went wrong',
               error: error.message,
          });
     }
});

// Update User
protectedRoute.put('/api/updateuser/:id', verifyToken, async (req, res) => {
     try {
          // Get the user ID from req.user
          const userId = req.params.id;
          // Find the user by ID
          const user = await User.findById(userId);
          if (!user) {
               return res.status(404).send({ success: false, message: 'User not found' });
          }
          // Update user information based on request body
          user.firstname = req.body.firstname || user.firstname;
          user.lastname = req.body.lastname || user.lastname;
          user.email = req.body.email || user.email;
          user.phone = req.body.phone || user.phone;
          // Save the updated user to the database
          await user.save();

          return res.status(200).send({
               success: true,
               message: 'User updated successfully',
               user: user,
          });
     } catch (error) {
          console.error(error);
          return res.status(500).send({
               success: false,
               message: 'Something went wrong',
               error: error.message,
          });
     }
});
app.use(protectedRoute);