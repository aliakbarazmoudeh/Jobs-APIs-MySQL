const customError = require('../errors');
const { verifyToken } = require('../utils/jwt');
const authenticateUser = async (req, res, next) => {
  try {
    const payload = verifyToken(req.signedCookies.token);
    if (payload) {
      req.user = payload;
      next();
    }
  } catch (error) {
    throw new customError.UnauthenticatedError('invalid authentication');
  }
};

module.exports = { authenticateUser };
