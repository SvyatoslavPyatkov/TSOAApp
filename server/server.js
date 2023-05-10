import express from 'express';
import morgan from 'morgan';
import db from './models/index.js';
import routerEduProgram from './routers/educationPrograms/education_program.routes.js';
import routerGroup from './routers/groups/group.routes.js';
import routerGroupDocument from './routers/groups/group_document.routes.js';
import routerGroupDocumentType from './routers/groups/group_document_type.routes.js';
import routerGroupsHasGroupDocument from './routers/groups/groups_has_group_document.routes.js';
import routerLearner from './routers/learners/learner.routes.js';
import routerGender from './routers/learners/gender.routes.js';
import routerPassport from './routers/learners/passport.routes.js';
import routerLearnerDocument from './routers/learners/learner_document.routes.js';
import routerLearnerDocumentType from './routers/learners/learner_document_type.routes.js';
import routerLearnersHasLearnerDocument from './routers/learners/learners_has_learner_document.routes.js';
import routerCompetence from './routers/educationPrograms/competence.routes.js';
import routerDiscipline from './routers/educationPrograms/discipline.routes.js';

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
routerGroupDocument(app);
routerGroupDocumentType(app);
routerGroupsHasGroupDocument(app);
routerLearner(app);
routerGender(app);
routerPassport(app);
routerLearnerDocument(app);
routerLearnerDocumentType(app);
routerLearnersHasLearnerDocument(app);
routerCompetence(app);
routerDiscipline(app);

// forceBool = true - включить пересоздание таблиц, пустой аргумент - false
db.sequelize.sync({force: Boolean(process.argv[2])}).then(()=>{
    app.listen(app.get('port'), () => {
        console.log(`[OK] Сервер работает на localhost: ${app.get('port')}`);
    });
}).catch(err => console.log(err));

