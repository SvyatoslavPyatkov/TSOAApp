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
            passport_number: res.body.passport_number,
            passport_series: req.body.passport_series,
            issue_date: req.body.issue_date,
            issuer: req.body.issuer,
            learner_id: req.body.learner_id
        })
        .then(res=>{
            const record = {
                passport_number: res.passport_number,
                passport_series: req.passport_series,
                issue_date: req.issue_date,
                issuer: req.issuer,
                learner_id: req.learner_id
            }
            console.log(record);
            res.json({state: 'success'});
        })
        .catch(err=>{
            console.log(err);
            res.json({state: 'recording error'})
        });
    });

    routerPassport.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.passportModel.findByPk(req.params["id"]));
    });

    routerPassport.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.passportModel.update({ 
            passport_number: res.body.passport_number,
            passport_series: req.body.passport_series,
            issue_date: req.body.issue_date,
            issuer: req.body.issuer,
            learner_id: req.body.learner_id
        },{
            where: {
                passport_number: req.params["id"]
            }
        })
        .then(res=>{
            const record = {
                passport_number: res.passport_number,
                passport_series: req.passport_series,
                issue_date: req.issue_date,
                issuer: req.issuer,
                learner_id: req.learner_id
            }
            console.log(record);
            res.json({state: 'updated'});
        })
        .catch(err=>{
            console.log(err);
            res.json({state: 'edit error'});
        });
    });

    routerPassport.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.passportModel.destroy({
            where: {
                passport_number: req.params["id"]
            }
        })
        .then(res=>res.json({state: 'deleted'}))
        .catch(err=>{
            console.log(err);
            res.json({state: 'delete error'});
        });
    });
    
    app.use('/api/learners/passports', routerPassport);
};