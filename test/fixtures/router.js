'use strict';


//dependencie
const path = require('path');
const Router = require(path.join(__dirname, '..', '..')).Router;

const router = new Router({ prefix: 'v', version: '0.1.0' });

router.get('/fixtures', function (req, res) { res.json(req.body); });

module.exports = exports = router;