const { DataTypes } = require('sequelize');
const sequelize = require('../db/connectDB');
const { hashSync } = require('bcryptjs');
const Job = require('../models/Job');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: true,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    set(password) {
      this.setDataValue('password', hashSync(password));
    },
  },
});

User.hasMany(Job, { foreignKey: 'UserId' });
module.exports = User;
