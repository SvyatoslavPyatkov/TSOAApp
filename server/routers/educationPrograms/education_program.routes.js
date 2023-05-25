import express from 'express';
export const router = express.Router();
import controller from '../../controllers/educationPrograms/education_program.controller.js';
import authMidleware from '../../middleware/auth.midleware.js';

router.get('/programs', authMidleware, controller.getEducationPrograms);
router.post('/programs', authMidleware, controller.createEducationProgram);
router.get('/programs/:id', authMidleware, controller.getEducationProgramById);
router.put('/programs/:id', authMidleware, controller.updateEducationProgramById);
router.delete('/programs/:id', authMidleware, controller.deleteEducationProgramById);
router.post('/programs/search', authMidleware, controller.searchEducationProgram);
router.get('/programs/:id/groups', authMidleware, controller.getGroupsByEducationProgramId);

// offset: размер страницы * (номер страницы - 1)