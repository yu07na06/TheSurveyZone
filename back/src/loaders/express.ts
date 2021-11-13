import * as express from 'express';
import * as bodyParser from 'body-parser';
import api from "../api"
import cors from 'cors';

export default async ({ app }: { app: express.Application }) => {

    app.get('/status', (req, res) => { res.status(200).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });

    app.use(cors());
    app.use(require('morgan')('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use("/", api);
    // ...More middlewares

    // Return the express app
    return app;
}