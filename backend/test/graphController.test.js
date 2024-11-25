const request = require('supertest');
const express = require('express');
const graphRoutes = require('../routes/graphRoutes');
const sinon = require('sinon');
const graphService = require('../services/graphService');

// Mock Express app
const app = express();
app.use(express.json());
app.use('/api/graph', graphRoutes);

describe('Graph Controller', () => {
  afterEach(() => {
    sinon.restore(); // Restore any mocked services
  });

  it('should return the graph data', async () => {
    const mockGraph = {
      nodes: [{ id: 'A', description: 'Root Node' }],
      links: [],
    };

    sinon.stub(graphService, 'getGraph').resolves(mockGraph);

    const response = await request(app).get('/api/graph');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(mockGraph);
  });

  it('should add a new node', async () => {
    const mockRequest = {
      parentNodeId: 'A',
      newNodeId: 'B',
      newNodeDescription: 'Child of A',
    };

    const mockResponse = {
      message: `Node "${mockRequest.newNodeId}" added successfully.`,
    };

    sinon.stub(graphService, 'addNode').resolves(mockResponse);

    const response = await request(app)
      .post('/api/graph/node')
      .send(mockRequest);

    expect(response.status).to.equal(201);
    expect(response.body).to.deep.equal(mockResponse);
  });

  it('should delete a node', async () => {
    const nodeId = 'B';
    const mockResponse = { message: `Node "${nodeId}" deleted successfully.` };

    sinon.stub(graphService, 'removeNode').resolves(mockResponse);

    const response = await request(app).delete(`/api/graph/node/${nodeId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(mockResponse);
  });
});
