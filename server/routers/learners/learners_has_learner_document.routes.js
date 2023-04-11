import express from 'express';
import db from '../../models/index.js';

export default function(app) {
    
    const routerLearnersHasLearnerDocument = express.Router();

    routerLearnersHasLearnerDocument.get('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.learnersHasLearnerDocumentModel.findAll({raw: true}));
    });
        
    routerLearnersHasLearnerDocument.post('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.learnersHasLearnerDocumentModel.create({
            learner_id: req.body.learner_id,
            learner_document_id: req.body.learner_document_id
        })
        .then(res=>{
            const record = {
                learner_id: res.learner_id, 
                learner_document_id: res.learner_document_id
            }
            console.log(record);
            res.json({state: 'success'});
        })
        .catch(err=>{
            console.log(err);
            res.json({state: 'recording error'})
        });
    });

    routerLearnersHasLearnerDocument.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.learnersHasLearnerDocumentModel.findByPk(req.params["id"]));
    });

    routerLearnersHasLearnerDocument.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.learnersHasLearnerDocumentModel.update({ 
            learner_id: req.body.learner_id,
            learner_document_id: req.body.learner_document_id
        },{
            where: {
                learner_id: req.params["id"]
            }
        })
        .then(res=>{
            const record = {
                learner_id: res.learner_id, 
                learner_document_id: res.learner_document_id
            }
            console.log(record);
            res.json({state: 'updated'});
        })
        .catch(err=>{
            console.log(err);
            res.json({state: 'edit error'});
        });
    });

    routerLearnersHasLearnerDocument.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.learnersHasLearnerDocumentModel.destroy({
            where: {
                learner_id: req.params["id"]
            }
        })
        .then(res=>res.json({state: 'deleted'}))
        .catch(err=>{
            console.log(err);
            res.json({state: 'delete error'});
        });
    });
    
    app.use('/api/learners/documents/container', routerLearnersHasLearnerDocument);
};