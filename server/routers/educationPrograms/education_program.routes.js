import express from 'express';
import db from '../../models/index.js';

export default function(app) {
    
    const routerEduProgram = express.Router();

    routerEduProgram.get('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.eduProgramModel.findAll({raw: true}));
    });
        
    routerEduProgram.post('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.eduProgramModel.create({
            education_program: req.body.education_program,
            training_duration: req.body.training_duration
        })
        .then(res.json({state: 'success'}))
        .catch(err=>{
            console.log(err);
            res.json({state: 'recording error'})
        });
    });

    routerEduProgram.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.eduProgramModel.findByPk(req.params["id"]));
    });

    routerEduProgram.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.eduProgramModel.update({ 
            education_program: req.body.education_program,
            training_duration: req.body.training_duration
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

    routerEduProgram.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.eduProgramModel.destroy({
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
    
    app.use('/api/education_programs', routerEduProgram);
};