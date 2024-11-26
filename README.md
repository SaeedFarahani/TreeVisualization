# Tree Visualization and Neo4j Hierarchy API

This is a complete application designed to manage and visualize hierarchical data. The backend API uses **Neo4j** to handle hierarchical structures, while the frontend enables users to interact dynamically with the data using a tree visualization layout.

---

## Features

### Frontend

- **Dynamic Tree Layout**: Visualize hierarchical data in a tree structure powered by D3.js.
- **Node Interaction**: Select a node to view details or highlight it in the layout.
- **Responsive Design**: Works on all screen sizes.

### Backend

- **Fetch Hierarchical Data**: Retrieves nodes and their relationships as a tree.
- **Add Nodes**: Create new nodes and link them to an existing parent.
- **Delete Nodes**: Remove nodes and their relationships cleanly.

---

## Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **Vue CLI** (if not installed, run `npm install -g @vue/cli`)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your `.env` file for the backend with Neo4j credentials:

   ```env
   NEO4J_URI=bolt://localhost:7687
   NEO4J_USERNAME=neo4j
   NEO4J_PASSWORD=your-password
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

5. Start the frontend development server:

   ```bash
   npm run serve
   ```

6. Open the app in your browser:

   ```
   http://localhost:8080
   ```

---

## Project Structure

- **Frontend**:
  - Built with Vue 3 and D3.js for rendering the interactive tree layout.
  - Modularized into components like `TreeVisualization.vue` and `NodeSidebar.vue`.

- **Backend**:
  - Node.js and Express handle data retrieval and updates.
  - Supports adding and removing nodes from the hierarchy.

---

## Deployment

### Deploy on Azure Static Web Apps

1. Build the app for production:

   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to Azure:

   - Use the Azure CLI:
     ```bash
     az webapp up --name <your-app-name> --resource-group <your-resource-group>
     ```

3. Alternatively, configure CI/CD with GitHub Actions for automated deployments.

---

## API Endpoints

### Backend API

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

---

## Tech Stack

- **Frontend**: Vue 3, D3.js, Axios
- **Backend**: Node.js, Express, Neo4j
- **Deployment**: Azure Static Web Apps, GitHub Actions

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit and push your changes:
   ```bash
   git commit -m "Add your commit message"
   git push origin feature/your-feature-name
   ```
4. Submit a pull request.

---

## Future Enhancements

- Add advanced filtering and search capabilities.
- Introduce animations for better visual feedback.
- Enhance the sidebar with richer node data insights.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details. 🌐
