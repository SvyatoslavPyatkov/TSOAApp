import db from '../../models/index.js';
const Op = db.Sequelize.Op;
const fn = db.Sequelize.fn;
const col = db.Sequelize.col;

class GroupController {
    
    async getGroups(req, res) {
        try {
            const groups = await db.groupModel.findAll({raw: true});

            return res.status(200).json(groups);
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: "Ошибка получения данных", err });
        }
    }

    async createGroup(req, res) {
        try {
            const { 
                name,
                education_program_id
            } = req.body;
            const candidate = await db.groupModel.findOne({ 
                where: { 
                    name: name,
                    education_program_id: education_program_id
                } 
            });
            if (candidate) {
                return res.status(400).json({ message: "Данная форма обучения уже существует" })
            }

            const group = await db.groupModel.create({
                name: name,
                education_program_id: education_program_id
            });
            return res.status(201).json(group);
        } catch (err) {
            console.log(err);
            res.status(422).json({ message: "Ошибка отправки данных", err });
        }
    }

    async getGroupById(req, res) {
        try {
            const group = await db.groupModel.findByPk(req.params["id"]);
            return res.status(200).json(group);
        } catch (err) {
            console.log(err);
            res.status(422).json({ message: "Ошибка получения данных", err });
        }
    }

    async updateGroupById(req, res) {
        try {
            const { 
                name: name,
                education_program_id: education_program_id
            } = req.body;
            await db.learnerModel.update({ 
                name: name,
                education_program_id: education_program_id
            },{
                where: {
                    id: req.params["id"]
                }
            });
            const group = await db.groupModel.findByPk(req.params["id"]);
            return res.status(200).json(group);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Ошибка получения данных", err });
        }
    }

    async deleteGroupById(req, res) {
        try {
            await db.groupModel.destroy({
                where: {
                    id: req.params["id"]
                }
            });
            return res.status(204).json();
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Ошибка получения данных", err });
        }
    }

    async searchGroup(req, res) {
        try {
            const { 
                text: text
            } = req.query;

            const group = await db.groupModel.findAll({
                raw: true,
                where: {
                    name: { [Op.like]: '%' + text + '%' }
                }
                // limit: 10
            });     

            return res.status(200).json(group);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Ошибка получения данных", err });
        }
    }

    async getLearnersByGroupId(req, res) {
        try {
            const learners = await db.learnerModel.findAll({
                include: [
                    {model: db.passportModel},
                    {model: db.jobModel},
                    {where: {
                        id: req.params["id"]
                    },
                    model: db.groupModel,
                    include: {
                        model: db.eduProgramModel,
                        include: {
                            model: db.eduFormModel
                        },
                        attributes: {exclude: ['education_form_id']}
                    },
                    attributes: {exclude: ['education_program_id']}}
                ],
                attributes: {exclude: ['group_id', 'passport_id', 'job_id']}
            });
            return res.status(200).json(learners);
        } catch (err) {
            console.log(err);
            res.status(422).json({ message: "Ошибка получения данных", err });
        }
    }
}

export default new GroupController;