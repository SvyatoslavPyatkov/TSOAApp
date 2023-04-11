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

    routerGroupDocument.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.groupDocumentModel.findByPk(req.params["id"]));
    });

    routerGroupDocument.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.groupDocumentModel.update({ 
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

    routerGroupDocument.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.groupDocumentModel.destroy({
            where: {
                id: req.params["id"]
            }
        });
        res.json({state: 'deleted'});
    });
    
    app.use('/api/groups/documents', routerGroupDocument);
};