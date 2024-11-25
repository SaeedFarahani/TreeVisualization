# Neo4j Hierarchy API

A simple and robust API for managing hierarchical data using **Neo4j**. This project implements best practices in code organization, modular design, and includes endpoints to fetch, add, and delete nodes in a tree-like hierarchy.

## Features

- **Fetch Hierarchical Data**: Retrieves nodes and their relationships as a tree.
- **Add Nodes**: Create new nodes and link them to an existing parent.
- **Delete Nodes**: Remove nodes and their relationships cleanly.
- Built with **Express.js** and **Neo4j**.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd neo4j-hierarchy-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your `.env` file with Neo4j credentials:
   ```env
   NEO4J_URI=bolt://localhost:7687
   NEO4J_USERNAME=neo4j
   NEO4J_PASSWORD=your-password
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Endpoints

- **GET `/api/graph`**: Fetch the hierarchical structure as JSON.
- **POST `/api/node`**: Add a new node. Body format:
  ```json
  {
    "name": "NodeName",
    "description": "Node description",
    "parent": "ParentNodeName"
  }
  ```
- **DELETE `/api/node/:name`**: Delete a node by name.

## Testing

Run automated tests using **Jest**:
```bash
npm test
```

## How It Works

The app uses a clean modular structure:
- **Routes**: Handle HTTP endpoints.
- **Controllers**: Manage request/response logic.
- **Services**: Handle business logic.
- **Repositories**: Interact with the Neo4j database.

---

