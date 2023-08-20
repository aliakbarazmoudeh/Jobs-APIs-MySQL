const express = require('express');
const router = express.Router();
const {
  createJob,
  deleteJob,
  getAllJobs,
  getSingleJob,
  updateJob,
} = require('../controllers/jobController');
const {authenticateUser} = require('../middleware/authentication');

router.use(authenticateUser)
router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob);

module.exports = router;
