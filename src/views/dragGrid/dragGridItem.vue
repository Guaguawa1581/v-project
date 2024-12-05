<template>
  <div
    class="drap-grid-item"
    :style="{
      gridColumn: 'span ' + tempSpan,
    }"
  >
    <div class="grabArea">
      <n-icon>
        <EllipsisVerticalSharp />
      </n-icon>
    </div>
    <slot></slot>
    <div
      class="gutter"
      @mousedown="onGutterDragStart(index, $event)"
      @touchstart="onGutterDragStart(index, $event)"
      @dblclick="onDbClick(index, $event)"
    ></div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, computed } from "vue";
import { NIcon } from "naive-ui";
import { EllipsisVerticalSharp } from "@vicons/ionicons5";

const props = defineProps({
  item: Object,
  index: Number,
  span: {
    type: Number,
    default: 24,
  },
  gridWidth: {
    type: Number,
    default: () => window.innerWidth,
  },
  gridCols: {
    type: [Number, String],
    default: 24,
  },
});

const emit = defineEmits([
  "gutter-drag-end",
  "dblclick",
  "update:item",
  "update:span",
]);
const tempSpan = ref(props.span);
const numericGridCols = computed(() => Number(props.gridCols));

// double tap
const DOUBLE_TAP_THRESHOLD = 300; // 300 毫秒內的連續觸碰視為雙擊
const DOUBLE_TAP_DISTANCE = 10; // 10 像素內的移動視為雙擊
const lastTouchTime = ref(0);
const lastTouchPosition = ref({ x: 0, y: 0 });
const isDoubleTap = (event) => {
  const currentTime = new Date().getTime();
  const currentPosition = { x: event.clientX, y: event.clientY };
  //   const lastTouchTime = lastTouchTime.value||0;
  const timeDiff = currentTime - lastTouchTime.value;
  const distance = Math.sqrt(
    Math.pow(currentPosition.x - lastTouchPosition.value.x, 2) +
      Math.pow(currentPosition.y - lastTouchPosition.value.y, 2)
  );

  console.log("isDoubleTap", timeDiff, distance);
  if (timeDiff < DOUBLE_TAP_THRESHOLD && distance < DOUBLE_TAP_DISTANCE) {
    lastTouchTime.value = 0;
    lastTouchPosition.value = { x: 0, y: 0 };
    return true;
  }

  lastTouchTime.value = currentTime;
  lastTouchPosition.value = currentPosition;
  return false;
};

const onGutterDragStart = (index, event) => {
  if (event.type === "touchstart") {
    event = event.touches[0];
    if (isDoubleTap(event)) {
      onDbClick(index, event);
      return;
    }
  }
  const startX = event.clientX;
  const initialSizes = props.span;
  //   tempSpan.value = props.span;
  const onMouseMove = (e) => {
    if (e.type === "touchmove") {
      e = e.touches[0];
    }
    const deltaX = e.clientX - startX;
    const deltaUnits = Math.round(
      (deltaX / props.gridWidth) * numericGridCols.value
    );
    const finalSizes = initialSizes + deltaUnits;
    if (finalSizes >= 1 && finalSizes <= numericGridCols.value) {
      if (finalSizes !== props.span) {
        tempSpan.value = finalSizes;
        // emit("update:span", finalSizes);
      }
    }
  };

  const onMouseUp = (e) => {
    if (e.type === "touchend") {
      e = e.changedTouches[0];
    }
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("touchmove", onMouseMove);
    window.removeEventListener("touchend", onMouseUp);
  };

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
  window.addEventListener("touchmove", onMouseMove);
  window.addEventListener("touchend", onMouseUp);
  emit("gutter-drag-end", { index, originEvent: event });
};

const onDbClick = (index, event) => {
  console.log("dblclick", index, event);
  if (props.span == numericGridCols.value) {
    tempSpan.value = Math.floor(numericGridCols.value / 4);
  } else if (props.span < Math.floor(numericGridCols.value / 2)) {
    tempSpan.value = Math.floor(numericGridCols.value / 2);
  } else {
    tempSpan.value = numericGridCols.value;
  }
  emit("dblclick", index, event);
};
watch(
  () => props.span,
  (newVal) => {
    if (newVal !== tempSpan.value) {
      tempSpan.value = newVal;
    }
  }
);
watch(tempSpan, (newVal) => {
  if (newVal !== props.span) {
    console.log("tempSpan", newVal);
    emit("update:span", newVal);
  }
});
</script>

<style lang="scss" scoped>
.drap-grid-item {
  user-select: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
}
.grabArea {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 100%;
  display: flex;
  align-items: center;

  background-color: hsla(0, 100%, 78%, 0.6);

  color: rgb(255, 255, 255);
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
}
.gutter {
  cursor: col-resize;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 10px;
  height: 100%;
  background-color: #ddd;
  &:hover {
    background-color: #808080;
  }
}
</style>
