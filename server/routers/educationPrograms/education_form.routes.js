import express from 'express';
export const router = express.Router();
import controller from '../../controllers/educationPrograms/education_form.controller.js';
import authMidleware from '../../middleware/auth.midleware.js';

router.get('/forms', authMidleware, controller.getForms);
router.post('/forms', authMidleware, controller.createForm);
router.get('/forms/:id', authMidleware, controller.getFormById);
router.put('/forms/:id', authMidleware, controller.updateFormById);
router.delete('/forms/:id', authMidleware, controller.deleteFormById);
router.post('/forms/search', authMidleware, controller.searchForm);
router.get('/forms/:id/programs', authMidleware, controller.searchProgramByForm);

