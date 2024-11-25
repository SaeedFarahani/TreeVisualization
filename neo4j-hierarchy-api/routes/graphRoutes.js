const express = require('express');
const graphController = require('../controllers/graphController');

const router = express.Router();

router.get('/graph', graphController.getHierarchy);
router.post('/node', graphController.addNode);
router.delete('/node/:name', graphController.deleteNode);

module.exports = router;
