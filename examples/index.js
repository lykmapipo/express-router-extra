import path from 'path';
import express from 'express';
import faker from 'faker';
import { Router } from '../src';

const PORT = 3000;
process.env.CWD = path.resolve(__dirname);
const app = express();

// instantiate a router
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

// mount router into app
router.mountInto(app);

// run express app
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  } else {
    console.log(`visit http://0.0.0.0:${PORT}/v1/users`);
  }
});
