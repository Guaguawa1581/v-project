<template>
  <div id="grid-container" ref="sortableGridRef">
    <draggable
      tag="div"
      :disabled="modifyDisabled"
      :style="{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }"
      class="drag-grid-box"
      handle=".grabArea"
      :ghostClass="'ghost'"
      :itemKey="'id'"
      :list="tempList"
    >
      <template #item="{ element, index }">
        <drag-grid-item
          :index="index"
          :item="element"
          v-model:span="element.span"
          :gird-width="mainGridWidth"
          :grid-cols="gridCols"
        >
          <template #default>
            <slot name="item" :element="element"></slot>
          </template>
        </drag-grid-item>
      </template>
      <!-- <template> -->

      <!-- </template> -->
    </draggable>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, watch, computed } from "vue";
import draggable from "vuedraggable";
import { NIcon } from "naive-ui";
import { EllipsisVerticalSharp } from "@vicons/ionicons5";
import DragGridItem from "./dragGridItem.vue";
const props = defineProps({
  gridItems: {
    type: Array,
    default: () => [],
  },
  cols: {
    type: [Number, String],
    default: 24,
  },
  modifyDisabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:grid-sort", "gutter-drag-end"]);

const sortableGridRef = ref(null);
const mainGrid = ref(null);
const mainGridWidth = ref(0);
// const numericGridCols = computed(() => Number(props.gridCols));
const numericGridCols = ref(24);
const tempList = ref([]);

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

watch(
  () => props.gridItems,
  (newVal) => {
    tempList.value = newVal;
    console.log("newVal", tempList.value);
  },
  {
    immediate: true,
  }
);
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
