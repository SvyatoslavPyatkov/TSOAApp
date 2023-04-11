import express from 'express';
import db from '.../models/index.js';

export default function(app) {
    
    const routerGroupDocumentType = express.Router();

    routerGroupDocumentType.get('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.groupDocumentTypeModel.findAll({raw: true}));
    });
        
    routerGroupDocumentType.post('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.groupDocumentTypeModel.create({
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

    routerGroupDocumentType.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.groupDocumentTypeModel.findByPk(req.params["id"]));
    });

    routerGroupDocumentType.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.groupDocumentTypeModel.update({ 
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

    routerGroupDocumentType.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.groupDocumentTypeModel.destroy({
            where: {
                id: req.params["id"]
            }
        });
        res.json({state: 'deleted'});
    });
    
    app.use('/api/groups/documents/types', routerGroupDocumentType);
};