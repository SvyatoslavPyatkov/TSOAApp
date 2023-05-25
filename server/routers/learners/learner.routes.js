import express from 'express';
export const router = express.Router();
import controller from '../../controllers/learners/learner.controller.js';
import file_controller from '../../controllers/learners/learner_file.controller.js';
import authMidleware from '../../middleware/auth.midleware.js';

router.get('/learners', authMidleware, controller.getLearners);
router.post('/learners', authMidleware, controller.createLearner);
router.get('/learners/:id', authMidleware, controller.getLearnerById);
router.put('/learners/:id', authMidleware, controller.updateLearnerById);
router.delete('/learners/:id', authMidleware, controller.deleteLearnerById);
router.post('/learners/search', authMidleware, controller.searchLearner);
router.get('/learners/:id/documents', authMidleware, file_controller.getLearnerDocuments);
router.post('/learners/:id/documents', authMidleware, file_controller.createLearnerDocument);