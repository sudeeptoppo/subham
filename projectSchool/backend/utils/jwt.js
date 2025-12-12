const jwt = require('jsonwebtoken');
require("dotenv").config();

function signToken(user) {
  const payload = { id: user._id, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}

module.exports = { signToken };