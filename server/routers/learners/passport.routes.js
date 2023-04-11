import express from 'express';
import db from '../../models/index.js';

export default function(app) {
    
    const routerPassport = express.Router();

    routerPassport.get('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.passportModel.findAll({raw: true}));
    });
        
    routerPassport.post('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.passportModel.create({
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

    routerPassport.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.passportModel.findByPk(req.params["id"]));
    });

    routerPassport.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.passportModel.update({ 
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

    routerPassport.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.passportModel.destroy({
            where: {
                id: req.params["id"]
            }
        });
        res.json({state: 'deleted'});
    });
    
    app.use('/api/learners/passports', routerPassport);
};