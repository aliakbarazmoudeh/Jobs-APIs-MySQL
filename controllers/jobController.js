const { StatusCodes } = require('http-status-codes');
const customError = require('../errors');
const Job = require('../models/Job');
const checkPermission = require('../utils/checkPermission');

const createJob = async (req, res) => {
  req.body.UserId = req.user.userID;
  const job = await Job.build(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const getSingleJob = async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  if (!job)
    throw new customError.NotFoundError('cant find any job with this ID');
  checkPermission(req.user, job.UserId);
  res.status(StatusCodes.OK).json({ job });
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.findAll({ where: { UserId: req.user.userID } });
  res.status(StatusCodes.OK).json({ jobs });
};

const updateJob = async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  if (!job)
    throw new customError.NotFoundError('cant find any job with this ID');
  checkPermission(req.user, job.UserId);
  job.set(req.body);
  await job.save({ fields: ['company', 'position', 'status'] });
  res
    .status(StatusCodes.OK)
    .json({ msg: job ? 'updated successfuly' : 'cant update it' });
};

const deleteJob = async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  if (!job)
    throw new customError.NotFoundError('cant find any job with this ID');
  checkPermission(req.user, job.UserId);
  await job.destroy();
  res.status(StatusCodes.OK).json({
    msg: job
      ? 'job deleted successfuly'
      : 'cant delete, please try again later',
  });
};

module.exports = { createJob, getAllJobs, getSingleJob, updateJob, deleteJob };
