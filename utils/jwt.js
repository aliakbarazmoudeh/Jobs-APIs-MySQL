const JWT = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const customError = require('../errors');

const createToken = ({ id: userID, name: name }) => {
  return JWT.sign({ userID, name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const verifyToken = (token) => JWT.verify(token, process.env.JWT_SECRET);

module.exports = { createToken, verifyToken };
