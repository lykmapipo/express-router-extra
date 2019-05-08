'use strict';

//run: node simple.js

//dependencies
const path = require('path');
const express = require('express');
// const { Router, mountInto } = require('@lykmapipo/express-router-extra');
const { Router, mountInto } = require(path.join(__dirname, '..'));
const faker = require('faker');

process.env.CWD = path.resolve(__dirname);
const app = express();

//instantiate a router
const router = new Router({ prefix: 'v', version: 1 });


// GET /v1/users
router.get('/users', (request, response) => {
  response.status(200).json({ data: [faker.helpers.userCard()] });
});


// GET /v1/users
router.post('/users', (request, response) => {
  response.status(201).json(faker.helpers.userCard());
});


// GET /v1/users/:id
router.get('/users/:id', (request, response) => {
  response.status(200).json(faker.helpers.userCard());
});


// PUT /v1/users/:id 
router.put('/users/:id', (request, response) => {
  response.status(200).json(faker.helpers.userCard());
});


// PATCH /v1/users/:id 
router.patch('/users/:id', (request, response) => {
  response.status(200).json(faker.helpers.userCard());
});


// DELETE /v1/users/:id 
router.delete('/users/:id', (request, response) => {
  response.status(200).json(faker.helpers.userCard());
});


//mount router into app
mountInto(app, router);


app.listen(3000);