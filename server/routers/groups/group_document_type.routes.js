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
            type: req.body.name
        })
        .then(res=>{
            const record = {
                id: res.id, 
                type: req.name
            }
            console.log(record);
        })
        .catch(err=>console.log(err));
        res.json({state: 'success'});
    });

    routerGroupDocumentType.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.groupDocumentTypeModel.findByPk(req.params["id"]));
    });

    routerGroupDocumentType.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.groupDocumentTypeModel.update({ 
            type: req.body.name
        },{
            where: {
                id: req.params["id"]
            }
        })
        .then(res=>{
            const record = {
                id: res.id, 
                type: req.name
            }
            console.log(record);
            res.json({state: 'updated'});
        })
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
        .then(res=>res.json({state: 'deleted'}))
        .catch(err=>{
            console.log(err);
            res.json({state: 'delete error'});
        });
    });
    
    app.use('/api/groups/documents/types', routerGroupDocumentType);
};