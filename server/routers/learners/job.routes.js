import express from 'express';
export const router = express.Router();
import controller from '../../controllers/learners/job.controller.js';
import authMidleware from '../../middleware/auth.midleware.js';

router.get('/jobs', controller.getJobs);
router.post('/jobs', controller.createJob);
router.post('/jobs/search', controller.searchJob);
router.get('/jobs/:id', controller.getJobById);
router.put('/jobs/:id', controller.updateJobById);
router.delete('/jobs/:id', controller.deleteJobById);