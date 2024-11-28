<template>
  <div class="flex-container">
    <draggable
      v-for="(row, rowIndex) in config"
      :key="row.name"
      class="flex-row"
      v-model="row.rowItems"
      group="input-group"
      handle=".drag-handle"
      item-key="label"
      @end="handleDragEnd"
    >
      <template #item="{ element, index }">
        <div
          class="flex-item-wrapper"
          :style="{
            '--col-span': element.col,
            flexBasis: `calc(var(--col-width) * var(--col-span))`,
          }"
        >
          <div class="flex-item">
            <div @dblclick="toggleWidth(element)">
              <span class="drag-handle">::</span>
              <label>{{ element.label }}</label>
              <input type="text" />
            </div>
            <div
              v-if="index < row.rowItems.length - 1"
              class="gutter"
              @mousedown="startResize($event, index, rowIndex)"
              @mouseenter="showGutter = true"
              @mouseleave="showGutter = false"
              :style="{ display: showGutter ? 'block' : 'none' }"
            ></div>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";

const config = ref([
  {
    name: "row1",
    rowItems: [
      { label: "item1", col: 12 },
      { label: "item2", col: 12 },
    ],
  },
  {
    name: "row2",
    rowItems: [
      { label: "item1", col: 12 },
      { label: "item2", col: 12 },
    ],
  },
]);

const showGutter = ref(false);

const handleDragEnd = (event) => {
  console.log("排序更新後的資料:", config.value);
};

const toggleWidth = (item) => {
  console.log("切換寬度:", item);
  item.col = item.col === 12 ? 24 : 12;
};

const startResize = (event, index, rowIndex) => {
  let startX = event.clientX;
  const initialCol = config.value[rowIndex].rowItems[index].col;
  const nextItemCol = config.value[rowIndex].rowItems[index + 1].col;

  const onMouseMove = (e) => {
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) >= 50) {
      const newCol = initialCol + Math.sign(deltaX);
      const newNextCol = nextItemCol - Math.sign(deltaX);
      if (newCol > 0 && newNextCol > 0) {
        config.value[rowIndex].rowItems[index].col = newCol;
        config.value[rowIndex].rowItems[index + 1].col = newNextCol;
        startX = e.clientX; // 重置起始位置
      }
    }
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};
</script>

<style scoped lang="scss">
.flex-container {
  display: flex;
  flex-direction: column;
  width: 1000px;
  padding: 20px;
  background-color: lightcoral;
  gap: 10px;
  --col-width: calc(100% / 24); /* 每個col的寬度 */
}

.flex-row {
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: nowrap;
}

.flex-item-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  --col-span: 1; /* 默認占用1個col */
}

.flex-item {
  min-width: 100px; /* 設置最小寬度 */
  position: relative;
}

.flex-item > div {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 5px;
  cursor: grab;
}

.flex-item:active {
  cursor: grabbing;
}

.drag-handle {
  cursor: grab;
  margin-right: 10px;
}

.gutter {
  width: 10px;
  cursor: col-resize;
  background-color: transparent;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: none;
}
</style>
