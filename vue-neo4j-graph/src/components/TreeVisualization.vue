<template>
  <div ref="tree" class="tree"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "TreeVisualization",
  props: {
    hierarchyData: {
      type: Object,
      required: true, // Data for rendering the tree
    },
    selectedNode: {
      type: Object,
      default: null, // The currently selected node
    },
  },
  watch: {
    hierarchyData: {
      immediate: true,
      handler() {
        this.renderTree();
      },
    },
    selectedNode: {
      immediate: true,
      handler() {
        this.highlightSelectedNode();
      },
    },
  },
  methods: {
    renderTree() {
      const width = 800;
      const height = 600;
      const rectWidth = 100;
      const rectHeight = 40;

      // Clear existing tree if re-rendered
      d3.select(this.$refs.tree).select("svg").remove();

      const svg = d3
        .select(this.$refs.tree)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(50,50)");

      const root = d3.hierarchy(this.hierarchyData);

      const treeLayout = d3.tree().size([height - 100, width - 200]);
      treeLayout(root);

      // Draw links
      svg
        .selectAll(".link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("class", "link")
        .attr(
          "d",
          d3
            .linkHorizontal()
            .x(d => d.y)
            .y(d => d.x)
        )
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", "2px");

      // Draw nodes
      const node = svg
        .selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .on("click", this.selectNode);

      // Add rectangles
      node
        .append("rect")
        .attr("width", rectWidth)
        .attr("height", rectHeight)
        .attr("x", -rectWidth / 2)
        .attr("y", -rectHeight / 2)
        .style("fill", d =>
          this.selectedNode && this.selectedNode.name === d.data.name
            ? "#ffeb3b" // Highlight selected node
            : "white"
        )
        .style("stroke", "black");

      // Add node labels
      node
        .append("text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(d => d.data.name);
    },
    highlightSelectedNode() {
      d3.selectAll(".node rect").style("fill", d =>
        this.selectedNode && this.selectedNode.name === d.data.name
          ? "#ffeb3b" // Highlight color for selected node
          : "white"
      );
    },
    selectNode(event, d) {
      this.$emit("node-selected", d.data); // Emit event with node details
    },
  },
};
</script>

<style scoped>
.tree {
  flex: 3;
  border: 1px solid #ccc;
  position: relative;
}

.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}

.node rect {
  stroke: #666;
  stroke-width: 2px;
}

.node text {
  font: 12px sans-serif;
}
</style>
