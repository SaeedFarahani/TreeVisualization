<template>
  <div class="sidebar">
    <div v-if="node">
      <h3>Node Details</h3>
      <p><strong>Name:</strong> {{ node.name }}</p>
      <p><strong>Description:</strong> {{ node.description }}</p>
      <button @click="$emit('deselect-node')">Deselect Node</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NodeSidebar",
  props: {
    node: {
      type: Object,
      default: null, // The selected node details
    },
  },
};
</script>

<style scoped>
.sidebar {
  flex: 1;
  padding: 20px;
  border-left: 1px solid #ccc;
  background-color: #f9f9f9;
}

button {
  margin-top: 10px;
  background-color: #e53935;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #c62828;
}
</style>
