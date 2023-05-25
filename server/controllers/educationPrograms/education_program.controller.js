import db from '../../models/index.js';
const Op = db.Sequelize.Op;
const fn = db.Sequelize.fn;
const col = db.Sequelize.col;

class EduProgramController {
    async getEducationPrograms(req, res) {
        try {
            const eduProgram = await db.eduProgramModel.findAll({raw: true});

            return res.status(200).json(eduProgram);
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: "Ошибка получения данных", err });
        }
    }

    async createEducationProgram(req, res) {
        try {
            const { 
                name,
                duration,
                education_form_id
            } = req.body;
            const candidate = await db.eduProgramModel.findOne({ 
                where: { 
                    name: name,
                    duration: duration,
                    education_form_id: education_form_id
                } 
            });
            if (candidate) {
                return res.status(400).json({ message: "Данная форма обучения уже существует" })
            }

            const eduProgram = await db.eduProgramModel.create({
                name: name,
                duration: duration,
                education_form_id: education_form_id
            });
            return res.status(201).json(eduProgram);
        } catch (err) {
            console.log(err);
            res.status(422).json({ message: "Ошибка отправки данных", err });
        }
    }

    async getEducationProgramById(req, res) {
        try {
            const eduProgram = await db.eduProgramModel.findByPk(req.params["id"]);
            return res.status(200).json(eduProgram);
        } catch (err) {
            console.log(err);
            res.status(422).json({ message: "Ошибка получения данных", err });
        }
    }

    async updateEducationProgramById(req, res) {
        try {
            const { 
                name: name,
                duration: duration,
                education_form_id: education_form_id
            } = req.body;
            await db.jobModel.update({ 
                name: name,
                duration: duration,
                education_form_id: education_form_id
            },{
                where: {
                    id: req.params["id"]
                }
            });
            const eduProgram = await db.eduProgramModel.findByPk(req.params["id"]);
            return res.status(200).json(eduProgram);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Ошибка получения данных", err });
        }
    }

    async deleteEducationProgramById(req, res) {
        try {
            await db.eduProgramModel.destroy({
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

    async searchEducationProgram(req, res) {
        try {
            const { 
                text: text
            } = req.query;

            const eduProgram = await db.eduProgramModel.findAll({
                where: {
                    name: { [Op.like]: '%' + text + '%' }
                }
                // limit: 10
            });     

            return res.status(200).json(eduProgram);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Ошибка получения данных", err });
        }
    }

    async getGroupsByEducationProgramId(req, res) {
        try {
            const groups = await db.groupModel.findAll({
                include: {
                    where: {
                        id: req.params["id"]
                    },
                    model: db.eduProgramModel,
                    include: {
                        model: db.eduFormModel
                    },
                    attributes: {exclude: ['education_form_id']}
                },
                attributes: {exclude: ['education_program_id']}
            });
            return res.status(200).json(groups);
        } catch (err) {
            console.log(err);
            res.status(422).json({ message: "Ошибка получения данных", err });
        }
    }
}

export default new EduProgramController;