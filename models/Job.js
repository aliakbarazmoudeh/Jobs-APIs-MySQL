const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db/connectDB');
const User = require('../models/User');

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: true,
    autoIncrement: true,
    primaryKey: true,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: DataTypes.STRING,
    validate: { isIn: [['interview', 'declined', 'pending']] },
    defaultValue: 'pending',
  },
});

module.exports = Job;
