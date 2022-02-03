import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

const app = express();
const morgan = require('morgan');

import './db.js'
import userRoutes from './routes/userRoute';
import contactRoutes from './routes/contactRoute';
import fileUpload from 'express-fileupload';

dotenv.config({ path: './config.env' })
const PORT = process.env.PORT || 4200;

/* middlewares */
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(fileUpload({useTempFiles: true}));
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);
app.use('/api/contact', contactRoutes);

/* error handling middleware */
app.use((err, req, res, next) => {
    console.log(err);
    res.status(400).json({ err });
})

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));