const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
     const token = req.headers.authorization;
     if (!token) {
          return res.status(401).send({ message: "Authoriuzation Headers Missing" });
     }
     const tokenwithoutBearer = token.replace('Bearer ', '');
     try {
          const decoded = jwt.verify(tokenwithoutBearer, process.env.JWT_SECRET);
          res.user = decoded.user;
          next();
     } catch (error) {
          if (error.name === 'TokenExpiredError') {
               return res.status(401).send({ message: 'Token has Expired' });
          }
          return res.status(498).send({ message: "Invalid Token" })
     }
};
module.exports = authMiddleWare;