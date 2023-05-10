import express from 'express';
import db from '../../models/index.js';

export default function(app) {
    
    const routerCompetence = express.Router();

    routerCompetence.get('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.json(await db.competenceModel.findAll({raw: true}));
    });
        
    routerCompetence.post('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        (async function() {
            try {
                await db.competenceModel.create({
                    competence: req.body.competence,
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

    routerCompetence.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.json(await db.competenceModel.findByPk(req.params["id"]));
    });

    routerCompetence.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        (async function() {
            try {
                await db.competenceModel.update({ 
                    competence: req.body.competence,
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

    routerCompetence.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        (async function() {
            try {
                await db.competenceModel.destroy({
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
    
    app.use('/api/competencies', routerCompetence);
};