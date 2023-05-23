import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secret } from '../config/auth.config.js';
import { validationResult } from 'express-validator';

const generateAccessToken = (id) => {
    const payload = { id }
    return jwt.sign(payload, secret, { expiresIn: '24h' });
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors })
            }

            const { first_name, last_name, username, password } = req.body;
            const candidate = await db.userModel.findOne({ where: { username: username } });
            if (candidate) {
                return res.status(400).json({ message: "Пользователь с данным именем уже существует "})
            }
            const hashed_password = bcrypt.hashSync(password, 7);

            db.userModel.create({
                first_name: first_name,
                last_name: last_name,
                username: username,
                hashed_password: hashed_password
            })
            .then(
                res.json({ message: "Пользователь был успешно зарегистрирован." })
            )
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
        } catch (err) {
            res.status(400).json({ message: "Ошибка регистрации", errors })
        }
    }

    async login(req, res) {
        try {
            const { first_name, last_name, username, password } = req.body;
            const user = await db.userModel.findOne({ where: { username: username } });
            if (!user) {
                return res.status(400).json({ message: `Пользователь ${ username } не найден` })
            }

            bcrypt.compare(password, user.hashed_password)
            .then(function(validPassword) {
                if (!validPassword) {
                    return res.status(400).json({ message: "Введён неверный пароль" })
                }
                const token = generateAccessToken(user.id);
                return res.json({message: "Авторизация прошла успешно", token});
            });
        } catch (err) {
            res.status(400).json({ message: "Ошибка авторизации" })
        }
    }

    async getUsers(req, res) {
        try {
            const users = await db.userModel.findAll();
            res.json({ message: users });
        } catch (err) {

        }
    }
}

export default new authController;

// export function signup(req, res) {
//     // Сохранить db.userModel в базе данных
//     db.userModel.create({
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         username: req.body.username,
//         hashed_password: bcrypt.hashSync(req.body.hashed_password, 8)
//     })
//     .then(
//         res.send({ message: "Пользователь был успешно зарегистрирован." })
//     )
//     .catch(err => {
//         res.status(500).send({ message: err.message });
//     });
// };
  
// export function signin(req, res) {
//     db.userModel.findOne({
//         where: {
//             username: req.body.username
//         }
//     })
//     .then(user => {
//         if (!user) {
//             return res.status(404).send({ message: "Пользователь не найден." });
//         }
  
//         var passwordIsValid = bcrypt.compareSync(
//             req.body.hashed_password,
//             user.hashed_password
//         );
  
//         if (!passwordIsValid) {
//             return res.status(401).send({
//                 accessToken: null,
//                 message: "Неверный пароль!"
//             });
//         }
  
//         var token = jwt.sign({ id: user.id }, config.secret, {
//             expiresIn: 86400 // Действие токена - 24 часа
//         });

//         res.status(200).send({
//             id: user.id,
//             first_name: user.first_name,
//             last_name: user.last_name,
//             username: user.username,
//             accessToken: token
//         });
//     })
//     .catch(err => {
//         res.status(500).send({ message: err.message });
//     });
// };

