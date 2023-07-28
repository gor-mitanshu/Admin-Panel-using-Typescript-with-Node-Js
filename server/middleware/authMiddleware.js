const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
     const token = req.headers.authorization;
     if (!token) {
          return res.status(401).send({ message: "Authoriuzation Headers Missing" });
     }
     const tokenwithoutBearer = token.replace('Bearer ', '');
     jwt.verify(tokenwithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
               return res.status(401).send({ message: 'Invalid or Expired Token' });
          }
          req.user = decoded.user;
          next();
     })
};

module.exports = authMiddleWare;