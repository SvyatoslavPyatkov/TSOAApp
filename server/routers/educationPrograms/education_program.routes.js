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

    routerEduProgram.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        res.json(await db.eduProgramModel.findByPk(req.params["id"]));
    });

    routerEduProgram.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.eduProgramModel.update({ 
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

    routerEduProgram.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        await db.eduProgramModel.destroy({
            where: {
                id: req.params["id"]
            }
        });
        res.json({state: 'deleted'});
    });
    
    app.use('/api/education_programs', routerEduProgram);
};