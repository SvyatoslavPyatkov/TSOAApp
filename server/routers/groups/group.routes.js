import express from 'express';
import db from '../../models/index.js';

export default function(app) {
    
    const routerGroup = express.Router();

    routerGroup.get('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.groupModel.findAll({raw: true}));
    });
        
    routerGroup.post('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        // const groupDocumentModel = db.groupDocumentModel;
        await db.groupModel.create({
            enrollment_date: req.body.enrollment_date,
            expulsion_date: req.body.expulsion_date,
            education_program_id: req.body.education_program_id
        })
        .then(res.json({state: 'success'}))
        .catch(err=>{
            console.log(err);
            res.json({state: 'recording error'})
        });
    });

    routerGroup.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.groupModel.findByPk(req.params["id"]));
    });

    routerGroup.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.groupModel.update({ 
            enrollment_date: req.body.enrollment_date,
            expulsion_date: req.body.expulsion_date,
            education_program_id: req.body.education_program_id
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

    routerGroup.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.groupModel.destroy({
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
    
    app.use('/api/groups', routerGroup);
};