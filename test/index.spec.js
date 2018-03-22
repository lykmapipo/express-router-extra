'use strict';

//ensure test environment
process.env.NODE_ENV = 'test';


//dependencies
const path = require('path');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const supertest = require('supertest');
const expect = require('chai').expect;
const Router = require(path.join(__dirname, '..')).Router;
const Mount = require(path.join(__dirname, '..')).Mount;
const mount = require(path.join(__dirname, '..')).mount;


describe('Router', function () {

  describe('Unit', function () {

    it('should export router factory', function () {
      expect(Router).to.exist;
      expect(Router).to.be.a('function');
      expect(Router.name).to.be.equal('Router');
      expect(Router.length).to.be.equal(1);
    });

    it('should instantiate router with default version', function () {
      const router = new Router();
      expect(router).to.exist;
      expect(router.version).to.exist;
      expect(router.version).to.be.equal('1.0.0');
      expect(router.prefix).to.be.equal('v');
      expect(router.name).to.equal('router');

    });

    it('should instantiate router with provided version', function () {
      const router = new Router({ version: '0.1.0' });
      expect(router).to.exist;
      expect(router.version).to.exist;
      expect(router.version).to.be.equal('0.1.0');
      expect(router.prefix).to.be.equal('v');
      expect(router.name).to.equal('router');
    });

    it('should instantiate router with provided version prefix',
      function () {
        const router = new Router({ prefix: 'v-' });
        expect(router).to.exist;
        expect(router.version).to.exist;
        expect(router.version).to.be.equal('1.0.0');
        expect(router.prefix).to.be.equal('v-');
        expect(router.name).to.equal('router');
      });

    it('should instantiate router with provided version prefix',
      function () {
        const router = new Router({ prefix: 'v-', version: '0.1.0' });
        expect(router).to.exist;
        expect(router.version).to.exist;
        expect(router.version).to.be.equal('0.1.0');
        expect(router.prefix).to.be.equal('v-');
        expect(router.name).to.equal('router');
      });

  });

  describe('Mount', function () {

    it('should be a mount factory', function () {
      expect(Mount).to.exist;
      expect(Mount).to.be.a('function');
      expect(Mount.name).to.be.equal('Mount');
      expect(Mount.length).to.be.equal(1);
    });

    it('should export mount point', function () {
      expect(mount).to.exist;
      expect(mount).to.be.a('function');
      expect(mount.name).to.be.equal('mount');
    });

    it('should be able to mount router into app', function () {
      //before
      const app = express();
      expect(app._router).to.not.exist;

      //initialize & mount
      const router = new Router();
      router.get('/samples', function (req, res) { res.json(req.body); });
      const mounted = mount(router).into(app);

      //after
      expect(mounted.routers).to.exist;
      expect(mounted.routers).to.have.length(1);
      expect(app._router).to.exist;
      expect(app._router.stack).to.exist;
      const found =
        _.find(app._router.stack, ['handle.uuid', router.uuid]);
      expect(found).to.exist;
      expect(found.handle).to.eql(router);

    });

    it('should be able to mount router only once into app', function () {
      //before
      const app = express();
      expect(app._router).to.not.exist;

      //initialize & mount
      const router = new Router();
      router.get('/samples', function (req, res) { res.json(req.body); });
      const mounted = mount(router, router).into(app);

      //after
      expect(mounted.routers).to.exist;
      expect(mounted.routers).to.have.length(1);
      expect(app._router).to.exist;
      expect(app._router.stack).to.exist;
      const founds =
        _.filter(app._router.stack, ['handle.uuid', router.uuid]);
      expect(founds).to.exist;
      expect(founds).to.have.length(1);
      expect(_.first(founds).handle).to.eql(router);

    });


    it('should be able to mount routers into app', function () {
      //before
      const app = express();
      expect(app._router).to.not.exist;

      //initialize & mount
      const routerA = new Router();
      routerA.get('/a', function (req, res) { res.json(req.body); });

      const routerB = new Router();
      routerB.get('/b', function (req, res) { res.json(req.body); });

      const mounted = mount(routerA, routerB).into(app);

      //after
      expect(mounted.routers).to.exist;
      expect(mounted.routers).to.have.length(2);
      expect(app._router).to.exist;
      expect(app._router.stack).to.exist;

      const foundA =
        _.find(app._router.stack, ['handle.uuid', routerA.uuid]);
      expect(foundA).to.exist;
      expect(foundA.handle).to.eql(routerA);

      const foundB =
        _.find(app._router.stack, ['handle.uuid', routerB.uuid]);
      expect(foundB).to.exist;
      expect(foundB.handle).to.eql(routerB);

    });


    it('should be able to mount router from paths into app', function () {
      //before
      const app = express();
      expect(app._router).to.not.exist;

      //initialize & mount
      process.env.CWD = path.resolve(__dirname);
      const mounted = mount('./fixtures').into(app);

      //after
      expect(mounted.routers).to.exist;
      expect(mounted.routers).to.have.length(1);
      expect(app._router).to.exist;
      expect(app._router.stack).to.exist;
      const routers = _.filter(app._router.stack, ['name', 'router']);
      expect(routers).to.have.length(1);

      delete process.env.CWD;

    });

    it('should be able to mount router from paths into app', function () {
      //before
      const app = express();
      expect(app._router).to.not.exist;

      //initialize & mount
      process.env.APP_PATH = path.resolve(__dirname);
      const mounted = mount('./fixtures').into(app);

      //after
      expect(mounted.routers).to.exist;
      expect(mounted.routers).to.have.length(1);
      expect(app._router).to.exist;
      expect(app._router.stack).to.exist;
      const routers = _.filter(app._router.stack, ['name', 'router']);
      expect(routers).to.have.length(1);

      delete process.env.APP_PATH;

    });

  });

  describe('Integration', function () {

    let app;
    before(function () {
      app = express();
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
    });

    it('should be mountable', function () {
      const router = new Router();

      expect(router.mount).to.exist;
      expect(router.mount).to.be.a('function');

      expect(router.into).to.exist;
      expect(router.into).to.be.a('function');

      expect(router.mountInto).to.exist;
      expect(router.mountInto).to.be.a('function');

    });

    it('should be mounted into the app', function (done) {

      const router = new Router();

      router.post('/users', function (request, response) {
        response.status(201).json(request.body);
      });

      router.mount().into(app);

      const body = {
        point: 4
      };

      supertest(app)
        .post('/v1.0.0/users')
        .send(body)
        .expect(201)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response.body).to.exist;
          expect(response.body).to.be.eql(body);
          done(error, response);
        });

    });

    it('should be mounted into the app', function (done) {

      const router = new Router({ version: 2 });

      router.post('/users', function (request, response) {
        response.status(201).json(request.body);
      });

      router.mount().into(app);

      const body = {
        point: 4,
        level: 1
      };

      supertest(app)
        .post('/v2.0.0/users')
        .send(body)
        .expect(201)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response.body).to.exist;
          expect(response.body).to.be.eql(body);
          done(error, response);
        });

    });

    it('should be mounted into the app', function (done) {

      const router = new Router({ version: 3, prefix: 'v-' });

      router.post('/users', function (request, response) {
        response.status(201).json(request.body);
      });

      router.mount().into(app);

      const body = {
        point: 4,
        level: 2,
        mode: 1
      };

      supertest(app)
        .post('/v-3.0.0/users')
        .send(body)
        .expect(201)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response.body).to.exist;
          expect(response.body).to.be.eql(body);
          done(error, response);
        });

    });

  });

});