import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

// The Below code snippet connects the application to the database

mongoose.connect('mongodb://127.0.0.1:27017/partyApp')
    .then(() => {
        console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

routes(app);

export default app;