const request = require('supertest');
const express = require('express');
const nodeRoutes = require('../routes/graphRoutes');

const app = express();
app.use(express.json());
app.use('/api', nodeRoutes);

describe('Node API Tests', () => {
  it('should fetch the hierarchy', async () => {
    const res = await request(app).get('/api/graph');
    expect(res.statusCode).toBe(200);
  
    expect(typeof res.body).toBe('object');
    expect(res.body).toHaveProperty('name'); // The root should have a name
    expect(res.body).toHaveProperty('children'); // The root should have children
  });

  it('should add a new node', async () => {
    const res = await request(app)
      .post('/api/node')
      .send({ name: 'TestNode', description: 'A test node', parent: '' });
    expect(res.statusCode).toBe(201);
  });

  it('should delete a node', async () => {
    const res = await request(app).delete('/api/node/TestNode');
    expect(res.statusCode).toBe(200);
  });
});
