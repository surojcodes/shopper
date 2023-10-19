import request from 'supertest';
import app from '../app';
import Item from '../models/item.model';

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
    await request(app).post('/api/items').send(testItem).expect(201);
    const item = await Item.find({});
    expect(item.length).toEqual(1);
  });
});

describe('Get Item(s) Test', () => {
  it('gets all items', async () => {
    const testItem1 = { name: 'Bread', quantity: '2 packets' };
    const testItem2 = { name: 'Eggs', quantity: '1 dozen' };
    await request(app).post('/api/items').send(testItem1).expect(201);
    await request(app).post('/api/items').send(testItem2).expect(201);

    const item = await Item.find({});
    expect(item.length).toEqual(2);
  });
  it('validates Item ID when trying to get item', async () => {
    await request(app).get('/api/items/apples').expect(404);
  });
  it('retrives correct item by ID', async () => {
    const testItem1 = { name: 'Bread', quantity: '2 packets' };
    const { body } = await request(app)
      .post('/api/items')
      .send(testItem1)
      .expect(201);
    const {
      body: {
        data: { name },
      },
    } = await request(app).get(`/api/items/${body.data._id}`).expect(200);
    expect(name).toBe('Bread');
  });
});

describe('Update Item Test', () => {
  it('validates Item ID when trying to update item', async () => {
    await request(app).get('/api/items/apples').expect(404);
  });
  it('validates the update body', async () => {
    const testItem1 = { name: 'Bread', quantity: '2 packets' };
    const {
      body: {
        data: { _id },
      },
    } = await request(app).post('/api/items').send(testItem1).expect(201);

    //checks for empty body
    await request(app).patch(`/api/items/${_id}`).send({}).expect(400);
  });
  it('updates item correctly for valid input', async () => {
    const testItem1 = { name: 'Bread', quantity: '2 packets' };
    const {
      body: {
        data: { _id },
      },
    } = await request(app).post('/api/items').send(testItem1).expect(201);

    const {
      body: { data },
    } = await request(app)
      .patch(`/api/items/${_id}`)
      .send({ name: 'new name', quantity: 'new qty', purchased: true })
      .expect(200);
    expect(data.name).toBe('new name');
    expect(data.quantity).toBe('new qty');
    expect(data.purchased).toBe(true);
  });
});

describe('Delete Item Test', () => {
  it('validates Item ID when trying to delete item', async () => {
    await request(app).get('/api/items/apples').expect(404);
  });
  it('deletes correct item', async () => {
    const testItem1 = { name: 'Bread', quantity: '2 packets' };
    const {
      body: {
        data: { _id },
      },
    } = await request(app).post('/api/items').send(testItem1).expect(201);
    await request(app).delete(`/api/items/${_id}`).expect(200);
    const items = await Item.find({});
    expect(items.length).toBe(0);
  });
});
