// import { authJwt } from '../../middleware/authJwt.js';
// import * as controller from '../../controllers/user.controller.js';

// export default function(app) {

//     app.use(function(req, res, next) {
//         res.header(
//             "Access-Control-Allow-Headers",
//             "x-access-token, Origin, Content-Type, Accept"
//         );
//         next();
//     });

//     app.get("/api/test/all", controller.allAccess);

//     app.get(
//         "/api/test/user",
//         [authJwt.verifyToken],
//         controller.userBoard
//     );
// };
