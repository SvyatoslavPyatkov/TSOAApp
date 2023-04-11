import express from 'express';
import db from '../../models/index.js';

export default function(app) {
    
    const routerLearner = express.Router();

    routerLearner.get('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.learnerModel.findAll({raw: true}));
    });
        
    routerLearner.post('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.learnerModel.create({
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

    routerLearner.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.learnerModel.findByPk(req.params["id"]));
    });

    routerLearner.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.learnerModel.update({ 
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

    routerLearner.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.learnerModel.destroy({
            where: {
                id: req.params["id"]
            }
        });
        res.json({state: 'deleted'});
    });
    
    app.use('/api/learners', routerLearner);
};