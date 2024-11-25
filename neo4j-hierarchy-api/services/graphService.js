const graphRepository = require('../repositories/graphRepository');

class GraphService {
  async fetchHierarchy() {
    const data = await graphRepository.getAllNodes();
    return this.buildHierarchy(data);
  }

  async createNode({ name, description, parent }) {
    if (!name || !description) {
      throw new Error('Name and description are required.');
    }
    await graphRepository.addNode(name, description, parent);
  }

  async removeNode(name) {
    const isDeleted = await graphRepository.deleteNode(name);
    if (!isDeleted) {
      throw new Error('Node not found.');
    }
  }

  buildHierarchy(data) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Data must be a non-empty array.");
    }
  
    const nodes = {};
  
    // Create a lookup table for nodes
    data.forEach((item) => {
      nodes[item.name] = { name: item.name, description: item.description, children: [] };
    });
  
    // Build the tree by assigning children
    let root = null;
    data.forEach((item) => {
      if (item.parent) {
        if (nodes[item.parent]) {
          nodes[item.parent].children.push(nodes[item.name]);
        } else {
          console.warn(`Parent "${item.parent}" not found for node "${item.name}".`);
        }
      } else {
        if (root) {
          throw new Error("Multiple root nodes detected. Ensure only one node has no parent.");
        }
        root = nodes[item.name];
      }
    });
  
    if (!root) {
      throw new Error("No root node found. Ensure one node has no parent.");
    }
  
    return root;
  }
  
}

module.exports = new GraphService();
