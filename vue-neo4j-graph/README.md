# Frontend: Tree Visualization App

This is a Vue.js-based app to visualize hierarchical data using a dynamic tree layout. It provides a simple interface to explore nodes, view their details, and highlights the selected node.

---

## Features

- **Dynamic Tree Layout**: Interactive and visually appealing tree structure.
- **Node Selection**: Click on a node to view its details in a sidebar.
- **Responsive Design**: Works seamlessly across devices.
- **Highlighting**: Selected node is visually highlighted on the layout.
- **Deselect Node**: Easily deselect the currently selected node.

---

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run the App**:
   ```bash
   npm run serve
   ```

3. **Open in Browser**:
   Go to `http://localhost:8080`.

---

## Project Structure

- **`components/`**:
  - `TreeVisualization.vue`: Renders the tree layout using D3.js.
  - `NodeSidebar.vue`: Displays selected node details.
- **`views/`**:
  - `GraphView.vue`: Integrates the tree and sidebar.
- **`services/`**:
  - `graphService.js`: Handles API communication.

---

## Tech Stack

- **Vue 3**: Frontend framework.
- **D3.js**: For tree layout visualization.
- **Axios**: To fetch hierarchical data from the backend.

---

## Future Enhancements

- Add "Create Node" and "Delete Node" functionalities.
- Support for dynamic node filtering or searching.
- Improved animations for a better user experience.

