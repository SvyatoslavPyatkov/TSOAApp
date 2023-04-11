import express from 'express';
import db from '../../models/index.js';

export default function(app) {
    
    const routerLearnerDocumentType = express.Router();

    routerLearnerDocumentType.get('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.learnerDocumentTypeModel.findAll({raw: true}));
    });
        
    routerLearnerDocumentType.post('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.learnerDocumentTypeModel.create({
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

    routerLearnerDocumentType.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.learnerDocumentTypeModel.findByPk(req.params["id"]));
    });

    routerLearnerDocumentType.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.learnerDocumentTypeModel.update({ 
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

    routerLearnerDocumentType.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.learnerDocumentTypeModel.destroy({
            where: {
                id: req.params["id"]
            }
        });
        res.json({state: 'deleted'});
    });
    
    app.use('/api/learners/documents/types', routerLearnerDocumentType);
};