import express from 'express';
export const router = express.Router();
import controller from '../../controllers/educationPrograms/education_program.controller.js';
import authMidleware from '../../middleware/auth.midleware.js';

router.get('/programs', controller.getEducationPrograms);
router.post('/programs', controller.createEducationProgram);
router.get('/programs/:id', controller.getEducationProgramById);
router.put('/programs/:id', controller.updateEducationProgramById);
router.delete('/programs/:id', controller.deleteEducationProgramById);
router.post('/programs/search', controller.searchEducationProgram);
router.get('/programs/:id/groups', controller.getGroupsByEducationProgramId);

// offset: размер страницы * (номер страницы - 1)