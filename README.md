# express-router-extra

[![Build Status](https://travis-ci.org/lykmapipo/express-router-extra.svg?branch=master)](https://travis-ci.org/lykmapipo/express-router-extra)
[![Dependency Status](https://img.shields.io/david/lykmapipo/express-router-extra.svg?style=flat)](https://david-dm.org/lykmapipo/express-router-extra)
[![npm version](https://badge.fury.io/js/%40lykmapipo%2Fexpress-router-extra.svg)](https://badge.fury.io/js/@lykmapipo/express-router-extra)


express router extensions.


## Requirements

- NodeJS v9.3.0+
- body-parser

## Install
```sh
$ npm install --save @lykmapipo/express-router-extra
```

## Usage

```javascript
const express = require('express')
const Router = require('@lykmapipo/express-router-extra');

const app = express();

//instantiate a router
const router = new Router({prefix: 'v', version: 1});
router.get('/users', ...);
router.post('/users', ...);
router.get('/users/:id', ...);
router.put('/users/:id', ...);
router.patch('/users/:id', ...);
router.delete('/users/:id', ...);

//mount router into app
router.mount().into(app);

app.listen();

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

Copyright (c) 2018 lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 