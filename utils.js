//MODULE IMPORTS
const jwt = require('jsonwebtoken');

//Authenticate the JSON Web Token
const auth = function (req, res, next){
    //Receive the token
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).send('Access Denied. Token Missing!');
    }

    //If token found, verify it
    try{
      const decoded = jwt.verify(token, "jwtPrivateKey");
      req.user = decoded;
      next();
    }
    catch(err){
       return res.status(403).send("Access Denied!");
    }
}

//Check if user has Admin Credentials
const adminCheck = function (req, res, next) {
    if (!req.user.isAdmin) 
        return res.status(403).send('Access Denied!');
    next();
}

module.exports = {
    auth: auth,
    adminCheck: adminCheck
}