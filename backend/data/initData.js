// Import necessary libraries
const express = require('express');
const neo4j = require('neo4j-driver');
require('dotenv').config(); // For reading environment variables

// Initialize the express app
const app = express();
const PORT = 3000;

// Initialize Neo4j Driver with credentials from .env file
const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(
    process.env.NEO4J_USERNAME || 'neo4j',
    process.env.NEO4J_PASSWORD || 'password'
  )
);

// Function to build the hierarchy from flat data
function buildHierarchy(data) {
  const nodes = {};

  // Create a lookup table for nodes
  data.forEach((item) => {
    nodes[item.name] = { ...item, children: [] };
  });

  // Construct the hierarchy
  const root = [];
  data.forEach((item) => {
    if (item.parent) {
      nodes[item.parent].children.push(nodes[item.name]);
    } else {
      root.push(nodes[item.name]);
    }
  });

  return root;
}

// Endpoint to fetch hierarchical data
app.get('/graph', async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(
      'MATCH (parent:Node)-[:HAS_CHILD]->(child:Node) ' +
      'RETURN child.name AS childName, child.description AS childDescription, parent.name AS parentName'
    );

    const data = [];

    result.records.forEach((record) => {
      data.push({
        name: record.get('childName'),
        description: record.get('childDescription'),
        parent: record.get('parentName') || ''
      });
    });

    const hierarchy = buildHierarchy(data);
    res.json(hierarchy);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  } finally {
    await session.close();
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await driver.close();
  console.log('Neo4j driver closed. Exiting...');
  process.exit(0);
});
