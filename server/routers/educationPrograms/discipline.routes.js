import express from 'express';
import db from '../../models/index.js';

export default function(app) {
    
    const routerDiscipline = express.Router();

    routerDiscipline.get('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.json(await db.disciplineModel.findAll({raw: true}));
    });
        
    routerDiscipline.post('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        (async function() {
            try {
                await db.disciplineModel.create({
                    discipline: req.body.discipline,
                    education_program_id: req.body.education_program_id
                });
                res.json({state: 'success'});
            } 
            catch (err) {
                console.log(err);
                res.json({state: 'recording error'});
            }
        })();
    });

    routerDiscipline.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.json(await db.disciplineModel.findByPk(req.params["id"]));
    });

    routerDiscipline.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        (async function() {
            try {
                await db.disciplineModel.update({ 
                    discipline: req.body.discipline,
                    education_program_id: req.body.education_program_id
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

    routerDiscipline.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        (async function() {
            try {
                await db.disciplineModel.destroy({
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
    
    app.use('/api/disciplines', routerDiscipline);
};