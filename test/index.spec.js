'use strict';

//ensure test environment
process.env.NODE_ENV = 'test';


//dependencies
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const supertest = require('supertest');
const expect = require('chai').expect;
const Router = require(path.join(__dirname, '..'));


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
        point: 4
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

      const router = new Router({ version: 2, prefix: 'v-' });

      router.post('/users', function (request, response) {
        response.status(201).json(request.body);
      });

      router.mount().into(app);

      const body = {
        point: 4
      };

      supertest(app)
        .post('/v-2.0.0/users')
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