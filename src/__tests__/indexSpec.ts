import supertest from 'supertest';
import app from '../index';

// supertest request object
const request = supertest(app);

describe('Test Endpoint Response', () => {
  it('should return 200 status code when enter / endpoint', async () => {
    const response = await request.get('/');
    expect(response.statusCode).toEqual(200);
  });
});
