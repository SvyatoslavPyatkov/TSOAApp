import express from 'express';
import db from '../../models/index.js';

export default function(app) {
    
    const routerGroupDocumentType = express.Router();

    routerGroupDocumentType.get('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.groupDocumentTypeModel.findAll({raw: true}));
    });
        
    routerGroupDocumentType.post('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.groupDocumentTypeModel.create({
            type: req.body.type
        })
        .then(res.json({state: 'success'}))
        .catch(err=>console.log(err));
    });

    routerGroupDocumentType.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.groupDocumentTypeModel.findByPk(req.params["id"]));
    });

    routerGroupDocumentType.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.groupDocumentTypeModel.update({ 
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

    routerGroupDocumentType.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.groupDocumentTypeModel.destroy({
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
    
    app.use('/api/groupsdoctypes', routerGroupDocumentType);
};