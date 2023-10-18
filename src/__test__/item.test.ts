import request from 'supertest';
import app from '../app';

describe('Create Item Test', () => {
  it('required both name and quantity to create item', async () => {
    await request(app).post('/api/items').send().expect(400);
    const testItem1 = { name: 'Test Item' };
    await request(app).post('/api/items').send(testItem1).expect(400);
    const testItem2 = { quantity: '2kg' };
    await request(app).post('/api/items').send(testItem2).expect(400);
  });
  it('creates item successfully for correct input', async () => {
    const testItem = { name: 'Bread', quantity: '2 packets' };
    const res = await request(app)
      .post('/api/items')
      .send(testItem)
      .expect(201);
    console.log(res);
  });
});
