'use strict';

//dependencies
const path = require('path');
const express = require('express')
// const Router = require('@lykmapipo/express-router-extra');
const Router = require(path.join(__dirname, '..'));
const faker = require('faker');

const app = express();

//instantiate a router
const router = new Router({ prefix: 'v', version: 1 });


// GET /v1.0.0/users
router.get('/users', function (request, response) {
  response.status(200).json({ data: [faker.helpers.userCard()] });
});


// GET /v1.0.0/users
router.post('/users', function (request, response) {
  response.status(201).json(faker.helpers.userCard());
});


// GET /v1.0.0/users/:id
router.get('/users/:id', function (request, response) {
  response.status(200).json(faker.helpers.userCard());
});


// PUT /v1.0.0/users/:id 
router.put('/users/:id', function (request, response) {
  response.status(200).json(faker.helpers.userCard());
});


// PATCH /v1.0.0/users/:id 
router.patch('/users/:id', function (request, response) {
  response.status(200).json(faker.helpers.userCard());
});


// DELETE /v1.0.0/users/:id 
router.delete('/users/:id', function (request, response) {
  response.status(200).json(faker.helpers.userCard());
});


//mount router into app
router.mount().into(app);


app.listen(3000);