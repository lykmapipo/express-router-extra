import _ from 'lodash';
import express from 'express';
import bodyParser from 'body-parser';
import supertest from 'supertest';
import { expect } from 'chai';
import { Router, mountInto } from '../src';

describe('Unit', () => {
  it('should export router factory', () => {
    expect(Router).to.exist;
    expect(Router).to.be.a('function');
    expect(Router.name).to.be.equal('Router');
    expect(Router.length).to.be.equal(1);
  });

  it('should instantiate router with default version', () => {
    const router = new Router();
    expect(router).to.exist;
    expect(router.version).to.exist;
    expect(router.version).to.be.equal('v1');
    expect(router.name).to.equal('router');
  });

  it('should instantiate router with provided version', () => {
    const router = new Router({ version: '0.1.0', minor: true });
    expect(router).to.exist;
    expect(router.version).to.exist;
    expect(router.version).to.be.equal('v0.1');
    expect(router.name).to.equal('router');
  });

  it('should instantiate router with provided version prefix', () => {
    const router = new Router({ prefix: 'v-' });
    expect(router).to.exist;
    expect(router.version).to.exist;
    expect(router.version).to.be.equal('v-1');
    expect(router.name).to.equal('router');
  });

  it('should instantiate router with provided version prefix', () => {
    const router = new Router({ prefix: 'v-', version: '0.1.0', minor: true });
    expect(router).to.exist;
    expect(router.version).to.exist;
    expect(router.version).to.be.equal('v-0.1');
    expect(router.name).to.equal('router');
  });
});

describe('Mount', () => {
  it('should export mount point', () => {
    expect(mountInto).to.exist;
    expect(mountInto).to.be.a('function');
    expect(mountInto.name).to.be.equal('mountInto');
  });

  it('should be able to mount router into app', () => {
    // before
    const app = express();
    expect(app._router).to.not.exist;

    // initialize & mount
    const router = new Router();
    router.get('/samples', (req, res) => {
      res.json(req.body);
    });
    mountInto(app, router);

    // after
    expect(app._router).to.exist;
    expect(app._router.stack).to.exist;
    const found = _.find(app._router.stack, ['handle.uuid', router.uuid]);
    expect(found).to.exist;
    expect(found.handle).to.eql(router);
  });

  it('should be able to mount router only once into app', () => {
    // before
    const app = express();
    expect(app._router).to.not.exist;

    // initialize & mount
    const router = new Router();
    router.get('/samples', (req, res) => {
      res.json(req.body);
    });
    mountInto(app, router, router);

    // after
    expect(app._router).to.exist;
    expect(app._router.stack).to.exist;
    const founds = _.filter(app._router.stack, ['handle.uuid', router.uuid]);
    expect(founds).to.exist;
    expect(founds).to.have.length(1);
    expect(_.first(founds).handle).to.eql(router);
  });

  it('should be able to mount routers into app', () => {
    // before
    const app = express();
    expect(app._router).to.not.exist;

    // initialize & mount
    const routerA = new Router();
    routerA.get('/a', (req, res) => {
      res.json(req.body);
    });

    const routerB = new Router();
    routerB.get('/b', (req, res) => {
      res.json(req.body);
    });

    mountInto(app, routerA, routerB);

    // after
    expect(app._router).to.exist;
    expect(app._router.stack).to.exist;

    const foundA = _.find(app._router.stack, ['handle.uuid', routerA.uuid]);
    expect(foundA).to.exist;
    expect(foundA.handle).to.eql(routerA);

    const foundB = _.find(app._router.stack, ['handle.uuid', routerB.uuid]);
    expect(foundB).to.exist;
    expect(foundB.handle).to.eql(routerB);
  });
});

describe('Integration', () => {
  let app;
  before(() => {
    app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  });

  it('should be mountable', () => {
    const router = new Router();

    expect(router.mount).to.exist;
    expect(router.mount).to.be.a('function');

    expect(router.into).to.exist;
    expect(router.into).to.be.a('function');

    expect(router.mountInto).to.exist;
    expect(router.mountInto).to.be.a('function');
  });

  it('should be mounted into the app', (done) => {
    const router = new Router();
    router.post('/users', (request, response) => {
      response.status(201).json(request.body);
    });
    router.mountInto(app);

    const body = { point: 4 };

    supertest(app)
      .post('/v1/users')
      .send(body)
      .expect(201)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response.body).to.exist;
        expect(response.body).to.be.eql(body);
        done(error, response);
      });
  });

  it('should be mounted into the app', (done) => {
    const router = new Router({ version: 2 });
    router.post('/users', (request, response) => {
      response.status(201).json(request.body);
    });
    router.mountInto(app);

    const body = { point: 4, level: 1 };

    supertest(app)
      .post('/v2/users')
      .send(body)
      .expect(201)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response.body).to.exist;
        expect(response.body).to.be.eql(body);
        done(error, response);
      });
  });

  it('should be mounted into the app', (done) => {
    const router = new Router({ version: 3, prefix: 'v-' });
    router.post('/users', (request, response) => {
      response.status(201).json(request.body);
    });
    router.mountInto(app);

    const body = { point: 4, level: 2, mode: 1 };

    supertest(app)
      .post('/v-3/users')
      .send(body)
      .expect(201)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response.body).to.exist;
        expect(response.body).to.be.eql(body);
        done(error, response);
      });
  });
});
