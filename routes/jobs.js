const express = require('express');
const router = express.Router();

const {getAllJobs,getJob,createJob,updateJob, deleteJob} = require('../controllers/jobs');

// @route /api/v1/jobs
// @desc Get all jobs 
// @access Private
router.get('/', getAllJobs)

// @route /api/v1/jobs
// @desc Create a job 
// @access Private
router.post('/', createJob)

// @route /api/v1/jobs/:id
// @desc Get a job by id 
// @access Private
router.get('/:id', getJob)

// @route /api/v1/jobs/:id
// @desc Delete a job by id 
// @access Private
router.delete('/:id', deleteJob)

// @route /api/v1/jobs/:id
// @desc Update a job by id 
// @access Private
router.patch('/:id', updateJob)


module.exports = router; 

