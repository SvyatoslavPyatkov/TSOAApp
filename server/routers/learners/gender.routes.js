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
            gender: req.body.gender
        })
        .then(res.json({state: 'success'}))
        .catch(err=>{
            console.log(err);
            res.json({state: 'recording error'})
        });
    });

    routerGender.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.genderModel.findByPk(req.params["id"]));
    });

    routerGender.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.genderModel.update({ 
            gender: req.body.gender
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

    routerGender.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.genderModel.destroy({
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
    
    app.use('/api/learners/genders', routerGender);
};