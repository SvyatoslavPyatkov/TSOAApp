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
            type: req.body.type
        })
        .then(res.json({state: 'success'}))
        .catch(err=>{
            console.log(err);
            res.json({state: 'recording error'})
        });
    });

    routerLearnerDocumentType.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.learnerDocumentTypeModel.findByPk(req.params["id"]));
    });

    routerLearnerDocumentType.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.learnerDocumentTypeModel.update({ 
            type: req.body.type
        },{
            where: {
                id: req.params["id"]
            }
        })
        .then(res.json({state: 'updated'}))
        .catch(err=>{
            console.log(err);
            res.json({state: 'edit error'});
        });
    });

    routerLearnerDocumentType.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.learnerDocumentTypeModel.destroy({
            where: {
                id: req.params["id"]
            }
        })
        .then(res.json({state: 'deleted'}))
        .catch(err=>{
            console.log(err);
            res.json({state: 'delete error'});
        });
    });
    
    app.use('/api/learnersdoctypes', routerLearnerDocumentType);
};