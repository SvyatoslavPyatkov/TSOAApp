import express from 'express';
import morgan from 'morgan';
import db from './models/index.js';
import routerEduProgram from './routers/educationPrograms/education_program.routes.js';
import routerGroup from './routers/groups/group.routes.js';
import routerLearner from './routers/learners/learner.routes.js';
import routerPassport from './routers/learners/passport.routes.js';
// import routerUser from './routers/auth/user.routes.js';

import { router as routerAuth} from './routers/auth/auth.routes.js';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set('port', 3000);
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use('/', express.static(path.join(__dirname, '../dist')));

routerEduProgram(app);
routerGroup(app);
routerLearner(app);
routerPassport(app);
// routerUser(app);

app.use('/api/auth', routerAuth);

// forceBool = true - включить пересоздание таблиц, пустой аргумент - false
db.sequelize.sync({force: Boolean(process.argv[2])}).then(()=>{
    app.listen(app.get('port'), () => {
        console.log(`[OK] Сервер работает на localhost: ${app.get('port')}`);
    });
}).catch(err => console.log(err));

