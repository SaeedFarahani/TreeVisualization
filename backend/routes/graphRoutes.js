const express = require('express');
const {
  getGraph,
  addNode,
  removeNode,
} = require('../controllers/graphController');

const router = express.Router();

// Routes
router.get('/', getGraph); // Get the full graph
router.post('/node', addNode); // Add a node
router.delete('/node/:id', removeNode); // Remove a node by ID

module.exports = router;
