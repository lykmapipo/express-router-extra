'use strict';


//dependencies
const path = require('path');
// const Router = require('@lykmapipo/express-router-extra');
const Router = require(path.join(__dirname, '..', '..', '..')).Router;
const faker = require('faker');


//instantiate a router
const router = new Router({ prefix: 'v', version: 2 });

// GET /v2.0.0/users
router.get('/users', function (request, response) {
  response.status(200).json({ data: [faker.helpers.userCard()] });
});


// GET /v2.0.0/users
router.post('/users', function (request, response) {
  response.status(201).json(faker.helpers.userCard());
});


// GET /v2.0.0/users/:id
router.get('/users/:id', function (request, response) {
  response.status(200).json(faker.helpers.userCard());
});


// PUT /v2.0.0/users/:id 
router.put('/users/:id', function (request, response) {
  response.status(200).json(faker.helpers.userCard());
});


// PATCH /v2.0.0/users/:id 
router.patch('/users/:id', function (request, response) {
  response.status(200).json(faker.helpers.userCard());
});


// DELETE /v2.0.0/users/:id 
router.delete('/users/:id', function (request, response) {
  response.status(200).json(faker.helpers.userCard());
});


//exports
module.exports = exports = router;