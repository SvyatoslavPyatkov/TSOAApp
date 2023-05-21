import db from '../models/index.js';
import * as config from '../config/auth.config.js';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

export function signup(req, res) {
    // Сохранить db.userModel в базе данных
    db.userModel.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        hashed_password: bcrypt.hashSync(req.body.hashed_password, 8)
    })
    .then(
        res.send({ message: "Пользователь был успешно зарегистрирован." })
    )
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};
  
export function signin(req, res) {
    db.userModel.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "Пользователь не найден." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
            req.body.hashed_password,
            user.hashed_password
        );
  
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Неверный пароль!"
            });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // Действие токена - 24 часа
        });

        res.status(200).send({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            accessToken: token
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

