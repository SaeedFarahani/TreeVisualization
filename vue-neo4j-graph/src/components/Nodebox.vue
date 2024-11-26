<template>
  <g @click="selectNode" class="node-box" :transform="`translate(${x}, ${y})`">
    <!-- Rectangle representing the node -->
    <rect
      :width="rectWidth"
      :height="rectHeight"
      :x="-rectWidth / 2"
      :y="-rectHeight / 2"
      :fill="isSelected ? '#ffeb3b' : 'white'"
      stroke="black"
      :stroke-width="2"
    ></rect>
    <!-- Text inside the rectangle -->
    <text dy=".35em" text-anchor="middle">{{ name }}</text>
  </g>
</template>

<script>
export default {
  name: "NodeBox",
  props: {
    name: {
      type: String,
      required: true, // The name of the node
    },
    description: {
      type: String,
      default: "", // Optional description for the node
    },
    x: {
      type: Number,
      required: true, // X coordinate
    },
    y: {
      type: Number,
      required: true, // Y coordinate
    },
    isSelected: {
      type: Boolean,
      default: false, // Whether the node is selected
    },
    rectWidth: {
      type: Number,
      default: 100, // Width of the rectangle
    },
    rectHeight: {
      type: Number,
      default: 40, // Height of the rectangle
    },
  },
  methods: {
    selectNode() {
      this.$emit("node-selected", { name: this.name, description: this.description });
    },
  },
};
</script>

<style scoped>
.node-box {
  cursor: pointer;
  transition: all 0.3s ease;
}

.node-box:hover rect {
  fill: #e0e0e0; /* Highlight on hover */
}

text {
  font: 12px sans-serif;
  fill: black;
}
</style>
