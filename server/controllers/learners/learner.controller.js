import db from '../../models/index.js';
const Op = db.Sequelize.Op;
const fn = db.Sequelize.fn;
const col = db.Sequelize.col;

class LearnerController {
    async getLearners(req, res) {
        try {
            const learners = await db.learnerModel.findAll({raw: true});

            return res.status(200).json(learners);
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: "Ошибка получения данных", err });
        }
    }

    async createLearner(req, res) {
        try {
            const { 
                phone_number,
                email,
                address,
                SNILS,
                INN,
                passport_id,
                job_id,
                group_id
            } = req.body;
            const candidate = await db.learnerModel.findOne({ 
                where: { 
                    phone_number: phone_number,
                    email: email,
                    address: address,
                    SNILS: SNILS,
                    INN: INN,
                    passport_id: passport_id,
                    job_id: job_id,
                    group_id: group_id
                } 
            });
            if (candidate) {
                return res.status(400).json({ message: "Данная форма обучения уже существует" })
            }

            const learner = await db.learnerModel.create({
                phone_number: phone_number,
                email: email,
                address: address,
                SNILS: SNILS,
                INN: INN,
                passport_id: passport_id,
                job_id: job_id,
                group_id: group_id
            });
            return res.status(201).json(learner);
        } catch (err) {
            console.log(err);
            res.status(422).json({ message: "Ошибка отправки данных", err });
        }
    }

    async getLearnerById(req, res) {
        try {
            const learner = await db.learnerModel.findByPk(req.params["id"]);
            return res.status(200).json(learner);
        } catch (err) {
            console.log(err);
            res.status(422).json({ message: "Ошибка получения данных", err });
        }
    }

    async updateLearnerById(req, res) {
        try {
            const { 
                phone_number: phone_number,
                email: email,
                address: address,
                SNILS: SNILS,
                INN: INN,
                passport_id: passport_id,
                job_id: job_id,
                group_id: group_id
            } = req.body;
            await db.learnerModel.update({ 
                phone_number: phone_number,
                email: email,
                address: address,
                SNILS: SNILS,
                INN: INN,
                passport_id: passport_id,
                job_id: job_id,
                group_id: group_id
            },{
                where: {
                    id: req.params["id"]
                }
            });
            const learner = await db.learnerModel.findByPk(req.params["id"]);
            return res.status(200).json(learner);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Ошибка получения данных", err });
        }
    }

    async deleteLearnerById(req, res) {
        try {
            await db.learnerModel.destroy({
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

    async searchLearner(req, res) {
        try {
            const { 
                text: text
            } = req.body;

            const learners = await db.learnerModel.findAll({
                raw: true,
                include: {
                    model: db.passportModel,
                    where: {
                        FIO: where(
                            fn(
                              'concat',
                              col('first_name'),
                              ' ',
                              col('last_name'),
                              ' ',
                              col('patronymic')
                            ),
                            { [Op.like]: '%' + text + '%' }
                        )
                    }
                }
                // where: {
                //     [Op.or]: {
                //         phone_number: { [Op.like]: phone_number + '%' },
                //         email: { [Op.like]: email + '%' },
                //         address: { [Op.like]: '%' + address + '%' },
                //         SNILS: { [Op.like]: SNILS + '%' },
                //         INN: { [Op.like]: INN + '%' }
                //     }
                // }
                // limit: 10
            });     

            return res.status(200).json(learners);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Ошибка получения данных", err });
        }
    }
}

export default new LearnerController;