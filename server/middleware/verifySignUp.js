import db from '../models/index.js';

export const checkDuplicateUsername = (req, res) => {
    // db.Username
    db.userModel.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Не удалось! Имя пользователя уже используется!"
            });
            return;
        }
    });
};
  
export const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername
};