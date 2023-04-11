import express from 'express';
import db from '../../models/index.js';

export default function(app) {
    
    const routerLearnerDocument = express.Router();

    routerLearnerDocument.get('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.learnerDocumentModel.findAll({raw: true}));
    });
        
    routerLearnerDocument.post('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.learnerDocumentModel.create({
            name: req.body.name,
            document_path: req.body.email,
            learner_document_type_id: req.body.learner_document_type_id
        })
        .then(res=>{
            const record = {
                id: res.id, 
                name: req.name,
                document_path: req.email,
                learner_document_type_id: req.learner_document_type_id
            }
            console.log(record);
            res.json({state: 'success'});
        })
        .catch(err=>{
            console.log(err);
            res.json({state: 'recording error'})
        });
    });

    routerLearnerDocument.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.learnerDocumentModel.findByPk(req.params["id"]));
    });

    routerLearnerDocument.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.learnerDocumentModel.update({ 
            name: req.body.name,
            document_path: req.body.email,
            learner_document_type_id: req.body.learner_document_type_id
        },{
            where: {
                id: req.params["id"]
            }
        })
        .then(res=>{
            const record = {
                id: res.id, 
                name: req.name,
                document_path: req.email,
                learner_document_type_id: req.learner_document_type_id
            }
            console.log(record);
            res.json({state: 'updated'});
        })
        .catch(err=>{
            console.log(err);
            res.json({state: 'edit error'});
        });
    });

    routerLearnerDocument.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.learnerDocumentModel.destroy({
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
    
    app.use('/api/learners/documents', routerLearnerDocument);
};