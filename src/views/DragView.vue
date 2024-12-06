<template>
  <drag-grid
    :cols="'12 800:24'"
    v-model:grid-items="gridItems"
    :modify-disabled="false"
  >
    <template #item="{ element }">
      <div>{{ element }}</div>
    </template>
  </drag-grid>
  <!-- <Vuedrag /> -->
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import Sortable from "sortablejs";
import Button from "primevue/button";
import DragGrid from "./dragGrid/dragGrid.vue";

const sortableGrid = ref(null);
const TOTAL_UNITS = 24;

const gridItems = reactive([
  { id: 1, span: 8 },
  { id: 2, span: 8 },
  { id: 3, span: 8 },
  { id: 4, span: 3 },
  { id: 5, span: 4 },
  { id: 6, span: 5 },
  { id: 7, span: 6 },
  { id: 8, span: 7 },
  { id: 9, span: 8 },
  { id: 10, span: 3 },
  { id: 11, span: 4 },
]);

const addSpan = () => {
  if (gridItems[0].size < TOTAL_UNITS) {
    gridItems[0].size += 1;
  }
};

const updateSpan = (item, size) => {
  console.log("updateSpan", item, size);
  item.size = size;
};

// onMounted(() => {
//   sortableGrid.value = new Sortable(document.getElementById("grid-container"), {
//     animation: 150,
//     handle: ".grabArea",
//     onEnd(event) {
//       const [movedItem] = gridItems.splice(event.oldIndex, 1);
//       gridItems.splice(event.newIndex, 0, movedItem);
//     },
//   });
// });
</script>

<style lang="scss" scoped>
.grid-box {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
}
.gutter {
  cursor: col-resize;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 10px;
  background-color: #ddd;
  &:hover {
    background-color: #808080;
  }
}
.grid-item {
  user-select: none;
}
.grabArea {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  background-color: #f07a7a;
  color: rgb(255, 255, 255);
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
}
</style>
