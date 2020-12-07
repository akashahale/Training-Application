const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const API_CONSTANT = require('./constants/api');

const app = express();

const handleUnhandledOperation = () => {
    process
        .on('unhandledRejection', (reason, p) => {
            console.error('Unhandled Rejection at Promise', reason);
        })
        .on('uncaughtException', (err) => {
            console.error('Uncaught Exception thrown', err);
            process.exit(1);
        });
};

module.exports = () => {
    handleUnhandledOperation();

    // Set response content type json - middleware
    app.use('/api', (req, res, next) => {
        res.set('Content-Type', 'application/json');
        next();
    });

    app.use(
        cors({
            allowedHeaders: ['content-type', 'Authorization'],
            credentials: true,
        })
    );

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '3mb' }));

    app.use(API_CONSTANT.API, require('./routes'));
    app.use('*', (req, res) => res.status(404).json('Page not found'));

    return app;
};
