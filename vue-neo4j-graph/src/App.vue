<template>
  <div id="app">
    <!-- App Header -->
    <header class="app-header">
      <h1>Neo4j Hierarchy Visualization</h1>
    </header>

    <!-- Main Content -->
    <main class="app-content">
      <!-- GraphView is the main view of the app -->
      <GraphView />
    </main>
  </div>
</template>

<script>
import GraphView from "@/views/GraphView.vue";

export default {
  name: "App",
  components: {
    GraphView,
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  color: #333;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app-header {
  background-color: #1e88e5;
  color: white;
  padding: 15px;
  text-align: center;
}

.app-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}
</style>
