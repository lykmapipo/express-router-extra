'use strict';


/**
 * @module router-extra
 * @description express router extensions
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */


//dependencies
const _ = require('lodash');
const semver = require('semver');
const express = require('express');
const ExpressRouter = express.Router;


/**
 * @name Router
 * @description factory to create express router with version
 * @param {Object} [optns] valid express router options plus its version
 * @param {String|Number} [optns.version] valid router version. default to 1
 * @return {Object|Router} valid express router instance
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */
function Router(optns) {

  //merge default options
  const options = _.merge({}, { version: 1, prefix: 'v' }, optns);

  //instantiate and add resource details
  const router = new ExpressRouter(options);
  router.version = semver.coerce(String(options.version || 1)).version;
  router.prefix = options.prefix || 'v';

  /**
   * @name mountInto
   * @description mount this router into provided express application
   * @param  {express} app valid instance of express application
   * @author lally elias <lallyelias87@mail.com>
   * @since  0.1.0
   * @version 0.1.0
   * @public
   */
  function mount(app) {
    if (app && app.use) {
      const prefix = `/${router.prefix}${router.version}`;
      app.use(prefix, router);
    }
    return router;
  }
  router.into = router.mount = router.mountInto = mount;

  return router;

}


module.exports = exports = Router;