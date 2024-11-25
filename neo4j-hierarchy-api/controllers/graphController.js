const graphService = require('../services/graphService');

class GraphController {
  async getHierarchy(req, res) {
    try {
      const hierarchy = await graphService.fetchHierarchy();
      res.json(hierarchy);
    } catch (error) {
      console.error('Error fetching hierarchy:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async addNode(req, res) {
    try {
      await graphService.createNode(req.body);
      res.status(201).json({ message: 'Node created successfully.' });
    } catch (error) {
      console.error('Error adding node:', error.message);
      res.status(400).json({ error: error.message });
    }
  }

  async deleteNode(req, res) {
    try {
      await graphService.removeNode(req.params.name);
      res.json({ message: 'Node deleted successfully.' });
    } catch (error) {
      console.error('Error deleting node:', error.message);
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new GraphController();
