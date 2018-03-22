'use strict';

//run: node versioned.js

//dependencies
const path = require('path');
const express = require('express')
// const Router = require('@lykmapipo/express-router-extra');
const mount = require(path.join(__dirname, '..', '..')).mount;

//mount routers into app
const app = express();
mount('./v1', './v2').into(app);

app.listen(3000);