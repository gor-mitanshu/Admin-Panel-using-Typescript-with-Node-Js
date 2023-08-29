const express = require('express');
const app = express();
require('dotenv').config();
const cors = require("cors");
app.use(cors());
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const colors = require("colors");
const User = require('./models/UserSchema');
const jwtCheck = require('./middleware/authMiddleware');
const auth0 = require('auth0');

mongoose.connect(process.env.MONGO_URL).then(e => {
     console.log(`Connection established with Database`.bgYellow.white)
});
const PORT = process.env.PORT || 9936;
app.listen(PORT, () => {
     console.log(`connection successfull with ${PORT}`.bgWhite.green);
});
app.get('/', (req, res) => {
     res.send(`hello API`)
});

// Admin Register
app.post('/register', async (req, res) => {
     try {
          let existingUser = await User.findOne({ sub: req.body.sub });
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
          return res.status(401).json({ message: 'Error registering user', success: false, error: error.message });
     }
});

// Get user
app.get('/api/getuser/:id', jwtCheck, async (req, res) => {
     try {
          const getUser = await User.findOne({ sub: req.params.id });
          if (getUser) {
               return res.status(200).send({ message: "User retrieved successfully", success: true, data: getUser });
          } else {
               return res.status(404).send({ message: "User not found", success: false });
          }
     } catch (error) {
          return res.status(500).json({ message: 'Error Getting User', success: false, error: error.message });
     }
});

// Update User
app.put('/api/updateuser/:sub', async (req, res) => {
     // Create an Auth0 management client instance
     const auth0Management = new auth0.ManagementClient({
          domain: process.env.AUTH0_DOMAIN,
          clientId: process.env.AUTH0_CLIENT_ID,
          clientSecret: process.env.AUTH0_CLIENT_SECRET,
     });

     try {
          const sub = req.params.sub;
          const { given_name, family_name, email, phone_number } = req.body;
          // Update user in MongoDB
          const result = await User.findOneAndUpdate(
               { sub: sub },
               {
                    $set: {
                         given_name, family_name, email, phone_number, user_metadata: {
                              first_name: given_name,
                              last_name: family_name,
                              phone_number: phone_number,
                              email: email
                         },
                         app_metadata: {
                              role: "admin",
                         },
                    }
               },
               { new: true }
          );
          // Update user_metadata in Auth0
          const auth0User = await auth0Management.getUser({ id: sub });
          if (auth0User) {
               // Update user_metadata with phone_number
               const updatedMetadata = {
                    given_name,
                    family_name,
                    email,
                    phone_number,
               };
               await auth0Management.updateUserMetadata({ id: sub }, updatedMetadata);
          }
          if (result) {
               return res.status(200).send({ message: "Updated Successfully", success: true, user: result });
          } else {
               return res.status(400).send({
                    success: false,
                    message: "Error Updating",
               });
          }
     } catch (error) {
          return res.status(401).json({ message: 'Error Updating User', success: false, error: error.message });
     }
});

app.use((err, req, res, next) => {
     if (err.name === 'UnauthorizedError') {
          res.status(401).json({ success: false, message: 'Unauthorized' });
     } else {
          res.status(500).json({ success: false, message: 'Internal Server Error' });
     }
});