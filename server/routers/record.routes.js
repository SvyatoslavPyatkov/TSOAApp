import express from 'express';
import db from '../models/index.js';

export default function(app) {
    
    const routerRecord = express.Router();

    routerRecord.get('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.recordModel.findAll({raw: true}));
    });
        
    routerRecord.post('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.recordModel.create({
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

    routerRecord.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.recordModel.findByPk(req.params["id"]));
    });

    routerRecord.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.recordModel.update({ 
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

    routerRecord.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.recordModel.destroy({
            where: {
                id: req.params["id"]
            }
        });
        res.json({state: 'deleted'});
    });
    
    app.use('/api/records', routerRecord);
};

// export default routerRecord;