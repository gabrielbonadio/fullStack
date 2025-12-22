const request = require('supertest');
const app = require('./server');

describe('Testes de Integração Básicos', () => {
  it('Deve responder com status 200 na rota raiz', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'API Online' });
  });
});