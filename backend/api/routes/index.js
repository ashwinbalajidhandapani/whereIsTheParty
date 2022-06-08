import userRouter from './users.js';

export default (app) => {
    app.use('/', userRouter);
}