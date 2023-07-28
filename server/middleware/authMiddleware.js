const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
     const token = req.headers.authorization;
     if (!token) {
          return res.status(401).send({ message: "Authorization Headers Missing" });
     }
     const tokenWithoutBearer = token.replace('Bearer ', '');
     try {
          const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
          req.user = decoded.user;
          next();
     } catch (error) {
          if (error.name === 'TokenExpiredError') {
               return res.status(401).send({ message: 'Token has Expired' });
          }
          return res.status(401).send({ message: "Invalid Token" });
     }
};

module.exports = authMiddleware;