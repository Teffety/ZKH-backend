const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./conf.js');


module.exports = (req,res,next) =>{
const authHeader = req.get('Autorization');
if(!authHeader) 
  res.status(401).json({message:"Токен не действителен"})
const token = authHeader.replace('Bearer','');  
try{
  jwt.verify(token, jwtSecret);
}catch(e){
  if(e instanceof jwt.JsonWebTokenError)  
    res.status(401).json({message:"Токен не верен"})
}
next();
}