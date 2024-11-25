const graphService = require('../services/graphService');

// Get the full graph
exports.getGraph = async (req, res, next) => {
  try {
    const graph = await graphService.getGraph();
    res.status(200).json(graph);
  } catch (error) {
    next(error); // Pass to centralized error handler
  }
};

// Add a new node
exports.addNode = async (req, res, next) => {
  try {
    const { parentNodeId, newNodeId, newNodeDescription } = req.body;

    // Validation
    if (!parentNodeId || !newNodeId || !newNodeDescription) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const result = await graphService.addNode(
      parentNodeId,
      newNodeId,
      newNodeDescription
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Remove a node
exports.removeNode = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await graphService.removeNode(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
