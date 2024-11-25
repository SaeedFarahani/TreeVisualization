const graphService = require('../services/graphService');
const graphRepository = require('../repositories/graphRepository');
const sinon = require('sinon');
const { expect } = require('chai');

describe('Graph Service', () => {
  afterEach(() => {
    sinon.restore(); // Restore mocks after each test
  });

  it('should get the graph', async () => {
    const mockGraph = {
      nodes: [{ id: 'A', description: 'Root Node' }],
      links: [],
    };

    sinon.stub(graphRepository, 'getGraph').resolves(mockGraph);

    const result = await graphService.getGraph();
    expect(result).to.deep.equal(mockGraph);
  });

  it('should add a new node', async () => {
    const parentNodeId = 'A';
    const newNodeId = 'B';
    const newNodeDescription = 'Child of A';

    sinon.stub(graphRepository, 'findNodeById').resolves({ id: parentNodeId });
    sinon.stub(graphRepository, 'addNode').resolves({
      message: `Node "${newNodeId}" added successfully.`,
    });

    const result = await graphService.addNode(parentNodeId, newNodeId, newNodeDescription);
    expect(result).to.deep.equal({
      message: `Node "${newNodeId}" added successfully.`,
    });
  });

  it('should throw an error if parent node does not exist', async () => {
    const parentNodeId = 'X'; // Non-existent node
    const newNodeId = 'B';
    const newNodeDescription = 'Child of A';

    sinon.stub(graphRepository, 'findNodeById').resolves(null);

    try {
      await graphService.addNode(parentNodeId, newNodeId, newNodeDescription);
    } catch (error) {
      expect(error.message).to.equal(`Parent node with ID "${parentNodeId}" not found.`);
    }
  });

  it('should remove a node', async () => {
    const nodeId = 'B';

    sinon.stub(graphRepository, 'findNodeById').resolves({ id: nodeId });
    sinon.stub(graphRepository, 'removeNode').resolves({
      message: `Node "${nodeId}" deleted successfully.`,
    });

    const result = await graphService.removeNode(nodeId);
    expect(result).to.deep.equal({
      message: `Node "${nodeId}" deleted successfully.`,
    });
  });

  it('should throw an error if the node to be deleted does not exist', async () => {
    const nodeId = 'X'; // Non-existent node

    sinon.stub(graphRepository, 'findNodeById').resolves(null);

    try {
      await graphService.removeNode(nodeId);
    } catch (error) {
      expect(error.message).to.equal(`Node with ID "${nodeId}" not found.`);
    }
  });
});
