<template>
  <SL_Grid :list="gridItems">
    <!-- 自定義插槽內容 -->
    <template #item="{ id, index }">
      <div>
        <strong>自定義渲染：</strong> 第 {{ index + 1 }} 項 id是
        {{ id }}
      </div>
    </template>
  </SL_Grid>
</template>

<script setup>
import { ref } from "vue";
import SL_Grid from "./Test/SL_Grid.vue";
const gridItems = ref([
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
</script>
