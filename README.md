# express-router-extra

[![Build Status](https://app.travis-ci.com/lykmapipo/express-router-extra.svg?branch=master)](https://app.travis-ci.com/lykmapipo/express-router-extra)
[![Dependencies Status](https://david-dm.org/lykmapipo/express-router-extra.svg)](https://david-dm.org/lykmapipo/express-router-extra)
[![Coverage Status](https://coveralls.io/repos/github/lykmapipo/express-router-extra/badge.svg?branch=master)](https://coveralls.io/github/lykmapipo/express-router-extra?branch=master)
[![GitHub License](https://img.shields.io/github/license/lykmapipo/express-router-extra)](https://github.com/lykmapipo/express-router-extra/blob/master/LICENSE)

[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![npm version](https://img.shields.io/npm/v/@lykmapipo/express-router-extra)](https://www.npmjs.com/package/@lykmapipo/express-router-extra)

Handy express router extensions.


## Requirements

- NodeJS v9.3.0+

## Install
```sh
$ npm install --save @lykmapipo/express-router-extra
```

## Usage

```javascript
import express from 'express';
import { Router } from '@lykmapipo/express-router-extra';

// instantiate a router
const router = new Router({prefix: 'v', version: 1});
router.get('/users', ...); // GET /v1.0.0/users
router.post('/users', ...); // GET /v1.0.0/users
router.get('/users/:id', ...); // GET /v1.0.0/users/:id
router.put('/users/:id', ...); // PUT /v1.0.0/users/:id
router.patch('/users/:id', ...); // PATCH /v1.0.0/users/:id
router.delete('/users/:id', ...); // DELETE /v1.0.0/users/:id

// mount router into app
router.mountInto(app);

app.listen(3000);

```

- [See Example](https://github.com/lykmapipo/express-router-extra/blob/master/examples/index.js)

Test mounted path(s)
```curl
GET /v1.0.0/users HTTP/1.1
Authorization: Bearer <token>
Accept: application/json
```


## Testing
* Clone this repository

* Install all development dependencies
```sh
$ npm install
```
* Then run test
```sh
$ npm test
```

## Contribute
It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## Licence
The MIT License (MIT)

Copyright (c) lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
