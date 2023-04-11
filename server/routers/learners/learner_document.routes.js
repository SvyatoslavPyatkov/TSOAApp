import express from 'express';
import db from '.../models/index.js';

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

    routerLearnerDocument.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.learnerDocumentModel.findByPk(req.params["id"]));
    });

    routerLearnerDocument.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.learnerDocumentModel.update({ 
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

    routerLearnerDocument.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.learnerDocumentModel.destroy({
            where: {
                id: req.params["id"]
            }
        });
        res.json({state: 'deleted'});
    });
    
    app.use('/api/learners/documents', routerLearnerDocument);
};