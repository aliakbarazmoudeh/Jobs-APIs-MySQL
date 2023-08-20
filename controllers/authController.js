const { StatusCodes } = require('http-status-codes');
const customError = require('../errors');
const User = require('../models/User');
const Job = require('../models/Job');
const { compare } = require('bcryptjs');
const { createToken } = require('../utils/jwt');

const register = async (req, res) => {
  const user = await User.create(req.body);
  res
    .status(StatusCodes.OK)
    .cookie('token', createToken(user), {
      httpOnly: true,
      signed: true,
      secure: true,
    })
    .json(user);
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new customError.BadRequestError(
      'password and email must be provided'
    );
  const user = await User.findOne({
    where: { email },
    include: Job,
  });
  if (!user) throw new customError.NotFoundError('invalid credentials');
  const isValidPassword = await compare(req.body.password, user.password);
  if (!isValidPassword)
    throw new customError.UnauthenticatedError('password was not match');
  res
    .status(StatusCodes.OK)
    .cookie('token', createToken(user), {
      httpOnly: true,
      signed: true,
      secure: true,
    })
    .json(user);
};

const updateUser = async (req, res) => {
  const user = await User.findByPk(req.user.userID);
  await user.update(req.body);
  await user.save({ fields: ['name', 'email'] });
  res.status(StatusCodes.OK).json(user);
};

const updatePassword = async (req, res) => {
  const user = await User.findByPk(req.user.userID);
  await user.update(req.body);
  await user.save({ fields: ['password'] });
  res.status(StatusCodes.OK).json(user);
};

module.exports = { register, logIn, updateUser, updatePassword };
