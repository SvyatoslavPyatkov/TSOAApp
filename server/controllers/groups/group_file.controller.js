import db from '../../models/index.js';
const Op = db.Sequelize.Op;
const fn = db.Sequelize.fn;
const col = db.Sequelize.col;

class GroupFileController {

    async getGroupDocuments(req, res) {
        try {
            const files = await db.groupFileModel.findAll({
                raw: true,
                include: {
                    model: db.groupModel,
                    where: {
                        id: req.params["id"]
                    },
                }
            });
            return res.status(200).json(files);
        } catch (err) {
            console.log(err);
            res.status(422).json({ message: "Ошибка получения данных", err });
        }
    }
// переделать
    async createGroupDocument(req, res) {
        try {
            const { name } = req.body;
            const candidate = await db.learnerModel.findOne({ where: { name: name } });
            if (candidate) {
                return res.status(400).json({ message: "Данная форма обучения уже существует" })
            }

            const learner = await db.learnerModel.create({
                name: name
            });
            return res.status(201).json(learner);
        } catch (err) {
            console.log(err);
            res.status(422).json({ message: "Ошибка отправки данных", err });
        }
    }
}

export default new GroupFileController;