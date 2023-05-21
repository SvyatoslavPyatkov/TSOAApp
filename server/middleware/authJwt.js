import * as jwt from 'jsonwebtoken';
import * as config from '../config/auth.config.js';
import db from '../models/index.js';

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
        return res.status(403).send({
            message: "Токен отсутствует!"
        });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Пользователь неавторизован!"
            });
        }
        req.id = decoded.id;
        next();
    });
};
  
const isUser = (req, res, next) => {
    db.userModel.findByPk(req.id).then(user => {
        if (!user) {
            res.status(403).send({
                message: "Доступ запрещён!"
            });
        }
    });
};
  
export const authJwt = {
    verifyToken: verifyToken,
    isUser: isUser
};