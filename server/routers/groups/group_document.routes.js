import express from 'express';
import db from '../../models/index.js';

export default function(app) {
    
    const routerGroupDocument = express.Router();

    routerGroupDocument.get('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.groupDocumentModel.findAll({raw: true}));
    });
        
    routerGroupDocument.post('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.groupDocumentModel.create({
            name: req.body.name,
            document_path: req.body.document_path,
            group_document_type_id: req.body.group_document_type_id
        })
        .then(res=>{
            const record = {
                id: res.id, 
                name: req.name,
                document_path: req.document_path,
                group_document_type_id: req.group_document_type_id
            }
            console.log(record);
            res.json({state: 'success'});
        })
        .catch(err=>{
            console.log(err);
            res.json({state: 'recording error'})
        });
    });

    routerGroupDocument.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.groupDocumentModel.findByPk(req.params["id"]));
    });

    routerGroupDocument.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.groupDocumentModel.update({ 
            name: req.body.name,
            document_path: req.body.document_path,
            group_document_type_id: req.body.group_document_type_id
        },{
            where: {
                id: req.params["id"]
            }
        })
        .then(res=>{
            const record = {
                id: res.id, 
                name: req.name,
                document_path: req.document_path,
                group_document_type_id: req.group_document_type_id
            }
            console.log(record);
            res.json({state: 'updated'});
        })
        .catch(err=>{
            console.log(err);
            res.json({state: 'edit error'});
        });
    });

    routerGroupDocument.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.groupDocumentModel.destroy({
            where: {
                id: req.params["id"]
            }
        })
        .then(res=>res.json({state: 'deleted'}))
        .catch(err=>{
            console.log(err);
            res.json({state: 'delete error'});
        });
    });
    
    app.use('/api/groups/documents', routerGroupDocument);
};