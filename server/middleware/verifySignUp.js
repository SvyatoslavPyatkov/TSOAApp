import db from '../models/index.js';

checkDuplicatedb.Username = (req, res) => {
    // db.Username
    db.user.findOne({
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