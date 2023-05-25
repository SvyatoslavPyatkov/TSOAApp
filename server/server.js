import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import db from './models/index.js';
import multer from 'multer';

// import routerEduProgram from './routers/educationPrograms/education_program.routes.js';
// import routerLearner from './routers/learners/OLD_learner.routes.js';
// import routerPassport from './routers/learners/OLD_passport.routes.js';
// import routerUser from './routers/auth/user.routes.js';

import { router as routerAuth} from './routers/auth/auth.routes.js';
import { router as routerLearner} from './routers/learners/learner.routes.js';
import { router as routerPassport} from './routers/learners/passport.routes.js';
import { router as routerJob} from './routers/learners/job.routes.js';

import { router as routerGroup} from './routers/groups/group.routes.js';

import { router as routerEduProgram} from './routers/educationPrograms/education_program.routes.js';
import { router as routerEduForm} from './routers/educationPrograms/education_form.routes.js';
import { router as routerFile} from './routers/files/file.routes.js';

import { storageFolder } from './config/multer.config.js'
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express();

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storageFolder);
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4());
    },
});

app.set('port', 3000);
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(multer({storage:storageConfig}).single("filedata"));
// app.use(express.static('uploads'));
app.use('/', express.static(path.join(__dirname, '../dist')));

// routerEduProgram(app);
// routerGroup(app);
// routerLearner(app);
// routerPassport(app);
// routerUser(app);

app.use('/api/auth', routerAuth);
app.use('/api/', routerFile);
app.use('/api/', routerLearner);
app.use('/api/', routerPassport);
app.use('/api/', routerJob);
app.use('/api/', routerGroup);
app.use('/api/', routerEduProgram);
app.use('/api/', routerEduForm);

// forceBool = true - включить пересоздание таблиц, пустой аргумент - false
db.sequelize.sync({force: Boolean(process.argv[2])}).then(()=>{
    app.listen(app.get('port'), () => {
        console.log(`[OK] Сервер работает на localhost: ${app.get('port')}`);
    });
}).catch(err => console.log(err));

