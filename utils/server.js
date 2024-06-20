import express from 'express';
import router from './routes/index';

const express = require('express');
const app = express();
const routes = require('./routes/index');

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', routes);

app.listen(port, () =>{
    console.log('server listening on port ${port}');
});

export default app;