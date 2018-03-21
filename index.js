'use strict';


/**
 * @module router-extra
 * @description express router extensions
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */


//dependencies
const _ = require('lodash');
const semver = require('semver');
const uuid = require('uuid/v1');
const express = require('express');
const ExpressRouter = express.Router;


/**
 * @name Router
 * @type {Function}
 * @description factory to create express router with version
 * @param {Object} [optns] valid express router options plus its version
 * @param {String|Number} [optns.version] valid router version. default to 1
 * @return {Object|Router} valid express router instance
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @public
 * @example
 * const app = require('express')();
 * const Router = require('@lykmapipo/express-router-extra').Router;
 *
 * //instantiate a router
 * const router = new Router({prefix: 'v', version: 1});
 * router.get('/users', ...); // GET /v1.0.0/users
 * router.post('/users', ...); // GET /v1.0.0/users
 * router.get('/users/:id', ...); // GET /v1.0.0/users/:id
 * router.put('/users/:id', ...); // PUT /v1.0.0/users/:id
 * router.patch('/users/:id', ...); // PATCH /v1.0.0/users/:id
 * router.delete('/users/:id', ...); // DELETE /v1.0.0/users/:id
 *
 * //mount router into app
 * router.mount().into(app);
 *
 * app.listen(3000);
 */
function Router(optns) {

  //merge default options
  const options = _.merge({}, { version: 1, prefix: 'v', uuid: uuid() }, optns);

  //instantiate and add resource details
  const router = new ExpressRouter(options);
  router.version = semver.coerce(String(options.version || 1)).version;
  router.prefix = options.prefix || 'v';
  router.uuid = options.uuid || uuid();

  /**
   * @name mountInto
   * @type {Function}
   * @description mount this router into provided express application
   * @param  {express} app valid instance of express application
   * @author lally elias <lallyelias87@mail.com>
   * @since  0.1.0
   * @version 0.1.0
   * @public
   */
  function mount(app) {
    if (app && app.use) {
      exports.mount(router).into(app);
    }
    return router;
  }
  router.into = router.mount = router.mountInto = mount;

  return router;

}



/**
 * @name Mount
 * @type {Function}
 * @description factory to mount versioned router(s) into express app instance
 * @param {Object} [optns] valid express router options plus its version
 * @param {String} [optns.cwd] current working directory. default to process.cwd()
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @public
 * @example
 * const app = require('express')();
 * const mount = require('@lykmapipo/express-router-extra').mount;
 * const router = require('@lykmapipo/express-router-extra').Router();
 *
 * mount(router).into(app);
 * 
 * mount(routerA, routerB, routerC).into(app);
 * 
 * mount({cwd : './routers'}).into(app);
 *
 * app.listen(3000);
 * 
 */
function Mount(optns) {

  //merge default options
  this.options = _.merge({}, { cwd: process.cwd() }, optns);

  return this;
}


/**
 * @name mount
 * @type {Function}
 * @description ensure unique routers from provided list and loaded routers
 *              from cwd
 * @param  {...Router} [wrouters] valid express router collections
 * @return {Object} valid instance of mount for further chaining
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */
Mount.prototype.mount = function mount(...wrouters) {

  //collect routers passed routers
  let routers = [].concat(...wrouters);

  //load cwd routers
  if (!_.isEmpty(this.options.cwd)) {

  }

  this.routers = _.uniqBy(routers, 'uuid');

  return this;

};


/**
 * @name into
 * @type {Function}
 * @description load(use) current mount routers into provided express app 
 * @param  {Object} app valid express application or router
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */
Mount.prototype.into = function into(app) {

  //mount all current routers
  if (app && app.use) {

    //setup version based routers
    _.forEach(this.routers, function (router) {

      //register versioned routers
      if (router.version && semver.valid(router.version)) {
        const prefix = `/${router.prefix}${router.version}`;
        app.use(prefix, router);
      }

      //register normal routers
      else {
        app.use(router);
      }

    });
  }

  return this;

};


//exports
exports.Router = Router;
exports.Mount = Mount;
exports.mount = function mount(...wrouters) {
  return new Mount({ cwd: undefined }).mount(...wrouters);
};