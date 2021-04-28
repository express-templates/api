import request from 'supertest';

import app from '../app';

describe('GET /', (): void => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: "Hello expressjs"
      }, done);
  });
});
