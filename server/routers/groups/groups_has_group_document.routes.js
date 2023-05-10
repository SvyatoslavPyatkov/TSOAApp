import express from 'express';
import db from '../../models/index.js';

export default function(app) {
    
    const routerGroupsHasGroupDocument = express.Router();

    routerGroupsHasGroupDocument.get('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.json(await db.groupsHasGroupDocumentModel.findAll({raw: true}));
    });
        
    routerGroupsHasGroupDocument.post('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        (async function() {
            try {
                await db.groupsHasGroupDocumentModel.create({
                    group_id: req.body.group_id,
                    group_document_id: req.body.group_document_id
                });
                res.json({state: 'success'});
            } 
            catch (err) {
                console.log(err);
                res.json({state: 'recording error'});
            }
        })();
    });

    routerGroupsHasGroupDocument.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.json(await db.groupsHasGroupDocumentModel.findByPk(req.params["id"]));
    });

    routerGroupsHasGroupDocument.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        (async function() {
            try {
                await db.groupsHasGroupDocumentModel.update({ 
                    group_id: req.body.group_id,
                    group_document_id: req.body.group_document_id
                },{
                    where: {
                        group_id: req.params["id"]
                    }
                });
                res.json({state: 'updated'});
            } 
            catch (err) {
                console.log(err);
                res.json({state: 'edit error'});
            }
        })();
    });

    routerGroupsHasGroupDocument.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        (async function() {
            try {
                await db.groupsHasGroupDocumentModel.destroy({
                    where: {
                        group_id: req.params["id"]
                    }
                });
                res.json({state: 'deleted'});
            } 
            catch (err) {
                console.log(err);
                res.json({state: 'delete error'});
            }
        })();
    });
    
    app.use('/api/groupsdoccontainer', routerGroupsHasGroupDocument);
};