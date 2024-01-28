const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('dotenv').config().parsed;

function authenticateToken(req, res, next) {
  
  // To Skip the routes from authentication
  const routesToSkip = ["/users/login","/users/register"];
  if(routesToSkip.includes(req.url)){
    return next();
  }

  // const token = req.header('Authorization');
  const token = req.header('Authorization').split(" ")[1];

  //console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token not provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    req.user = user;
    next();
  });
}

function authorizeRoles(roles) {
  
  return (req, res, next) => {
    const userRoles = req.user.roles;

    // if (!userRoles || !userRoles.includes(roles)) {
    //   return res.status(403).json({ message: 'Insufficient permissions.' });
    // }

    next();
  };
}

module.exports = { authenticateToken, authorizeRoles };
