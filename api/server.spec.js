const request = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('./server.js');
const testSimpsons = { name: 'Mr. Burns' };

describe('server.js', function () {
  describe('GET /', function () {
    it('should return status 200 (async version)', async function () {
      const response = await request(server).get('/');

      expect(response.status).toBe(200);
    });

    it('should return status 200', function () {
      return request(server)
        .get('/')
        .then((response) => {
          expect(response.status).toBe(200);
        });
    });

    it('should return JSON', function () {
      return request(server)
        .get('/')
        .then((res) => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it('should respond with { api: "up" }', function () {
      return request(server)
        .get('/')
        .then((res) => {
          expect(res.body.api).toBe('up');
        });
    });
  });
  describe('POST /', function () {
    it('should return status 201', async function () {
      await db('simpsons').truncate();
      request(server).post('/simpsons').send(testSimpsons).expect(201);
    });
    it('should return JSON', async function () {
      await db('simpsons').truncate();
      request(server)
        .post('/simpsons')
        .send(testSimpsons)
        .then((req) => {
          expect(req.body).toMatch(/json/i);
        });
    });
  });
  describe('DELETE /', function () {
    it('should return status 200', async function () {
      await db('simpsons');
      request(server).delete('/simpsons/:id').send({ id: 1 }).expect(200);
    });
    it('it shoud return JSON', async function () {
      await db('simpsons');
      request(server)
        .delete('/simpsons/:id')
        .then((res) => {
          expect(res.body).toMatch(/json/i);
        });
    });
  });
});
