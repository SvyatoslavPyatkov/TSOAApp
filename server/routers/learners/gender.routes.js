import express from 'express';
import db from '../../models/index.js';

export default function(app) {
    
    const routerGender = express.Router();

    routerGender.get('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.genderModel.findAll({raw: true}));
    });
        
    routerGender.post('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.genderModel.create({
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

    routerGender.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.genderModel.findByPk(req.params["id"]));
    });

    routerGender.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.genderModel.update({ 
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

    routerGender.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.genderModel.destroy({
            where: {
                id: req.params["id"]
            }
        });
        res.json({state: 'deleted'});
    });
    
    app.use('/api/learners/genders', routerGender);
};