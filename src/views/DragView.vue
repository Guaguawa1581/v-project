<template>
  <!-- <drag-grid
    :cols="'12 800:24'"
    v-model:gridItems="gridItems"
    :modify-disabled="false"
  >
    <template v-slot="{ gridWidth, gridCols }">
      <drag-grid-item
        v-for="(item, index) in gridItems"
        :key="item.id"
        :grid-width="gridWidth"
        :grid-cols="gridCols"
        :item="item"
        :index="index"
        :span="item.size"
        @update:span="updateSpan(item, $event)"
      >
        {{ item.id }} ({{ item.size }})
      </drag-grid-item>
      <div><Button @click="addSpan">PLUS</Button></div>
    </template>
  </drag-grid> -->
  <Vuedrag />
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import Sortable from "sortablejs";
import DragGrid from "./dragGrid/dragGrid.vue";
import DragGridItem from "./dragGrid/dragGridItem.vue";
import Button from "primevue/button";

import Vuedrag from "./Test/Vuedrag.vue";

const sortableGrid = ref(null);
const TOTAL_UNITS = 24;

const gridItems = reactive([
  { id: 1, size: 8 },
  { id: 2, size: 8 },
  { id: 3, size: 8 },
  { id: 4, size: 3 },
  { id: 5, size: 4 },
  { id: 6, size: 5 },
  { id: 7, size: 6 },
  { id: 8, size: 7 },
  { id: 9, size: 8 },
  { id: 10, size: 3 },
  { id: 11, size: 4 },
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
