import express from 'express';
import db from '../../models/index.js';

export default function(app) {
    
    const routerGroup = express.Router();

    routerGroup.get('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.json(await db.groupModel.findAll({raw: true}));
    });
        
    routerGroup.post('/', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        (async function() {
            try {
                let record = { group_id: null, group_document_id: null };
                let out; console.log(out);

                await db.groupModel.create({
                    enrollment_date: req.body.enrollment_date,
                    expulsion_date: req.body.expulsion_date,
                    education_program_id: req.body.education_program_id
                }).then(res=>{
                    record = {
                        group_id: res.id
                    }
                }).then(await db.groupDocumentModel.create({
                    name: req.body.name,
                    document_path: req.body.document_path,
                    group_document_type_id: req.body.group_document_type_id
                }).then(res=>{
                    record = {
                        group_document_id: res.id
                    }
                    console.log(record)
                }).then(db.groupsHasGroupDocumentModel.create({
                    group_id: record.group_id,    
                    group_document_id:  record.group_document_id
                    })
                ));
                res.json({state: 'success'});
            } 
            catch (err) {
                console.log(err);
                res.json({state: 'recording error'});
            }
        })();
    });

    routerGroup.get('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.json(await db.groupModel.findByPk(req.params["id"]));
    });

    routerGroup.put('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        (async function() {
            try {
                await db.groupModel.update({ 
                    enrollment_date: req.body.enrollment_date,
                    expulsion_date: req.body.expulsion_date,
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

    routerGroup.delete('/:id', async function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        (async function() {
            try {
                await db.groupModel.destroy({
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

    app.use('/api/groups', routerGroup);
};