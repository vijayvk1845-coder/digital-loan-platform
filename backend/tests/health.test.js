const request = require('supertest');
const app = require('../src/server');

describe('Health Check API', () => {

  test('TC-HEALTH-001: Backend health check should return 200', async () => {
    const response = await request(app)
      .get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.service).toBe('loan-origination-backend');
  });

});