import express from 'express';
export const router = express.Router();
import controller from '../../controllers/groups/group.controller.js';
import file_controller from '../../controllers/groups/group_file.controller.js';
import authMidleware from '../../middleware/auth.midleware.js';

router.get('/groups', controller.getGroups);
router.post('/groups', controller.createGroup);
router.post('/groups/search', controller.searchGroup);
router.get('/groups/:id', controller.getGroupById);
router.put('/groups/:id', controller.updateGroupById);
router.delete('/groups/:id', controller.deleteGroupById);
router.get('/groups/:id/learners', controller.getLearnersByGroupId);

router.get('/groups/:id/documents', file_controller.getGroupDocuments);
router.post('/groups/:id/documents', file_controller.createGroupDocument);