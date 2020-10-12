const express = require('express');
const app = express();
const dotenv = require('dotenv').config({path:'C:/nodeProgramLaptop/training-application/.env'})
let trainer = require('./routes/r-trainer');
const bodyParser= require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

const port = process.env.port;
app.use(trainer);
app.listen(port);
console.log(`server listening on port  ${port}`);