const express = require('express');
const router = express.Router();
const {
  logIn,
  register,
  updateUser,
  updatePassword,
} = require('../controllers/authController');
const { authenticateUser } = require('../middleware/authentication');

router.route('/register').post(register);
router.route('/login').post(logIn);
router.route('/update-user').patch(authenticateUser, updateUser);
router.route('/update-password').patch(authenticateUser, updatePassword);

module.exports = router;
