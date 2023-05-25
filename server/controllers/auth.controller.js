import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_ACCESS_EXPIRE, JWT_REFRESH_EXPIRE } from '../config/auth.config.js';
import { validationResult } from 'express-validator';

const generateAccessToken = (id) => {
    const payload = { id }
    return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRE });
}

const generateRefreshToken = (id) => {
    const payload = { id }
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRE });
}

const validateAccessToken = (token) => {
    try {
        const userData = jwt.verify(token, JWT_ACCESS_SECRET);
        return userData;
    } catch (err) {
        return null;
    }
}

const validateRefreshToken = (token) => {
    try {
        const userData = jwt.verify(token, JWT_REFRESH_SECRET);
        return userData;
    } catch (err) {
        return null;
    }
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
                res.status(201).json({ message: "Пользователь был успешно зарегистрирован." })
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
                const accessToken = generateAccessToken(user.id);
                const refreshToken = generateRefreshToken(user.id);
                res.cookie("refreshToken", refreshToken, {maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true});
                return res.json({accessToken, refreshToken});
            });
        } catch (err) {
            res.status(400).json({ message: "Ошибка авторизации" })
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('refreshToken');
            return res.status(204).json();
        } catch (err) {
            res.status(400).json({ message: "Ошибка выхода из учётной записи" })
        }
    }

    async refresh(req, res) {
        try {
            const {refreshToken} = req.cookies;
            if (!refreshToken) {
                return res.status(400).json({ message: "Ошибка авторизации" });
            }
            const userData = validateRefreshToken(refreshToken);
            if (!userData) {
                return res.status(400).json({ message: "Ошибка авторизации" });
            }

            const user = await db.userModel.findByPk(userData.id);
            const accessToken = generateAccessToken(user.id);
            const newRefreshToken = generateRefreshToken(user.id);
            res.cookie('refreshToken', newRefreshToken, {maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(204).json({ message: "Токен обновлен успешно" });

        } catch (err) {
            return res.status(400).json({ message: "Ошибка авторизации" });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await db.userModel.findAll({
                attributes: {exclude: ['hashed_password']}
            });
            res.json(users);
        } catch (err) {
            res.status(400).json({ message: "Ошибка получения пользователей" })
        }
    }
}

export default new authController;