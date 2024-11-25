const neo4jClient = require('../database/neo4jClient');

// Get the full graph
exports.getGraph = async () => {
  const session = neo4jClient.session();
  try {
    const result = await session.run(
      `MATCH (n)-[r:HAS_CHILD]->(m) RETURN n, r, m`
    );
    const nodes = [];
    const links = [];

    result.records.forEach((record) => {
      const parent = record.get('n').properties;
      const child = record.get('m').properties;

      // Use elementId as the unique identifier
      parent.id = record.get('n').elementId;
      child.id = record.get('m').elementId;

      nodes.push(parent, child);
      links.push({
        source: parent.id,
        target: child.id,
      });
    });

    // Deduplicate nodes
    const uniqueNodes = Array.from(new Map(nodes.map((n) => [n.id, n])).values());

    return { nodes: uniqueNodes, links };
  } catch (error) {
    console.error('Error fetching graph:', error);
    throw new Error('Failed to fetch graph data.');
  } finally {
    session.close();
  }
};

// Add a new node
exports.addNode = async (parentElementId, newNodeDescription) => {
  if (!parentElementId || !newNodeDescription) {
    throw new Error('Parent element ID and description are required.');
  }

  const session = neo4jClient.session();
  try {
    const result = await session.run(
      `MATCH (parent) WHERE id(parent) = $parentElementId
       CREATE (child:Node {description: $newNodeDescription})
       CREATE (parent)-[:HAS_CHILD]->(child)
       RETURN child`,
      { parentElementId, newNodeDescription }
    );

    const createdNode = result.records[0]?.get('child');
    return {
      id: createdNode.elementId, // Use elementId for identification
      description: createdNode.properties.description,
    };
  } catch (error) {
    console.error('Error adding node:', error);
    throw new Error(`Failed to add node to parent with element ID "${parentElementId}".`);
  } finally {
    session.close();
  }
};

// Remove a node
exports.removeNode = async (elementId) => {
  if (!elementId) {
    throw new Error('Element ID is required.');
  }

  const session = neo4jClient.session();
  try {
    const result = await session.run(
      `MATCH (n) WHERE id(n) = $elementId DETACH DELETE n`,
      { elementId }
    );

    if (result.summary.counters.nodesDeleted() === 0) {
      throw new Error(`Node with element ID "${elementId}" not found.`);
    }

    return { message: `Node with element ID "${elementId}" deleted successfully.` };
  } catch (error) {
    console.error('Error deleting node:', error);
    throw new Error(`Failed to delete node with element ID "${elementId}".`);
  } finally {
    session.close();
  }
};

// Find a node by elementId
exports.findNodeById = async (elementId) => {
  if (!elementId) {
    throw new Error('Element ID is required.');
  }

  const session = neo4jClient.session();
  try {
    const result = await session.run(
      `MATCH (n) WHERE id(n) = $elementId RETURN n`,
      { elementId }
    );

    if (result.records.length === 0) {
      return null; // Node not found
    }

    const node = result.records[0].get('n');
    return { id: node.elementId, ...node.properties };
  } catch (error) {
    console.error('Error finding node by element ID:', error);
    throw new Error(`Failed to find node with element ID "${elementId}".`);
  } finally {
    session.close();
  }
};