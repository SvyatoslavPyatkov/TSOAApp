import express from 'express';
export const router = express.Router();
import controller from '../../controllers/auth.controller.js';
import { check } from 'express-validator';
import authMidleware from '../../middleware/auth.midleware.js';

router.post('/registration', [
    check('username', 'Имя пользователя не может быть пустым.').trim().notEmpty(),
    check('password', 'Пароль должен быть больше 4 и меньше 30 символов.').trim().isLength({ min: 4, max: 30 })
], controller.registration);
router.post('/login', controller.login);
router.get('/users', authMidleware, controller.getUsers);

// export default function(app) {
//     app.use(function(req, res, next) {
//         res.header(
//             "Access-Control-Allow-Headers",
//             "x-access-token, Origin, Content-Type, Accept"
//         );
//         next();
//     });

//     app.post(
//         "/api/auth/signup",
//         [
//             verifySignUp.checkDuplicateUsername
//         ],
//         controller.signup
//     );

//     app.post("/api/auth/signin", controller.signin);
// };
