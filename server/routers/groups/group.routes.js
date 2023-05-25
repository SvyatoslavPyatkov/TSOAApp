import express from 'express';
export const router = express.Router();
import controller from '../../controllers/groups/group.controller.js';
import file_controller from '../../controllers/groups/group_file.controller.js';
import authMidleware from '../../middleware/auth.midleware.js';

router.get('/groups', authMidleware, controller.getGroups);
router.post('/groups', authMidleware, controller.createGroup);
router.post('/groups/search', authMidleware, controller.searchGroup);
router.get('/groups/:id', authMidleware, controller.getGroupById);
router.put('/groups/:id', authMidleware, controller.updateGroupById);
router.delete('/groups/:id', authMidleware, controller.deleteGroupById);
router.get('/groups/:id/learners', authMidleware, controller.getLearnersByGroupId);

router.get('/groups/:id/documents', authMidleware, file_controller.getGroupDocuments);
router.post('/groups/:id/documents', authMidleware, file_controller.createGroupDocument);