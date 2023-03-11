const {JWT_SECRETE} = require("../configs/database")
const jwt = require('jsonwebtoken');

function isLogged(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
    // decode token
    if (token) {
  
      // verifies secret and checks exp
      console.log("JWT_SECRETE",JWT_SECRETE)
      jwt.verify(token, JWT_SECRETE, function(err, decoded) {      
        if (err) {
          res.status(401);
          return res.json({ success: false, message: 'Failed to authenticate user.' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });
  
    } else {
  
      // if there is no token
      // return an error
      return res.status(400).send({ 
          success: false, 
          message: 'No token provided.' 
      });
      
    }
  }
  
  module.exports = isLogged;