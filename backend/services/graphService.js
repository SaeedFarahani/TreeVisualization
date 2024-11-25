const graphRepository = require('../repositories/graphRepository');

// Get the full graph
exports.getGraph = async () => {
  return await graphRepository.getGraph();
};

// Add a new node
exports.addNode = async (parentNodeId, newNodeId, newNodeDescription) => {
  // Add business logic here (e.g., check if the node already exists)
  const parentNode = await graphRepository.findNodeById(parentNodeId);
  if (!parentNode) {
    throw new Error(`Parent node with ID "${parentNodeId}" not found.`);
  }
  return await graphRepository.addNode(
    parentNodeId,
    newNodeId,
    newNodeDescription
  );
};

// Remove a node
exports.removeNode = async (nodeId) => {
  // Add business logic here (e.g., ensure cascading deletion if needed)
  const node = await graphRepository.findNodeById(nodeId);
  if (!node) {
    throw new Error(`Node with ID "${nodeId}" not found.`);
  }
  return await graphRepository.removeNode(nodeId);
};
