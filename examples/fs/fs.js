'use strict';

//run: node fs.js

//dependencies
const path = require('path');
const express = require('express')
// const Router = require('@lykmapipo/express-router-extra');
const mount = require(path.join(__dirname, '..', '..')).mount;

//mount routers into app
const app = express();
mount('./v1', './v2').into(app); //path  must be relative to `cwd`

app.listen(3000);