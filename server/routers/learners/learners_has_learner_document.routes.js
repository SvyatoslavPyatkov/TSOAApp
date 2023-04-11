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
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            gender: req.body.gender
        })
        .then(res=>{
            const record = {
                id: res.id, 
                name: res.name, 
                email: res.email,
                address: res.address,
                gender: res.gender
            }
            console.log(record);
        })
        .catch(err=>console.log(err));
        res.json({state: 'success'});
    });

    routerLearnersHasLearnerDocument.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.learnersHasLearnerDocumentModel.findByPk(req.params["id"]));
    });

    routerLearnersHasLearnerDocument.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.learnersHasLearnerDocumentModel.update({ 
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            gender: req.body.gender
        },{
            where: {
                id: req.params["id"]
            }
        });
        res.json({state: 'updated'});
    });

    routerLearnersHasLearnerDocument.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.learnersHasLearnerDocumentModel.destroy({
            where: {
                id: req.params["id"]
            }
        });
        res.json({state: 'deleted'});
    });
    
    app.use('/api/learners/documents/container', routerLearnersHasLearnerDocument);
};