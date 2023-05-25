import express from 'express';
export const router = express.Router();
import controller from '../../controllers/learners/job.controller.js';
import authMidleware from '../../middleware/auth.midleware.js';

router.get('/jobs', authMidleware, controller.getJobs);
router.post('/jobs', authMidleware, controller.createJob);
router.post('/jobs/search', authMidleware, controller.searchJob);
router.get('/jobs/:id', authMidleware, controller.getJobById);
router.put('/jobs/:id', authMidleware, controller.updateJobById);
router.delete('/jobs/:id', authMidleware, controller.deleteJobById);