<template>
    <div class="graph-view">
      <TreeVisualization
        :hierarchyData="hierarchyData"
        :selectedNode="selectedNode"
        @node-selected="onNodeSelected"
      />
      <NodeSidebar
        v-if="selectedNode"
        :node="selectedNode"
        @deselect-node="deselectNode"
      />
    </div>
  </template>
  
  <script>
  import TreeVisualization from "@/components/TreeVisualization.vue";
  import NodeSidebar from "@/components/NodeSidebar.vue";
  
  export default {
    name: "GraphView",
    components: {
      TreeVisualization,
      NodeSidebar,
    },
    data() {
      return {
        hierarchyData: null, // Tree data
        selectedNode: null, // Selected node details
      };
    },
    async mounted() {
      this.hierarchyData = await this.fetchHierarchy();
    },
    methods: {
      async fetchHierarchy() {
        const response = await fetch("http://localhost:3000/api/graph");
        return response.json();
      },
      onNodeSelected(node) {
        this.selectedNode = node; // Set selected node
      },
      deselectNode() {
        this.selectedNode = null; // Clear selected node
      },
    },
  };
  </script>
  
  <style scoped>
  .graph-view {
    display: flex;
    flex-direction: row;
    height: 100vh;
  }
  </style>
  