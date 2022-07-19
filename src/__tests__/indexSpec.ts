import supertest from 'supertest';
import app from '../index';

// supertest request object
const request = supertest(app);

describe('Test Endpoint Response', () => {
  it('should return 200 status code when enter / endpoint', async () => {
    const response = await request.get('/');
    expect(response.statusCode).toEqual(200);
  });

  it('should return 404 status code when enter not exists route ex: /fadl', async () => {
    const response = await request.get('/fadl');
    expect(response.statusCode).toBe(404);
  });

  it('should resize the fjord image and create the new one returned status code should be 201', async () => {
    const response = await request.get('/api/images?filename=fjord&width=800');
    expect(response.statusCode).toBe(201);
  });

  it('should get the fjord image from cache, returned status code should be 200', async () => {
    const response = await request.get('/api/images?filename=fjord&width=800');
    expect(response.statusCode).toBe(200);
  });

  it('should return 404 status code when image not found', async () => {
    const response = await request.get('/api/images?filename=myphoto');
    expect(response.statusCode).toBe(404);
  });
});
