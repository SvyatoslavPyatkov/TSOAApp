import express from 'express';
import db from '.../models/index.js';

export default function(app) {
    
    const routerGroupsHasGroupDocument = express.Router();

    routerGroupsHasGroupDocument.get('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.groupsHasGroupDocumentModel.findAll({raw: true}));
    });
        
    routerGroupsHasGroupDocument.post('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.groupsHasGroupDocumentModel.create({
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

    routerGroupsHasGroupDocument.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.groupsHasGroupDocumentModel.findByPk(req.params["id"]));
    });

    routerGroupsHasGroupDocument.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.groupsHasGroupDocumentModel.update({ 
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

    routerGroupsHasGroupDocument.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.groupsHasGroupDocumentModel.destroy({
            where: {
                id: req.params["id"]
            }
        });
        res.json({state: 'deleted'});
    });
    
    app.use('/api/groups/documents/container', routerGroupsHasGroupDocument);
};