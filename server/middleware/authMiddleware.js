const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
     const token = req.headers.authorization;
     if (!token) {
          return res.status(401).send({ success: false, message: "Authorization Headers Missing" });
     }
     try {
          const tokenWithoutBearer = token.replace('Bearer ', '');
          const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
          req.user = decoded.user;
          next();
     } catch (error) {
          if (error.name === 'TokenExpiredError') {
               return res.status(401).send({ success: false, message: 'Token has Expired' });
          }
          return res.status(401).send({ success: false, message: "Invalid Token" });
     }
};

const verifyToken = (req, res, next) => {
     const token = req.headers['authorization'];

     if (!token) {
          return res.status(401).json({ message: 'Token missing' });
     }

     jwt.verify(token, process.env.AUTH0_CLIENT_SECRET, (err, decoded) => {
          if (err) {
               return res.status(403).json({ message: 'Invalid token' });
          }
          req.user = decoded;
          next();
     });
};

module.exports = { verifyToken, authMiddleware };