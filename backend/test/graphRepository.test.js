import { expect } from 'chai';
import sinon from 'sinon';
import * as graphRepository from '../repositories/graphRepository.js'; // Include .js extension
import neo4jClient from '../database/neo4jClient.js';

describe('Graph Repository', () => {
  let sessionStub;

  beforeEach(() => {
    sessionStub = {
      run: sinon.stub(),
      close: sinon.stub(),
    };

    sinon.stub(neo4jClient, 'session').returns(sessionStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should retrieve the graph', async () => {
    const mockResult = {
      records: [
        {
          get: sinon.stub().returns({
            properties: { id: 'A', description: 'Root Node' },
          }),
        },
      ],
    };

    sessionStub.run.resolves(mockResult);

    const result = await graphRepository.getGraph();
    expect(result.nodes).to.be.an('array');
    expect(result.links).to.be.an('array');
  });

  it('should add a node', async () => {
    sessionStub.run.resolves();

    const parentNodeId = 'A';
    const newNodeId = 'B';
    const newNodeDescription = 'Child Node';

    const result = await graphRepository.addNode(
      parentNodeId,
      newNodeId,
      newNodeDescription
    );

    expect(result).to.deep.equal({ message: `Node "${newNodeId}" added successfully.` });
  });

  it('should delete a node', async () => {
    sessionStub.run.resolves();

    const nodeId = 'B';

    const result = await graphRepository.removeNode(nodeId);
    expect(result).to.deep.equal({ message: `Node "${nodeId}" deleted successfully.` });
  });

  it('should find a node by ID', async () => {
    const mockResult = {
      records: [
        {
          get: sinon.stub().returns({
            properties: { id: 'A', description: 'Root Node' },
          }),
        },
      ],
    };

    sessionStub.run.resolves(mockResult);

    const result = await graphRepository.findNodeById('A');
    expect(result).to.deep.equal({ id: 'A', description: 'Root Node' });
  });
});
