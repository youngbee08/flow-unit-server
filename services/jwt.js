const jwt = require("jsonwebtoken");
const secretDev = process.env.JWT_SECRET;

const gnerateToken = (user) => {
  const token = jwt.sign({ id: user._id, email: user.email }, secretDev, {
    expiresIn: process.env.JWT_EXP,
  });
  return token;
};

const decodeToken = (token) => {
  const decoded = jwt.verify(token, secretDev);
  return decoded;
};

module.exports = {
  gnerateToken,
  decodeToken,
};
