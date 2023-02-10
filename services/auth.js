const jwt = require('jsonwebtoken');
const secret = "Takshil@12#$1231";

function setUser( user) {
  return jwt.sign({
    _id: user._id,
    email: user.email,
  }, secret);
};

function getUser(token) {
  if (!token) return null;
  try{
    jwt.verify(token, secret);
  }catch (err) {
    return null;
  }
};

module.exports = {
  setUser,
  getUser,
};