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
const uuid = require('uuid/v1');
const express = require('express');
const { apiVersion } = require('@lykmapipo/env');

//constants
const defaults = {
  version: 1,
  prefix: 'v',
  major: true,
  minor: false,
  patch: false
};

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

  // merge default options
  const options = _.merge({}, { uuid: uuid() }, defaults, optns);

  // instantiate and add resource details
  const router = new express.Router(options);

  // update router metadata
  router.version = apiVersion(options);
  router.uuid = options.uuid || uuid();

  /**
   * @name mountInto
   * @type {Function}
   * @description mount this router into provided express application
   * @param {express} app valid instance of express application
   * @author lally elias <lallyelias87@mail.com>
   * @since  0.1.0
   * @version 0.1.0
   * @public
   */
  function mount(app) {
    if (app && app.use) {
      exports.mountInto(app, router);
    }
    return router;
  }
  router.into = router.mount = router.mountInto = mount;

  // return router
  return router;
}


/**
 * @name mountInto
 * @type {Function}
 * @description mount provided routers into provided express app 
 * @param {Object} app valid express application or router
 * @param {...Router} wrouters valid express router instances
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @public
 * @example
 *
 * mountInto(app, routerA, routerB);
 * 
 */
const mountInto = (app, ...wrouters) => {
  // collect routers passed routers
  let routers = [].concat(...wrouters);

  // retain only routers unique valid routers
  routers = _.filter(routers, function (router) {
    return (_.isFunction(router) && router.name === 'router');
  });
  routers = _.compact(routers);
  routers = _.uniqBy(routers, 'uuid');

  // mount all current routers
  if (app && app.use) {

    //setup version based routers
    _.forEach(routers, router => {

      // register versioned routers
      if (router.version) {
        const prefix = `/${router.version}`;
        app.use(prefix, router);
      }

      // register normal routers
      else {
        app.use(router);
      }

    });
  }

};

// exports
exports.Router = Router;
exports.mountInto = mountInto;