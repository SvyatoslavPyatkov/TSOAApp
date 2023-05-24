import express from 'express';
export const router = express.Router();
import controller from '../../controllers/learners/passport.controller.js';
import authMidleware from '../../middleware/auth.midleware.js';

router.get('/passports', authMidleware, controller.getPassports);
router.post('/passports', authMidleware, controller.createPassport);
router.post('/passports/search', authMidleware, controller.searchPassport);
router.post('/passports/search/:series/:number', authMidleware, controller.searchPassportBySeriesAndNumber);
router.get('/passports/:id', authMidleware, controller.getPassportById);
router.put('/passports/:id', authMidleware, controller.updatePassportById);
router.delete('/passports/:id', authMidleware, controller.deletePassportById);