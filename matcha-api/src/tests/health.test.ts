import request from 'supertest';

import app from '@/app';

describe('GET /health', () => {
  it('should return status ok and uptime', async () => {
    const res = await request(app).get('/health');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: 'ok',
        uptime: expect.any(Number),
      }),
    );
  });
});
