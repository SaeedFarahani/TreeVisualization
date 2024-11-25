
# Graph Backend

This is the backend service for the **Graph Visualization App**, built using **Node.js**, **Express**, and **Neo4j**. It provides an API to manage and visualize hierarchical graph data. You can fetch, add, and delete nodes, making it easy to work with graph-based data structures.

---

## Features

- **Fetch Graph Data**: Retrieve hierarchical graph data.
- **Add Nodes**: Dynamically add nodes to the graph.
- **Remove Nodes**: Delete nodes and their relationships from the graph.
- **Neo4j Integration**: Robust graph database for handling relationships.

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Configure the environment:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```plaintext
     NEO4J_URI=bolt://localhost:7687
     NEO4J_USERNAME=neo4j
     NEO4J_PASSWORD=your-password
     PORT=3000
     ```

---

## Running the Backend

Start the server:
```bash
npm start
```

The backend will run on `http://localhost:3000`.

---

## API Endpoints

### 1. **Get Graph**
   - **GET** `/graph`
   - Retrieves the hierarchical graph data.
   - **Response**:
     ```json
     [
       {
         "name": "A",
         "description": "Root Node",
         "children": [
           {
             "name": "B",
             "description": "Child of A",
             "children": []
           }
         ]
       }
     ]
     ```

### 2. **Add Node**
   - **POST** `/node`
   - Adds a new node to the graph.
   - **Body**:
     ```json
     {
       "parent": "A",
       "name": "B",
       "description": "Child of A"
     }
     ```
   - **Response**:
     ```json
     { "message": "Node 'B' created successfully." }
     ```

### 3. **Delete Node**
   - **DELETE** `/node/:name`
   - Deletes a node and its relationships.
   - **Response**:
     ```json
     { "message": "Node 'B' deleted successfully." }
     ```

---

## Development

### Running in Development Mode
Start the server with live reloading:
```bash
npm run dev
```

### Testing
Run tests using:
```bash
npm test
```

---

## Dependencies

- **Express**: Web framework for building APIs.
- **Neo4j Driver**: Database driver for connecting to the Neo4j graph database.
- **dotenv**: Loads environment variables from a `.env` file.
- **Mocha & Chai**: For testing.

---

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## License

This project is licensed under the MIT License.

