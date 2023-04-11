import express from 'express';
import morgan from 'morgan';
import db from './models/index.js';
import recordRoute from './routers/record.routes.js'; 

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

recordRoute(app);

db.sequelize.sync().then(()=>{
    app.listen(app.get('port'), () => {
        console.log(`[OK] Сервер работает на localhost: ${app.get('port')}`);
    });
}).catch(err => console.log(err));

