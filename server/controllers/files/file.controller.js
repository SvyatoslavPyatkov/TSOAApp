import db from '../../models/index.js';
const Op = db.Sequelize.Op;

class FileController {
    async getFileTypes(req, res) {
        try {
            const fileTypes = await db.fileTypeModel.findAll({raw: true});

            return res.status(200).json(fileTypes);
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: "Ошибка получения данных", err });
        }
    }

    async createFileType(req, res) {
        try {
            const { name } = req.body;
            const candidate = await db.fileTypeModel.findOne({ where: { name: name } });
            if (candidate) {
                return res.status(400).json({ message: "Данный тип файла уже существует" })
            }

            const form = await db.fileTypeModel.create({
                name: name
            });
            return res.status(201).json(form);
        } catch (err) {
            console.log(err);
            res.status(422).json({ message: "Ошибка отправки данных", err });
        }
    }

    async updateFileTypeById(req, res) {
        try {
            const { name } = req.body;
            await db.fileTypeModel.update({ 
                name: name
            },{
                where: {
                    id: req.params["id"]
                }
            });
            const form = await db.fileTypeModel.findByPk(req.params["id"]);
            return res.status(200).json(form);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Ошибка получения данных", err });
        }
    }

    async deleteFileTypeById(req, res) {
        try {
            await db.fileTypeModel.destroy({
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

    async searchFileType(req, res) {
        try {
            const { name } = req.body;

            const forms = await db.fileTypeModel.findAll({
                raw: true,
                where: {
                    name: {
                        [Op.like]: '%' + name + '%'
                    }
                }
                // limit: 10
            });     

            return res.status(200).json(forms);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Ошибка получения данных", err });
        }
    }

////////////////////////////////////////////////////

    async getFileById(req, res) {
        try {
            const form = await db.fileModel.findByPk(req.params["id"]);
            return res.status(200).json(form);
        } catch (err) {
            console.log(err);
            res.status(422).json({ message: "Ошибка получения данных", err });
        }
    }

    async deleteFileById(req, res) {
        try {
            await db.fileModel.destroy({
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
}

export default new FileController;