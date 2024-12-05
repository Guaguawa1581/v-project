<template>
  <div
    id="grid-container"
    ref="sortableGridRef"
    class="drag-grid-box"
    :style="{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }"
  >
    <slot
      v-bind="{
        isDisabled: modifyDisabled,
        gridWidth: mainGridWidth,
        gridCols,
      }"
    ></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, watch, computed } from "vue";
import Sortable from "sortablejs";

const props = defineProps({
  cols: {
    type: [Number, String],
    default: 24,
  },
  modifyDisabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:grid-sort"]);

const sortableGridRef = ref(null);
const mainGrid = ref(null);
const mainGridWidth = ref(0);
// const gridColsCount = ref(24);

const parseResponsivePropValue = (reponsiveProp, activeKeyOrSize) => {
  if (reponsiveProp === undefined || reponsiveProp === null) return undefined;

  const classObj = parseResponsiveProp(reponsiveProp);

  if (activeKeyOrSize === undefined) return classObj[""];

  const activeKey = Number(activeKeyOrSize);
  if (Number.isNaN(activeKey)) return classObj[""];

  let activeValue = undefined;
  let closestKey = -1;

  Object.keys(classObj).forEach((key) => {
    const keyAsNum = Number(key);
    if (
      !Number.isNaN(keyAsNum) &&
      activeKey >= keyAsNum &&
      keyAsNum >= closestKey
    ) {
      closestKey = keyAsNum;
      activeValue = classObj[key];
    }
  });

  return Number(activeValue);
};

// Q: 這個函數是幹嘛的 parseResponsiveProp
// A: 這個函數是用來解析responsiveProp的
// responsiveProp是一個字符串，裡面包含了一個或多個key:value對，每個key:value對之間用空格分隔
// 這個函數會將responsiveProp解析成一個對象，對象的key是key，value是value
// 如果responsiveProp是一個數字，則返回一個對象，對象的key是空字符串，value是responsiveProp轉成字符串
// responsiveProp的格式如下：
//  "12 600:24 "
// 這個函數會將這個字符串解析成如下對象：
//  {
//    "": "12",
//    "600": "24",
//  }
// 這個對象表示在寬度小於600的時候，列數是12，在寬度大於等於600的時候，列數是24
const parseResponsiveProp = (reponsiveProp) => {
  if (typeof reponsiveProp === "number") {
    return {
      "": reponsiveProp.toString(),
    };
  }
  const params = {};
  reponsiveProp.split(/ +/).forEach((pairLiteral) => {
    if (pairLiteral === "") return;
    const [prefix, value] = pairLiteral.split(":");
    if (value === undefined) {
      params[""] = prefix;
    } else {
      params[prefix] = value;
    }
  });
  return params;
};

const gridCols = computed(() => {
  const colCount =
    parseResponsivePropValue(props.cols, mainGridWidth.value) || 24;
  console.log("colcount", colCount);
  return colCount;
});

// gridsize observer
onMounted(() => {
  const gridContainer = document.getElementById("grid-container");
  let resizeObserver;
  // ResizeObserver callback
  const onGridResize = (entries) => {
    for (const entry of entries) {
      mainGridWidth.value = entry.contentRect.width;
    }
  };
  if (gridContainer) {
    resizeObserver = new ResizeObserver(onGridResize);
    resizeObserver.observe(gridContainer);
  }
});

onMounted(() => {
  mainGrid.value = new Sortable(sortableGridRef.value, {
    animation: 150,
    handle: ".grabArea",
    ghostClass: "ghost",
    onEnd(event) {
      emit("update:grid-sort", event);
    },
  });
});
</script>

<style lang="scss" scoped>
.drag-grid-box {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(24, 1fr);
  :deep(.ghost) {
    opacity: 0.5;
    background: #c8ebfb;
  }
}
</style>
