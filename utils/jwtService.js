// utils/jwtService.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  // return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  try{
    let genTocken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(genTocken);
    return genTocken;
  }
  catch(error){
    console.error('Error in genrate token:', error.message);
  }
  
};

const verifyToken = (token) => {
  // return jwt.verify(token, process.env.JWT_SECRET);
  console.log("Token: "+token);
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
