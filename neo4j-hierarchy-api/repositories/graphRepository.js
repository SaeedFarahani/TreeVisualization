const neo4jClient = require('../database/neo4jClient');

class GraphRepository {
  /**
   * Fetches all nodes and their relationships.
   * Includes root nodes (nodes without parents) and child nodes.
   */
  async getAllNodes() {
    const session = neo4jClient.session();
    try {
      const query = `
        MATCH (child:Node)
        OPTIONAL MATCH (parent:Node)-[:HAS_CHILD]->(child)
        RETURN child.name AS childName, 
               child.description AS childDescription, 
               parent.name AS parentName
      `;
      const result = await session.run(query);

      return result.records.map((record) => ({
        name: record.get('childName'),
        description: record.get('childDescription'),
        parent: record.get('parentName') || '' // Root nodes have no parent
      }));
    } catch (error) {
      console.error('Error fetching all nodes:', error.message);
      throw new Error('Failed to fetch nodes from the database.');
    } finally {
      await session.close();
    }
  }

  /**
   * Adds a new node to the graph. If a parent is provided, creates a relationship.
   * @param {string} name - Name of the node.
   * @param {string} description - Description of the node.
   * @param {string} parent - Name of the parent node (optional).
   */
  async addNode(name, description, parent) {
    const session = neo4jClient.session();
    try {
      const query = parent
        ? `
          MATCH (parent:Node {name: $parent}) 
          CREATE (child:Node {name: $name, description: $description}), 
                 (parent)-[:HAS_CHILD]->(child)
        `
        : `
          CREATE (child:Node {name: $name, description: $description})
        `;

      await session.run(query, { name, description, parent });
    } catch (error) {
      console.error('Error adding node:', error.message);
      throw new Error('Failed to add node to the database.');
    } finally {
      await session.close();
    }
  }

  /**
   * Deletes a node and its relationships from the graph.
   * @param {string} name - Name of the node to delete.
   * @returns {boolean} - True if the node was deleted, false otherwise.
   */
  async deleteNode(name) {
    const session = neo4jClient.session();
    try {
      const query = `
        MATCH (node:Node {name: $name}) 
        DETACH DELETE node
      `;
      const result = await session.run(query, { name });

      return result.summary.counters.updates().nodesDeleted > 0;
    } catch (error) {
      console.error('Error deleting node:', error.message);
      throw new Error('Failed to delete node from the database.');
    } finally {
      await session.close();
    }
  }
}

module.exports = new GraphRepository();
