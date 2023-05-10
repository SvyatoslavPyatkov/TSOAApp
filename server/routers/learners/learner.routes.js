import express from 'express';
import db from '../../models/index.js';

export default function(app) {
    
    const routerLearner = express.Router();

    routerLearner.get('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.json(await db.learnerModel.findAll({raw: true}));
    });
        
    routerLearner.post('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        (async function() {
            try {
                await db.learnerModel.create({
                    surname: req.body.surname,
                    name: req.body.name,
                    patronymic: req.body.patronymic,
                    phone: req.body.phone,
                    birth_date: req.body.birth_date,
                    email: req.body.email,
                    address: req.body.address,
                    employment_place: req.body.employment_place,
                    working_position: req.body.working_position,
                    work_phone: req.body.work_phone,
                    work_record: req.body.work_record,
                    work_record_on_position: req.body.work_record_on_position,
                    SNILS: req.body.SNILS,
                    INN: req.body.INN,
                    gender_id: req.body.gender_id,
                    group_id: req.body.group_id
                });
                res.json({state: 'success'});
            } 
            catch (err) {
                console.log(err);
                res.json({state: 'recording error'});
            }
        })();
    });

    routerLearner.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.learnerModel.findByPk(req.params["id"]));
    });

    routerLearner.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        (async function() {
            try {
                await db.learnerModel.update({ 
                    surname: req.body.surname,
                    name: req.body.name,
                    patronymic: req.body.patronymic,
                    phone: req.body.phone,
                    birth_date: req.body.birth_date,
                    email: req.body.email,
                    address: req.body.address,
                    employment_place: req.body.employment_place,
                    working_position: req.body.working_position,
                    work_phone: req.body.work_phone,
                    work_record: req.body.work_record,
                    work_record_on_position: req.body.work_record_on_position,
                    SNILS: req.body.SNILS,
                    INN: req.body.INN,
                    gender_id: req.body.gender_id,
                    group_id: req.body.group_id
                },{
                    where: {
                        id: req.params["id"]
                    }
                });
                res.json({state: 'updated'});
            } 
            catch (err) {
                console.log(err);
                res.json({state: 'edit error'});
            }
        })();
    });

    routerLearner.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        (async function() {
            try {
                await db.learnerModel.destroy({
                    where: {
                        id: req.params["id"]
                    }
                });
                res.json({state: 'deleted'});
            } 
            catch (err) {
                console.log(err);
                res.json({state: 'delete error'});
            }
        })();
    });
    
    app.use('/api/learners', routerLearner);
};